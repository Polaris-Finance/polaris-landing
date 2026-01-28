#!/usr/bin/env node
/**
 * Image Optimization Script for Polaris Landing Page
 *
 * Compresses large images IN-PLACE while preserving format.
 * Uses lossless/near-lossless compression to maintain quality.
 *
 * Usage:
 *   npm install sharp  # if not installed
 *   node scripts/optimize-images.mjs
 *
 * Options:
 *   --dry-run    Preview changes without modifying files
 *   --no-backup  Skip creating backups (not recommended)
 */

import { existsSync, mkdirSync, statSync, copyFileSync, unlinkSync } from 'fs';
import { join, extname } from 'path';

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const SKIP_BACKUP = args.includes('--no-backup');

// Images to optimize (in public/)
const TARGET_IMAGES = [
  'polaris-og.png',
  'cover-image.png',
  'twitter-cover-1500x500-v4.png',
  'logo-social.png',
];

const PUBLIC_DIR = './public';
const BACKUP_DIR = './public/.backup-originals';

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function optimizeImages() {
  let sharp;

  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.error('\n⚠️  Sharp is not installed. Install it with:');
    console.error('   npm install sharp\n');
    process.exit(1);
  }

  console.log('\n🖼️  Polaris Image Optimization (In-Place)\n');
  console.log('='.repeat(50));

  if (DRY_RUN) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }

  // Create backup directory
  if (!SKIP_BACKUP && !DRY_RUN && !existsSync(BACKUP_DIR)) {
    mkdirSync(BACKUP_DIR, { recursive: true });
  }

  let totalOriginalSize = 0;
  let totalNewSize = 0;
  const results = [];

  for (const imageName of TARGET_IMAGES) {
    const imagePath = join(PUBLIC_DIR, imageName);

    if (!existsSync(imagePath)) {
      console.log(`⏭️  Skipping ${imageName} (not found)`);
      continue;
    }

    const originalStats = statSync(imagePath);
    const originalSize = originalStats.size;
    totalOriginalSize += originalSize;

    console.log(`\n📁 ${imageName}`);
    console.log(`   Original: ${formatBytes(originalSize)}`);

    const ext = extname(imageName).toLowerCase();
    const image = sharp(imagePath);
    const metadata = await image.metadata();

    console.log(`   Dimensions: ${metadata.width}x${metadata.height}`);

    // Create backup
    if (!SKIP_BACKUP && !DRY_RUN) {
      const backupPath = join(BACKUP_DIR, imageName);
      copyFileSync(imagePath, backupPath);
      console.log(`   📦 Backup: ${backupPath}`);
    }

    // Optimize based on format
    let optimizedBuffer;

    if (ext === '.png') {
      // PNG: Use maximum lossless compression
      // compressionLevel 9 = max compression (slower but smaller)
      // adaptiveFiltering helps with compression
      optimizedBuffer = await sharp(imagePath)
        .png({
          compressionLevel: 9,
          adaptiveFiltering: true,
          palette: false, // Keep true color for quality
        })
        .toBuffer();
    } else if (ext === '.jpg' || ext === '.jpeg') {
      // JPEG: Use high quality setting
      optimizedBuffer = await sharp(imagePath)
        .jpeg({
          quality: 92,
          mozjpeg: true, // Better compression
        })
        .toBuffer();
    } else if (ext === '.webp') {
      // WebP: Near-lossless
      optimizedBuffer = await sharp(imagePath)
        .webp({
          quality: 95,
          lossless: false,
          nearLossless: true,
        })
        .toBuffer();
    } else {
      console.log(`   ⚠️  Unsupported format: ${ext}`);
      continue;
    }

    const newSize = optimizedBuffer.length;
    totalNewSize += newSize;

    const savings = originalSize - newSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

    if (savings > 0) {
      if (!DRY_RUN) {
        // Write optimized image back to original path
        await sharp(optimizedBuffer).toFile(imagePath);
        console.log(`   ✅ Optimized: ${formatBytes(newSize)} (${savingsPercent}% smaller)`);
      } else {
        console.log(`   📊 Would be: ${formatBytes(newSize)} (${savingsPercent}% smaller)`);
      }

      results.push({
        name: imageName,
        original: originalSize,
        optimized: newSize,
        savings,
        savingsPercent: parseFloat(savingsPercent),
      });
    } else {
      console.log(`   ℹ️  Already optimized (no savings)`);
      totalNewSize = totalNewSize - newSize + originalSize; // Keep original size in total
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('\n📊 Summary\n');

  if (results.length > 0) {
    console.log('| Image | Original | Optimized | Savings |');
    console.log('|-------|----------|-----------|---------|');

    for (const r of results) {
      const name = r.name.length > 25 ? r.name.slice(0, 22) + '...' : r.name;
      console.log(
        `| ${name.padEnd(25)} | ${formatBytes(r.original).padEnd(8)} | ${formatBytes(r.optimized).padEnd(9)} | ${r.savingsPercent}% |`
      );
    }

    const totalSavings = totalOriginalSize - totalNewSize;
    const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(1);

    console.log('\n' + '-'.repeat(50));
    console.log(`Total: ${formatBytes(totalOriginalSize)} → ${formatBytes(totalNewSize)}`);
    console.log(`Saved: ${formatBytes(totalSavings)} (${totalSavingsPercent}%)`);
  } else {
    console.log('No images were optimized.');
  }

  if (DRY_RUN) {
    console.log('\n💡 Run without --dry-run to apply changes.');
  } else if (!SKIP_BACKUP) {
    console.log(`\n💾 Backups saved to: ${BACKUP_DIR}`);
    console.log('   To restore: cp public/.backup-originals/* public/');
  }

  console.log('');
}

optimizeImages().catch(console.error);
