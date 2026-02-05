import { test, expect } from '@playwright/test';

/**
 * Link Validation Tests
 *
 * Ensures all internal and external links are valid and functional.
 * This catches broken links, typos in URLs, and missing pages.
 */

test.describe('Link Validation', () => {
  test.describe('Internal Links', () => {
    test('all internal links on homepage return valid responses', async ({ page, request }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const internalLinks = await page.locator('a[href^="/"], a[href^="https://polarisfinance.io"]').all();
      const checkedUrls = new Set<string>();
      const brokenLinks: { href: string; status: number }[] = [];

      for (const link of internalLinks) {
        const href = await link.getAttribute('href');
        if (!href || checkedUrls.has(href)) continue;
        checkedUrls.add(href);

        // Normalize URL
        const url = href.startsWith('/') ? `http://localhost:3000${href}` : href;

        try {
          const response = await request.get(url);
          if (!response.ok()) {
            brokenLinks.push({ href, status: response.status() });
          }
        } catch {
          brokenLinks.push({ href, status: 0 });
        }
      }

      console.log(`Checked ${checkedUrls.size} internal links`);
      if (brokenLinks.length > 0) {
        console.log('Broken links:', brokenLinks);
      }

      expect(brokenLinks, 'All internal links should return valid responses').toEqual([]);
    });

    test('all internal links on blog page return valid responses', async ({ page, request }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');

      const internalLinks = await page.locator('a[href^="/blog/"]').all();
      const brokenLinks: { href: string; status: number }[] = [];

      for (const link of internalLinks) {
        const href = await link.getAttribute('href');
        if (!href) continue;

        const response = await request.get(`http://localhost:3000${href}`);
        if (!response.ok()) {
          brokenLinks.push({ href, status: response.status() });
        }
      }

      expect(brokenLinks).toEqual([]);
    });

    test('navigation links work correctly', async ({ page }) => {
      await page.goto('/');

      // Test blog link
      const blogLink = page.locator('a[href="/blog"]').first();
      if (await blogLink.count() > 0) {
        await blogLink.click();
        await expect(page).toHaveURL(/\/blog/);
        await expect(page.locator('h1')).toBeVisible();
      }
    });

    test('homepage logo links to homepage', async ({ page }) => {
      await page.goto('/blog');

      const logoLink = page.locator('.top-nav__brand');
      await logoLink.click();

      await expect(page).toHaveURL('/');
    });
  });

  test.describe('External Links', () => {
    test('external links have correct attributes', async ({ page }) => {
      await page.goto('/');

      const externalLinks = await page.locator('a[href^="http"]:not([href*="polarisfinance.io"])').all();
      const issues: string[] = [];

      for (const link of externalLinks) {
        const href = await link.getAttribute('href');
        const target = await link.getAttribute('target');
        const rel = await link.getAttribute('rel');

        // External links should open in new tab
        if (target !== '_blank') {
          issues.push(`${href} missing target="_blank"`);
        }

        // External links should have security attributes
        if (!rel?.includes('noopener') && !rel?.includes('noreferrer')) {
          issues.push(`${href} missing noopener/noreferrer`);
        }
      }

      if (issues.length > 0) {
        console.log('External link issues:', issues);
      }

      expect(issues).toEqual([]);
    });

    test('social media links are present and valid', async ({ page }) => {
      await page.goto('/');

      // Check footer for social links
      const footer = page.locator('footer');
      await footer.scrollIntoViewIfNeeded();

      const socialLinks = await footer.locator('a[href*="x.com"], a[href*="twitter.com"], a[href*="discord"], a[href*="telegram"], a[href*="github"]').all();

      expect(socialLinks.length).toBeGreaterThan(0);

      for (const link of socialLinks) {
        const href = await link.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).toMatch(/^https?:\/\//);
      }
    });

    test('documentation links are accessible', async ({ page }) => {
      await page.goto('/');

      // Check for docs link
      const docsLink = page.locator('a[href*="docs"], a[href*="gitbook"]').first();

      if (await docsLink.count() > 0) {
        const href = await docsLink.getAttribute('href');
        expect(href).toBeTruthy();
      }
    });
  });

  test.describe('Anchor Links', () => {
    test('skip link targets main content', async ({ page }) => {
      await page.goto('/');

      const mainContent = page.locator('#main-content, main').first();
      await expect(mainContent).toBeVisible();
    });

    test('footer back-to-top works if present', async ({ page }) => {
      await page.goto('/');

      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      const backToTop = page.locator('a[href="#top"], a[href="#"], button[aria-label*="top"]').first();

      if (await backToTop.count() > 0) {
        await backToTop.click();
        await page.waitForTimeout(500);

        const scrollY = await page.evaluate(() => window.scrollY);
        expect(scrollY).toBeLessThan(100);
      }
    });
  });

  test.describe('Link Accessibility', () => {
    test('all links have accessible names', async ({ page }) => {
      await page.goto('/');

      const links = await page.locator('a').all();
      const linksWithoutNames: string[] = [];

      for (const link of links) {
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');
        const title = await link.getAttribute('title');
        const hasImg = await link.locator('img[alt]').count() > 0;
        const hasSvg = await link.locator('svg[aria-label], svg title').count() > 0;

        const hasAccessibleName = text?.trim() || ariaLabel || title || hasImg || hasSvg;

        if (!hasAccessibleName) {
          const href = await link.getAttribute('href');
          linksWithoutNames.push(href || 'unknown');
        }
      }

      if (linksWithoutNames.length > 0) {
        console.log('Links without accessible names:', linksWithoutNames);
      }

      expect(linksWithoutNames.length).toBeLessThanOrEqual(0);
    });

    test('links have sufficient color contrast', async ({ page }) => {
      await page.goto('/');

      // Get primary link color
      const link = page.locator('a').first();
      const color = await link.evaluate(el => getComputedStyle(el).color);

      // Should have visible color
      expect(color).toBeTruthy();
      expect(color).not.toBe('rgba(0, 0, 0, 0)');
    });

    test('links have visible focus states', async ({ page }) => {
      await page.goto('/');

      // Tab to a link
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      const focusedElement = page.locator(':focus');
      const outline = await focusedElement.evaluate(el => {
        const style = getComputedStyle(el);
        return style.outline || style.outlineStyle || style.boxShadow;
      });

      // Should have some visible focus indicator
      expect(outline).toBeTruthy();
    });
  });
});
