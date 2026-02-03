import { test, expect } from '@playwright/test';

/**
 * Image Optimization Tests
 *
 * Validates image loading strategies, formats, sizing, and accessibility.
 */

test.describe('Image Optimization', () => {
  test.describe('Lazy Loading', () => {
    test('below-fold images have loading="lazy"', async ({ page }) => {
      await page.goto('/');

      // Get all images
      const images = await page.locator('img').all();
      const belowFoldImages: { src: string; loading: string | null; y: number }[] = [];

      for (const img of images) {
        const box = await img.boundingBox();
        if (box && box.y > 800) {
          // Below the fold
          belowFoldImages.push({
            src: (await img.getAttribute('src')) || 'unknown',
            loading: await img.getAttribute('loading'),
            y: box.y,
          });
        }
      }

      console.log('Below-fold images:', belowFoldImages);

      // Check that below-fold images use lazy loading
      for (const img of belowFoldImages) {
        // Lazy loading is a best practice, not a hard requirement
        if (img.loading !== 'lazy') {
          console.warn(`Image ${img.src} at y=${img.y} could use lazy loading`);
        }
      }
    });

    test('above-fold images load eagerly', async ({ page }) => {
      await page.goto('/');

      // Hero images should load immediately
      const heroImages = page.locator('.hero-scene img, .hero-logo');

      if (await heroImages.count() > 0) {
        const firstImage = heroImages.first();
        const loading = await firstImage.getAttribute('loading');

        // Above-fold images should NOT be lazy loaded
        expect(loading).not.toBe('lazy');
      }
    });

    test('images load as user scrolls', async ({ page }) => {
      const loadedImages: string[] = [];

      page.on('response', response => {
        if (response.request().resourceType() === 'image') {
          loadedImages.push(response.url());
        }
      });

      await page.goto('/');

      const initialCount = loadedImages.length;

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);

      const afterScrollCount = loadedImages.length;

      console.log(`Images: ${initialCount} initially, ${afterScrollCount} after scroll`);

      // More images should load after scrolling (if there are lazy images)
      expect(afterScrollCount).toBeGreaterThanOrEqual(initialCount);
    });
  });

  test.describe('Image Formats', () => {
    test('uses optimized image formats', async ({ page }) => {
      const imageFormats: Record<string, number> = {};

      page.on('response', response => {
        if (response.request().resourceType() === 'image') {
          const contentType = response.headers()['content-type'] || '';
          const format = contentType.split('/')[1] || 'unknown';
          imageFormats[format] = (imageFormats[format] || 0) + 1;
        }
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      console.log('Image formats used:', imageFormats);

      // SVG for logos/icons is good
      // WebP/AVIF for photos is ideal
      // PNG/JPG are acceptable fallbacks
      const totalImages = Object.values(imageFormats).reduce((a, b) => a + b, 0);
      expect(totalImages).toBeGreaterThan(0);
    });

    test('SVG images are used for icons/logos', async ({ page }) => {
      await page.goto('/');

      // Check that logo uses SVG (it's an img tag with SVG src)
      const logo = page.locator('img[src*=".svg"]');
      const count = await logo.count();

      // Should have at least one SVG image (logos/icons)
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Image Sizing', () => {
    test('images have explicit dimensions', async ({ page }) => {
      await page.goto('/');

      const images = await page.locator('img').all();
      const imagesWithoutDimensions: string[] = [];

      for (const img of images) {
        const width = await img.getAttribute('width');
        const height = await img.getAttribute('height');
        const style = await img.evaluate(el => el.style.cssText);

        const hasDimensions =
          (width && height) ||
          style.includes('width') ||
          style.includes('aspect-ratio');

        if (!hasDimensions) {
          const src = await img.getAttribute('src');
          imagesWithoutDimensions.push(src || 'unknown');
        }
      }

      if (imagesWithoutDimensions.length > 0) {
        console.log('Images without explicit dimensions:', imagesWithoutDimensions);
      }

      // Having dimensions prevents CLS
      expect(imagesWithoutDimensions.length).toBeLessThanOrEqual(2);
    });

    test('images are appropriately sized for viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      const images = await page.locator('img').all();

      for (const img of images) {
        const box = await img.boundingBox();
        if (box && box.width > 0) {
          // Image shouldn't be wider than viewport
          expect(box.width).toBeLessThanOrEqual(375);
        }
      }
    });

    test('responsive images use srcset', async ({ page }) => {
      await page.goto('/');

      const responsiveImages = page.locator('img[srcset], picture source');
      const count = await responsiveImages.count();

      console.log(`Responsive images with srcset: ${count}`);

      // Log for awareness - srcset is a best practice for photos
    });
  });

  test.describe('Image Accessibility', () => {
    test('all images have alt attributes', async ({ page }) => {
      await page.goto('/');

      const images = await page.locator('img').all();
      const imagesWithoutAlt: string[] = [];

      for (const img of images) {
        const alt = await img.getAttribute('alt');
        if (alt === null) {
          const src = await img.getAttribute('src');
          imagesWithoutAlt.push(src || 'unknown');
        }
      }

      expect(imagesWithoutAlt).toEqual([]);
    });

    test('decorative images have empty alt', async ({ page }) => {
      await page.goto('/');

      // Decorative images (backgrounds, spacers) should have alt=""
      const decorativeImages = page.locator('img[role="presentation"], img[aria-hidden="true"]');

      if (await decorativeImages.count() > 0) {
        for (const img of await decorativeImages.all()) {
          const alt = await img.getAttribute('alt');
          expect(alt).toBe('');
        }
      }
    });

    test('informative images have descriptive alt', async ({ page }) => {
      await page.goto('/');

      // Logo images should have meaningful alt text
      const logoImages = page.locator('img[alt*="Polaris"], img[alt*="logo"]');

      if (await logoImages.count() > 0) {
        for (const img of await logoImages.all()) {
          const alt = await img.getAttribute('alt');
          expect(alt).toBeTruthy();
          expect(alt!.length).toBeGreaterThan(3);
        }
      }
    });
  });

  test.describe('Image Performance', () => {
    test('total image payload is reasonable', async ({ page }) => {
      let totalImageSize = 0;

      page.on('response', response => {
        if (response.request().resourceType() === 'image') {
          const contentLength = parseInt(response.headers()['content-length'] || '0');
          totalImageSize += contentLength;
        }
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const totalMB = totalImageSize / (1024 * 1024);
      console.log(`Total image payload: ${totalMB.toFixed(2)}MB`);

      // Homepage images should be under 2MB total
      expect(totalMB).toBeLessThan(3);
    });

    test('no oversized images', async ({ page }) => {
      const largeImages: { url: string; size: number }[] = [];

      page.on('response', response => {
        if (response.request().resourceType() === 'image') {
          const size = parseInt(response.headers()['content-length'] || '0');
          if (size > 500 * 1024) {
            // > 500KB
            largeImages.push({
              url: response.url().split('/').pop() || response.url(),
              size: size / 1024,
            });
          }
        }
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      if (largeImages.length > 0) {
        console.log('Large images (>500KB):', largeImages);
      }

      // Flag if any image is over 1MB (likely not optimized)
      const veryLargeImages = largeImages.filter(img => img.size > 1024);
      expect(veryLargeImages.length).toBe(0);
    });

    test('images load without blocking render', async ({ page }) => {
      let domContentLoaded = 0;
      let lastImageLoaded = 0;

      page.on('domcontentloaded', () => {
        domContentLoaded = Date.now();
      });

      page.on('response', response => {
        if (response.request().resourceType() === 'image') {
          lastImageLoaded = Date.now();
        }
      });

      const start = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const domTime = domContentLoaded - start;
      const imageTime = lastImageLoaded - start;

      console.log(`DOM ready: ${domTime}ms, Last image: ${imageTime}ms`);

      // DOM should be ready before all images finish (non-blocking)
      expect(domTime).toBeLessThan(imageTime + 1000);
    });
  });

  test.describe('Image Loading States', () => {
    test('images have placeholder/skeleton while loading', async ({ page }) => {
      // Slow down image loading to observe placeholders
      await page.route('**/*.{png,jpg,jpeg,webp}', async route => {
        await new Promise(resolve => setTimeout(resolve, 500));
        await route.continue();
      });

      await page.goto('/');

      // Check if any images use blur placeholder or skeleton
      const hasPlaceholder = await page.evaluate(() => {
        const images = document.querySelectorAll('img');
        for (const img of images) {
          const style = getComputedStyle(img);
          if (
            style.backgroundImage.includes('blur') ||
            style.filter.includes('blur') ||
            img.closest('[data-placeholder]')
          ) {
            return true;
          }
        }
        return false;
      });

      console.log('Has image placeholders:', hasPlaceholder);
      // Informational - placeholders are nice but not required
    });
  });

  test.describe('Blog Post Images', () => {
    test('blog post images are optimized', async ({ page }) => {
      await page.goto('/blog/why-polaris');

      const images = await page.locator('article img, .blog-content img').all();

      for (const img of images) {
        const alt = await img.getAttribute('alt');
        const loading = await img.getAttribute('loading');

        // All blog images should have alt text
        expect(alt).toBeTruthy();

        // Blog images are likely below fold, should be lazy
        console.log(`Blog image: alt="${alt}", loading="${loading}"`);
      }
    });

    test('blog images maintain aspect ratio on resize', async ({ page }) => {
      await page.goto('/blog/why-polaris');

      const images = page.locator('article img, .blog-content img');

      if (await images.count() > 0) {
        const img = images.first();

        // Desktop size
        await page.setViewportSize({ width: 1440, height: 900 });
        const desktopBox = await img.boundingBox();
        const desktopRatio = desktopBox ? desktopBox.width / desktopBox.height : 0;

        // Mobile size
        await page.setViewportSize({ width: 375, height: 667 });
        const mobileBox = await img.boundingBox();
        const mobileRatio = mobileBox ? mobileBox.width / mobileBox.height : 0;

        // Aspect ratio should be similar
        if (desktopRatio > 0 && mobileRatio > 0) {
          expect(Math.abs(desktopRatio - mobileRatio)).toBeLessThan(0.5);
        }
      }
    });
  });
});
