import { test, expect } from '@playwright/test';

/**
 * Performance Tests
 *
 * Validates essential load-time thresholds and asset health.
 * Detailed metrics (CLS, LCP, FID, frame rates) are covered by Lighthouse CI.
 */

test.describe('Page Load', () => {
  test('homepage loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const domContentLoaded = Date.now() - startTime;

    await page.waitForLoadState('load');
    const fullLoad = Date.now() - startTime;

    console.log(`DOM Content Loaded: ${domContentLoaded}ms`);
    console.log(`Full Load: ${fullLoad}ms`);

    expect(domContentLoaded).toBeLessThan(3000);
    expect(fullLoad).toBeLessThan(5000);
  });

  test('blog page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(3000);
  });
});

test.describe('Asset Health', () => {
  test('critical images load', async ({ page }) => {
    const imageResponses = new Map<string, number>();

    page.on('response', response => {
      if (response.request().resourceType() === 'image') {
        imageResponses.set(response.url(), response.status());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const criticalImages = ['full-logo.svg', 'emblem.svg'];

    for (const name of criticalImages) {
      const match = Array.from(imageResponses.entries())
        .find(([url]) => url.includes(name));
      expect(match, `${name} should have been requested`).toBeDefined();
      expect(match![1], `${name} should return 200`).toBeLessThan(400);
    }
  });

  test('no broken images', async ({ page }) => {
    const failedImages: string[] = [];

    page.on('response', response => {
      if (response.request().resourceType() === 'image' && !response.ok()) {
        failedImages.push(`${response.url()} (${response.status()})`);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(failedImages).toEqual([]);
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const criticalErrors = errors.filter(e =>
      !e.includes('favicon') &&
      !e.includes('404') &&
      !e.includes('analytics')
    );

    expect(criticalErrors).toEqual([]);
  });

  test('page does not make excessive requests', async ({ page }) => {
    const requests: string[] = [];

    page.on('request', request => {
      requests.push(request.url());
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(requests.length).toBeLessThan(50);
  });
});
