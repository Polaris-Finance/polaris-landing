import { test, expect } from '@playwright/test';

test.describe('SEO & Metadata', () => {
  test.describe('Homepage SEO', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('has correct title', async ({ page }) => {
      await expect(page).toHaveTitle(/Polaris Protocol.*Self-Scaling Stablecoin/i);
    });

    test('has meta description', async ({ page }) => {
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description!.length).toBeGreaterThan(50);
      expect(description!.length).toBeLessThan(160);
    });

    test('has canonical URL', async ({ page }) => {
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBe('https://polarisfinance.io');
    });

    test('has Open Graph meta tags', async ({ page }) => {
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
      const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');

      expect(ogTitle).toBeTruthy();
      expect(ogDescription).toBeTruthy();
      expect(ogUrl).toBe('https://polarisfinance.io');
      expect(ogImage).toContain('polaris-og.png');
      expect(ogType).toBe('website');
    });

    test('has Twitter card meta tags', async ({ page }) => {
      const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
      const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
      const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute('content');

      expect(twitterCard).toBe('summary_large_image');
      expect(twitterTitle).toBeTruthy();
      expect(twitterImage).toContain('polaris-og.png');
    });

    test('has valid JSON-LD structured data', async ({ page }) => {
      const scripts = await page.locator('script[type="application/ld+json"]').all();
      expect(scripts.length).toBeGreaterThanOrEqual(2);

      for (const script of scripts) {
        const content = await script.textContent();
        expect(content).toBeTruthy();

        const data = JSON.parse(content!);
        expect(data['@context']).toBe('https://schema.org');
        expect(data['@type']).toBeTruthy();
      }
    });

    test('has Organization schema', async ({ page }) => {
      const scripts = await page.locator('script[type="application/ld+json"]').all();
      let hasOrgSchema = false;

      for (const script of scripts) {
        const content = await script.textContent();
        const data = JSON.parse(content!);
        if (data['@type'] === 'Organization') {
          hasOrgSchema = true;
          expect(data.name).toBe('Polaris Protocol');
          expect(data.url).toBe('https://polarisfinance.io');
          expect(data.sameAs).toContain('https://x.com/polarisfinance_');
        }
      }

      expect(hasOrgSchema).toBe(true);
    });

    test('has WebSite schema', async ({ page }) => {
      const scripts = await page.locator('script[type="application/ld+json"]').all();
      let hasWebsiteSchema = false;

      for (const script of scripts) {
        const content = await script.textContent();
        const data = JSON.parse(content!);
        if (data['@type'] === 'WebSite') {
          hasWebsiteSchema = true;
          expect(data.name).toBe('Polaris Protocol');
          expect(data.url).toBe('https://polarisfinance.io');
        }
      }

      expect(hasWebsiteSchema).toBe(true);
    });
  });

  test.describe('Blog SEO', () => {
    test('blog listing has correct metadata', async ({ page }) => {
      await page.goto('/blog');

      await expect(page).toHaveTitle(/Blog.*Polaris Protocol/i);

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBe('https://polarisfinance.io/blog');

      const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
      expect(ogUrl).toBe('https://polarisfinance.io/blog');
    });

    test('blog listing has CollectionPage schema', async ({ page }) => {
      await page.goto('/blog');

      const scripts = await page.locator('script[type="application/ld+json"]').all();
      let hasCollectionSchema = false;

      for (const script of scripts) {
        const content = await script.textContent();
        const data = JSON.parse(content!);
        if (data['@type'] === 'CollectionPage') {
          hasCollectionSchema = true;
          expect(data.url).toBe('https://polarisfinance.io/blog');
        }
      }

      expect(hasCollectionSchema).toBe(true);
    });
  });

  test.describe('Technical SEO', () => {
    test('robots.txt is accessible', async ({ page }) => {
      const response = await page.goto('/robots.txt');
      expect(response?.status()).toBe(200);

      const content = await page.content();
      expect(content).toContain('User-agent');
      expect(content).toContain('sitemap');
    });

    test('sitemap.xml is accessible', async ({ page }) => {
      const response = await page.goto('/sitemap.xml');
      expect(response?.status()).toBe(200);

      const content = await page.content();
      expect(content).toContain('<?xml');
      expect(content).toContain('https://polarisfinance.io');
      expect(content).toContain('https://polarisfinance.io/blog');
    });

    test('has proper lang attribute', async ({ page }) => {
      await page.goto('/');
      const lang = await page.locator('html').getAttribute('lang');
      expect(lang).toBe('en');
    });

    test('has viewport meta tag', async ({ page }) => {
      await page.goto('/');
      const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
      expect(viewport).toContain('width=device-width');
    });

    test('has theme-color meta tag', async ({ page }) => {
      await page.goto('/');
      const themeColor = await page.locator('meta[name="theme-color"]').getAttribute('content');
      expect(themeColor).toBeTruthy();
    });
  });

  test.describe('Heading Structure', () => {
    test('homepage has single h1', async ({ page }) => {
      await page.goto('/');
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
    });

    test('h1 contains relevant keywords', async ({ page }) => {
      await page.goto('/');
      const h1Text = await page.locator('h1').textContent();
      expect(h1Text?.toLowerCase()).toContain('stablecoin');
    });

    test('proper heading hierarchy', async ({ page }) => {
      await page.goto('/');

      const headings = await page.evaluate(() => {
        const all = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        return all.map(h => ({
          tag: h.tagName.toLowerCase(),
          level: parseInt(h.tagName.charAt(1)),
          text: h.textContent?.slice(0, 50)
        }));
      });

      // First heading should be h1
      expect(headings[0].level).toBe(1);

      // Check for no level skips (e.g., h1 -> h3 without h2)
      for (let i = 1; i < headings.length; i++) {
        const currentLevel = headings[i].level;
        const prevLevel = headings[i - 1].level;
        // Can go same level, up one, or down to any level
        if (currentLevel > prevLevel) {
          expect(currentLevel - prevLevel).toBeLessThanOrEqual(1);
        }
      }
    });

    test('blog page has single h1', async ({ page }) => {
      await page.goto('/blog');
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
    });
  });
});
