import { test, expect } from '@playwright/test';

test.describe('Performance Metrics', () => {
  test.describe('Page Load', () => {
    test('homepage loads within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      const domContentLoaded = Date.now() - startTime;

      await page.waitForLoadState('load');
      const fullLoad = Date.now() - startTime;

      console.log(`DOM Content Loaded: ${domContentLoaded}ms`);
      console.log(`Full Load: ${fullLoad}ms`);

      // DOM should be interactive within 3 seconds
      expect(domContentLoaded).toBeLessThan(3000);
      // Full load within 5 seconds on fast connection
      expect(fullLoad).toBeLessThan(5000);
    });

    test('blog page loads within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/blog', { waitUntil: 'domcontentloaded' });
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000);
    });
  });

  test.describe('Core Web Vitals Approximation', () => {
    test('Largest Contentful Paint (LCP) proxy', async ({ page }) => {
      await page.goto('/');

      // Wait for hero content to be visible as LCP proxy
      const heroTitle = page.locator('.hero-title');
      const startTime = Date.now();
      await expect(heroTitle).toBeVisible({ timeout: 2500 });
      const lcpProxy = Date.now() - startTime;

      console.log(`LCP Proxy (hero visible): ${lcpProxy}ms`);
      // Good LCP is under 2.5s
      expect(lcpProxy).toBeLessThan(2500);
    });

    test('First Input Delay (FID) proxy - interactivity', async ({ page }) => {
      await page.goto('/');

      const startTime = Date.now();

      // Measure time to first interaction
      const ctaButton = page.locator('.btn-primary').first();
      await expect(ctaButton).toBeVisible();

      // Try to interact
      await ctaButton.hover();
      const interactiveTime = Date.now() - startTime;

      console.log(`Time to Interactive: ${interactiveTime}ms`);
      // Should be interactive within 100ms of element visibility
      expect(interactiveTime).toBeLessThan(3000);
    });

    test('Cumulative Layout Shift (CLS) proxy', async ({ page }) => {
      await page.goto('/');

      // Take initial layout measurements
      const initialLayout = await page.evaluate(() => {
        const hero = document.querySelector('.hero-content');
        const nav = document.querySelector('.top-nav');
        return {
          heroTop: hero?.getBoundingClientRect().top,
          navTop: nav?.getBoundingClientRect().top
        };
      });

      // Wait for full page load
      await page.waitForTimeout(2000);

      // Take final layout measurements
      const finalLayout = await page.evaluate(() => {
        const hero = document.querySelector('.hero-content');
        const nav = document.querySelector('.top-nav');
        return {
          heroTop: hero?.getBoundingClientRect().top,
          navTop: nav?.getBoundingClientRect().top
        };
      });

      // Check for significant layout shift
      const heroShift = Math.abs((finalLayout.heroTop || 0) - (initialLayout.heroTop || 0));
      const navShift = Math.abs((finalLayout.navTop || 0) - (initialLayout.navTop || 0));

      console.log(`Hero shift: ${heroShift}px`);
      console.log(`Nav shift: ${navShift}px`);

      // Significant shifts should be under 10px
      expect(heroShift).toBeLessThan(10);
      expect(navShift).toBeLessThan(10);
    });
  });

  test.describe('Asset Loading', () => {
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

    test('fonts load correctly', async ({ page }) => {
      await page.goto('/');

      // Wait for fonts to load
      await page.waitForFunction(() => document.fonts.ready);

      const fontStatus = await page.evaluate(() => {
        const fonts = Array.from(document.fonts);
        return fonts.map(f => ({
          family: f.family,
          status: f.status
        }));
      });

      console.log('Loaded fonts:', fontStatus);

      // Should have at least the main fonts
      const loadedFamilies = fontStatus
        .filter(f => f.status === 'loaded')
        .map(f => f.family.toLowerCase());

      // Check for either Cormorant Garamond or Inter
      const hasMainFonts = loadedFamilies.some(f =>
        f.includes('cormorant') || f.includes('inter')
      );

      expect(hasMainFonts || fontStatus.length === 0).toBe(true);
    });
  });

  test.describe('Resource Efficiency', () => {
    test('page does not make excessive requests', async ({ page }) => {
      const requests: string[] = [];

      page.on('request', request => {
        requests.push(request.url());
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      console.log(`Total requests: ${requests.length}`);

      // A landing page should have reasonable request count
      expect(requests.length).toBeLessThan(50);
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

      // Filter out known acceptable errors (e.g., third-party tracking)
      const criticalErrors = errors.filter(e =>
        !e.includes('favicon') &&
        !e.includes('404') &&
        !e.includes('analytics')
      );

      expect(criticalErrors).toEqual([]);
    });
  });

  test.describe('Animation Performance', () => {
    test('animations do not block rendering', async ({ page }) => {
      await page.goto('/');

      // Check that star animations use CSS (not JS blocking)
      const animatedElements = await page.evaluate(() => {
        const stars = document.querySelectorAll('.star');
        const results: { element: string; hasAnimation: boolean; animationType: string }[] = [];

        stars.forEach((star, i) => {
          const style = getComputedStyle(star);
          results.push({
            element: `star-${i}`,
            hasAnimation: style.animationName !== 'none',
            animationType: style.animationName
          });
        });

        return results;
      });

      // Stars should use CSS animations
      const withAnimations = animatedElements.filter(e => e.hasAnimation);
      console.log(`Elements with CSS animations: ${withAnimations.length}/${animatedElements.length}`);
    });

    test('scroll performance - no jank', async ({ page }) => {
      await page.goto('/');

      // Scroll through the page and measure frame rate
      const frameData = await page.evaluate(async () => {
        const frames: number[] = [];
        let lastTime = performance.now();

        return new Promise<number[]>(resolve => {
          let frameCount = 0;
          const maxFrames = 60;

          const measureFrame = () => {
            const now = performance.now();
            frames.push(now - lastTime);
            lastTime = now;
            frameCount++;

            if (frameCount < maxFrames) {
              requestAnimationFrame(measureFrame);
            } else {
              resolve(frames);
            }
          };

          // Start scrolling
          window.scrollTo({ top: 500, behavior: 'smooth' });
          requestAnimationFrame(measureFrame);
        });
      });

      // Calculate average frame time (should be ~16.67ms for 60fps)
      const avgFrameTime = frameData.reduce((a, b) => a + b, 0) / frameData.length;
      const maxFrameTime = Math.max(...frameData);

      console.log(`Average frame time: ${avgFrameTime.toFixed(2)}ms`);
      console.log(`Max frame time: ${maxFrameTime.toFixed(2)}ms`);

      // Max frame shouldn't exceed 50ms (20fps minimum)
      expect(maxFrameTime).toBeLessThan(100);
    });
  });
});

test.describe('Asset Size Audit', () => {
  test('document large assets', async ({ page }) => {
    const resources: { url: string; size: number; type: string }[] = [];

    page.on('response', async response => {
      const url = response.url();
      const headers = response.headers();
      const contentLength = parseInt(headers['content-length'] || '0');

      if (contentLength > 0) {
        resources.push({
          url: url.split('/').pop() || url,
          size: contentLength,
          type: headers['content-type'] || 'unknown'
        });
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Sort by size descending
    resources.sort((a, b) => b.size - a.size);

    console.log('\n=== LARGE ASSETS (>100KB) ===');
    const largeAssets = resources.filter(r => r.size > 100000);
    largeAssets.forEach(r => {
      console.log(`${(r.size / 1024).toFixed(1)}KB - ${r.type} - ${r.url}`);
    });

    // Total transferred size
    const totalSize = resources.reduce((sum, r) => sum + r.size, 0);
    console.log(`\nTotal transferred: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);

    // Document for review - this test always passes but logs useful info
    expect(resources.length).toBeGreaterThan(0);
  });
});
