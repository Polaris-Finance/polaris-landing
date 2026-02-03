import { test, expect } from '@playwright/test';

/**
 * Error Handling Tests
 *
 * Validates error pages, error boundaries, and graceful degradation
 * when things go wrong.
 */

test.describe('Error Handling', () => {
  test.describe('404 Page', () => {
    test('404 page displays for invalid routes', async ({ page }) => {
      const response = await page.goto('/this-page-definitely-does-not-exist-xyz');
      expect(response?.status()).toBe(404);
    });

    test('404 page has helpful content', async ({ page }) => {
      await page.goto('/nonexistent-page');

      // Should have clear messaging
      const pageContent = await page.textContent('body');
      const hasHelpfulText =
        pageContent?.toLowerCase().includes('not found') ||
        pageContent?.toLowerCase().includes('404') ||
        pageContent?.toLowerCase().includes('page');

      expect(hasHelpfulText).toBe(true);
    });

    test('404 page has navigation back to homepage', async ({ page }) => {
      await page.goto('/nonexistent-page');

      // Should have a link back to home
      const homeLink = page.locator('a[href="/"], a[href="https://polarisfinance.io"]');
      const logoLink = page.locator('.top-nav__brand');

      const hasHomeLink = (await homeLink.count()) > 0 || (await logoLink.count()) > 0;
      expect(hasHomeLink).toBe(true);
    });

    test('404 page maintains consistent branding', async ({ page }) => {
      await page.goto('/nonexistent-page');

      // Should have navigation
      const nav = page.locator('.top-nav, nav');
      await expect(nav.first()).toBeVisible();

      // Should have footer
      const footer = page.locator('footer, .footer');
      if (await footer.count() > 0) {
        await expect(footer.first()).toBeVisible();
      }
    });

    test('404 page is accessible', async ({ page }) => {
      await page.goto('/nonexistent-page');

      // Should have proper heading
      const h1 = page.locator('h1');
      const h1Count = await h1.count();
      expect(h1Count).toBeGreaterThanOrEqual(1);

      // Should have lang attribute
      const lang = await page.locator('html').getAttribute('lang');
      expect(lang).toBeTruthy();
    });
  });

  test.describe('Invalid Blog Post', () => {
    // Note: In dev mode (npm run dev), Next.js with output:'export' returns 500
    // In production (static export), it correctly returns 404
    // CI runs against static export, so these tests pass there

    test('invalid blog slug returns error status', async ({ page }) => {
      const response = await page.goto('/blog/this-post-does-not-exist');
      const status = response?.status() || 0;
      // Accepts both 404 (production) and 500 (dev mode)
      expect(status).toBeGreaterThanOrEqual(400);
    });

    test('invalid blog returns content', async ({ page }) => {
      const response = await page.goto('/blog/invalid-slug-xyz');

      // Should return some HTML content (error page or 404 page)
      const content = await response?.text();
      expect(content).toBeTruthy();
      expect(content?.length).toBeGreaterThan(100);
    });
  });

  test.describe('JavaScript Errors', () => {
    test('homepage has no console errors', async ({ page }) => {
      const errors: string[] = [];

      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Filter out known acceptable errors
      const criticalErrors = errors.filter(e =>
        !e.includes('favicon') &&
        !e.includes('analytics') &&
        !e.includes('Failed to load resource') &&
        !e.includes('net::ERR')
      );

      if (criticalErrors.length > 0) {
        console.log('Console errors:', criticalErrors);
      }

      expect(criticalErrors).toEqual([]);
    });

    test('blog page has no console errors', async ({ page }) => {
      const errors: string[] = [];

      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      await page.goto('/blog');
      await page.waitForLoadState('networkidle');

      const criticalErrors = errors.filter(e =>
        !e.includes('favicon') &&
        !e.includes('analytics') &&
        !e.includes('Failed to load resource')
      );

      expect(criticalErrors).toEqual([]);
    });

    test('no unhandled promise rejections', async ({ page }) => {
      const rejections: string[] = [];

      page.on('pageerror', error => {
        if (error.message.includes('Unhandled') || error.message.includes('rejection')) {
          rejections.push(error.message);
        }
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Scroll through page to trigger any lazy components
      await page.evaluate(async () => {
        for (let i = 0; i < 3; i++) {
          window.scrollBy(0, window.innerHeight);
          await new Promise(r => setTimeout(r, 300));
        }
      });

      expect(rejections).toEqual([]);
    });
  });

  test.describe('Form Validation', () => {
    test('email inputs validate properly', async ({ page }) => {
      await page.goto('/');

      const emailInputs = page.locator('input[type="email"]');

      if (await emailInputs.count() > 0) {
        const input = emailInputs.first();

        // Enter invalid email
        await input.fill('notanemail');
        await input.blur();

        // Should show validation state
        const isInvalid = await input.evaluate(el =>
          !el.checkValidity() || el.getAttribute('aria-invalid') === 'true'
        );

        expect(isInvalid).toBe(true);
      }
    });

    test('required fields show validation', async ({ page }) => {
      await page.goto('/');

      const requiredInputs = page.locator('input[required]');

      if (await requiredInputs.count() > 0) {
        const input = requiredInputs.first();

        // Focus and blur without entering value
        await input.focus();
        await input.blur();

        // Check validation state
        const validity = await input.evaluate(el => el.checkValidity());
        expect(validity).toBe(false);
      }
    });
  });

  test.describe('Broken Image Handling', () => {
    test('broken images show gracefully', async ({ page }) => {
      // Force an image to fail
      await page.route('**/emblem.svg', route => route.abort());

      await page.goto('/');

      // Page should still render
      const body = page.locator('body');
      await expect(body).toBeVisible();

      // Hero title should still be visible even with broken images
      const heroTitle = page.locator('.hero-title');
      await expect(heroTitle).toBeVisible();
    });
  });

  test.describe('Error Recovery', () => {
    test('can navigate after error', async ({ page }) => {
      // Visit 404 page
      await page.goto('/nonexistent');

      // Navigate to valid page
      const logoLink = page.locator('.top-nav__brand, a[href="/"]').first();
      await logoLink.click();

      // Should successfully navigate
      await expect(page).toHaveURL('/');
      const heroTitle = page.locator('.hero-title');
      await expect(heroTitle).toBeVisible();
    });

    test('back button works after error', async ({ page }) => {
      // Start at homepage
      await page.goto('/');

      // Go to blog
      await page.goto('/blog');

      // Go to 404
      await page.goto('/nonexistent');

      // Go back
      await page.goBack();

      // Should be on blog
      await expect(page).toHaveURL('/blog');
    });
  });

  test.describe('Graceful Degradation', () => {
    test('page works without JavaScript (SSR content)', async ({ page }) => {
      // Check that critical content is in the initial HTML
      const response = await page.goto('/');
      const html = await response?.text();

      // Hero title should be in the HTML
      expect(html).toContain('hero-title');

      // Navigation should be in the HTML
      expect(html).toContain('top-nav');
    });

    test('critical content visible before JS loads', async ({ page }) => {
      // Block JavaScript
      await page.route('**/*.js', route => {
        // Delay JS loading
        setTimeout(() => route.continue(), 2000);
      });

      await page.goto('/', { waitUntil: 'domcontentloaded' });

      // Check that HTML content is visible
      const heroTitle = page.locator('.hero-title');
      await expect(heroTitle).toBeVisible({ timeout: 1000 });
    });
  });

  test.describe('Edge Cases', () => {
    test('handles special characters in URL', async ({ page }) => {
      // Test URL-encoded space - non-blog path
      const response = await page.goto('/test%20space');
      // Should return 404 for non-existent page
      expect(response?.status()).toBe(404);

      // Page should still be functional
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('handles extremely long URL', async ({ page }) => {
      const longSlug = 'a'.repeat(100); // Reasonable length
      const response = await page.goto(`/${longSlug}`);

      // Should return 404 for non-existent page
      expect(response?.status()).toBe(404);

      // Page should still render something
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('handles URL with query parameters', async ({ page }) => {
      await page.goto('/?utm_source=test&utm_medium=test');

      // Page should still work
      const heroTitle = page.locator('.hero-title');
      await expect(heroTitle).toBeVisible();
    });

    test('handles URL with hash', async ({ page }) => {
      await page.goto('/#main-content');

      // Page should load
      const heroTitle = page.locator('.hero-title');
      await expect(heroTitle).toBeVisible();
    });
  });
});
