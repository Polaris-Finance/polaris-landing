import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests
 *
 * These tests use Playwright's built-in screenshot comparison to detect
 * unintended visual changes. On first run, baseline screenshots are created.
 * Subsequent runs compare against baselines.
 *
 * To update baselines after intentional changes:
 *   npx playwright test --update-snapshots
 */

test.describe('Visual Regression', () => {
  test.describe('Homepage', () => {
    test('desktop layout matches baseline', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Wait for animations to settle
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('homepage-desktop.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.01, // Allow 1% pixel difference for anti-aliasing
      });
    });

    test('tablet layout matches baseline', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('homepage-tablet.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      });
    });

    test('mobile layout matches baseline', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('homepage-mobile.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      });
    });

    test('small mobile layout matches baseline', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('homepage-mobile-small.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.02, // Slightly more tolerance for small screens
      });
    });
  });

  test.describe('Blog Pages', () => {
    test('blog listing desktop matches baseline', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('blog-listing-desktop.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      });
    });

    test('blog listing mobile matches baseline', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('blog-listing-mobile.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      });
    });

    test('blog post desktop matches baseline', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/blog/why-polaris');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('blog-post-desktop.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      });
    });

    test('blog post mobile matches baseline', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('/blog/why-polaris');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot('blog-post-mobile.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      });
    });
  });

  test.describe('Component Snapshots', () => {
    test('navigation desktop matches baseline', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const nav = page.locator('.top-nav');
      await expect(nav).toHaveScreenshot('nav-desktop.png', {
        maxDiffPixelRatio: 0.01,
      });
    });

    test('navigation mobile matches baseline', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const nav = page.locator('.top-nav');
      await expect(nav).toHaveScreenshot('nav-mobile.png', {
        maxDiffPixelRatio: 0.01,
      });
    });

    test('footer matches baseline', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const footer = page.locator('.footer');
      await expect(footer).toHaveScreenshot('footer.png', {
        maxDiffPixelRatio: 0.01,
      });
    });

    test('token cards match baseline', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const tokenSection = page.locator('.trust-strip');
      await expect(tokenSection).toHaveScreenshot('token-cards.png', {
        maxDiffPixelRatio: 0.01,
      });
    });
  });

  test.describe('Error Pages', () => {
    test('404 page matches baseline', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/nonexistent-page-12345');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('404-page.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      });
    });
  });
});
