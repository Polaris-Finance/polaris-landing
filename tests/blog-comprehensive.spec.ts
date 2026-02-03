import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Comprehensive Blog Tests
 *
 * Tests all blog functionality including listing, individual posts,
 * SEO, accessibility, and content rendering.
 */

const blogPosts = [
  { slug: 'why-polaris', title: 'Why Polaris' },
  { slug: 'polaris-mints-anything', title: 'Polaris Mints Anything' },
];

test.describe('Blog Comprehensive Tests', () => {
  test.describe('Blog Listing Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/blog');
    });

    test('displays all blog posts', async ({ page }) => {
      for (const post of blogPosts) {
        const postLink = page.locator(`a[href="/blog/${post.slug}"]`);
        await expect(postLink).toBeVisible();
      }
    });

    test('blog cards have required elements', async ({ page }) => {
      // Look for blog post links
      const blogLinks = page.locator('a[href^="/blog/"]');
      const count = await blogLinks.count();

      expect(count).toBeGreaterThanOrEqual(blogPosts.length);

      // Verify links are visible
      for (let i = 0; i < Math.min(count, 3); i++) {
        await expect(blogLinks.nth(i)).toBeVisible();
      }
    });

    test('blog posts are sorted by date (newest first)', async ({ page }) => {
      const dates = await page.locator('time, .blog-card__date').allTextContents();

      // If dates are displayed, they should be in descending order
      if (dates.length >= 2) {
        const parsedDates = dates.map(d => new Date(d).getTime()).filter(d => !isNaN(d));

        if (parsedDates.length >= 2) {
          for (let i = 1; i < parsedDates.length; i++) {
            expect(parsedDates[i - 1]).toBeGreaterThanOrEqual(parsedDates[i]);
          }
        }
      }
    });

    test('pagination works if present', async ({ page }) => {
      const nextButton = page.locator('a[rel="next"], .pagination__next, [aria-label="Next page"]');

      if (await nextButton.count() > 0) {
        await nextButton.click();
        await expect(page).toHaveURL(/\/blog\/(page\/2|\?page=2)/);
      }
    });
  });

  test.describe('Individual Blog Posts', () => {
    for (const post of blogPosts) {
      test.describe(`Post: ${post.slug}`, () => {
        test('page loads successfully', async ({ page }) => {
          const response = await page.goto(`/blog/${post.slug}`);
          expect(response?.status()).toBe(200);
        });

        test('has correct metadata', async ({ page }) => {
          await page.goto(`/blog/${post.slug}`);

          // Has title
          const title = await page.title();
          expect(title.length).toBeGreaterThan(10);

          // Has meta description
          const description = await page.locator('meta[name="description"]').getAttribute('content');
          expect(description).toBeTruthy();
          expect(description!.length).toBeGreaterThan(50);

          // Has canonical URL
          const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
          expect(canonical).toContain(`/blog/${post.slug}`);
        });

        test('has Open Graph tags', async ({ page }) => {
          await page.goto(`/blog/${post.slug}`);

          const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
          const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
          const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
          const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');

          expect(ogTitle).toBeTruthy();
          expect(ogDescription).toBeTruthy();
          expect(ogType).toBe('article');
          expect(ogUrl).toContain(`/blog/${post.slug}`);
        });

        test('has Article schema (JSON-LD)', async ({ page }) => {
          await page.goto(`/blog/${post.slug}`);

          const scripts = await page.locator('script[type="application/ld+json"]').all();
          let hasArticleSchema = false;

          for (const script of scripts) {
            const content = await script.textContent();
            if (content) {
              try {
                const data = JSON.parse(content);
                if (data['@type'] === 'Article' || data['@type'] === 'BlogPosting') {
                  hasArticleSchema = true;
                  expect(data.headline).toBeTruthy();
                  expect(data.datePublished).toBeTruthy();
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }

          expect(hasArticleSchema, `${post.slug} should have Article schema`).toBe(true);
        });

        test('has single h1 heading', async ({ page }) => {
          await page.goto(`/blog/${post.slug}`);

          const h1Count = await page.locator('h1').count();
          expect(h1Count).toBe(1);
        });

        test('content is readable', async ({ page }) => {
          await page.goto(`/blog/${post.slug}`);

          // Article content should exist
          const article = page.locator('article, .blog-post, .blog-content, main');
          await expect(article.first()).toBeVisible();

          // Should have paragraphs
          const paragraphs = await article.first().locator('p').count();
          expect(paragraphs).toBeGreaterThan(0);
        });

        test('images have alt text', async ({ page }) => {
          await page.goto(`/blog/${post.slug}`);

          const images = await page.locator('article img, .blog-content img').all();

          for (const img of images) {
            const alt = await img.getAttribute('alt');
            expect(alt, 'All blog images should have alt text').toBeTruthy();
          }
        });

        test('passes accessibility checks', async ({ page }) => {
          await page.goto(`/blog/${post.slug}`);

          const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa'])
            .analyze();

          expect(results.violations).toEqual([]);
        });
      });
    }
  });

  test.describe('Blog Navigation', () => {
    test('can navigate from listing to post and back', async ({ page }) => {
      await page.goto('/blog');

      // Click first post link
      const firstPost = page.locator('a[href^="/blog/"]').first();
      await firstPost.click();

      // Should be on a post page
      await expect(page).toHaveURL(/\/blog\/.+/);

      // Navigate back to listing
      await page.goto('/blog');
      await expect(page).toHaveURL('/blog');
    });

    test('breadcrumbs work if present', async ({ page }) => {
      await page.goto(`/blog/${blogPosts[0].slug}`);

      const breadcrumbs = page.locator('nav[aria-label="Breadcrumb"], .breadcrumbs');

      if (await breadcrumbs.count() > 0) {
        const homeLink = breadcrumbs.locator('a').first();
        await homeLink.click();
        await expect(page).toHaveURL('/');
      }
    });

    test('related posts shown if present', async ({ page }) => {
      await page.goto(`/blog/${blogPosts[0].slug}`);

      const relatedPosts = page.locator('.related-posts, [aria-label="Related posts"]');

      if (await relatedPosts.count() > 0) {
        const links = await relatedPosts.locator('a').count();
        expect(links).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Blog Responsive Design', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 },
    ];

    for (const viewport of viewports) {
      test(`blog listing renders correctly on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/blog');

        // Page should not have horizontal overflow
        const hasOverflow = await page.evaluate(() =>
          document.documentElement.scrollWidth > document.documentElement.clientWidth
        );
        expect(hasOverflow).toBe(false);

        // All cards should be visible
        const cards = page.locator('article, .blog-card');
        const count = await cards.count();

        for (let i = 0; i < count; i++) {
          await expect(cards.nth(i)).toBeVisible();
        }
      });

      test(`blog post renders correctly on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(`/blog/${blogPosts[0].slug}`);

        // Content should be readable
        const content = page.locator('article, .blog-content, main').first();
        await expect(content).toBeVisible();

        // Text should not overflow
        const hasOverflow = await page.evaluate(() =>
          document.documentElement.scrollWidth > document.documentElement.clientWidth
        );
        expect(hasOverflow).toBe(false);
      });
    }
  });

  test.describe('Blog Performance', () => {
    test('blog listing loads quickly', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/blog', { waitUntil: 'domcontentloaded' });
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000);
    });

    test('blog post loads quickly', async ({ page }) => {
      const startTime = Date.now();
      await page.goto(`/blog/${blogPosts[0].slug}`, { waitUntil: 'domcontentloaded' });
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000);
    });

    test('images are optimized', async ({ page }) => {
      await page.goto(`/blog/${blogPosts[0].slug}`);

      const images = await page.locator('article img, .blog-content img').all();

      for (const img of images) {
        // Check for lazy loading
        const loading = await img.getAttribute('loading');
        const decoding = await img.getAttribute('decoding');

        // Images below the fold should be lazy loaded
        // This is informational - depends on image position
        console.log(`Image loading: ${loading}, decoding: ${decoding}`);
      }
    });
  });

  test.describe('Blog Markdown Rendering', () => {
    test('code blocks are styled', async ({ page }) => {
      await page.goto(`/blog/${blogPosts[0].slug}`);

      const codeBlocks = page.locator('pre code, .code-block');

      if (await codeBlocks.count() > 0) {
        const codeBlock = codeBlocks.first();
        const bgColor = await codeBlock.evaluate(el =>
          getComputedStyle(el).backgroundColor
        );

        // Code blocks should have a distinct background
        expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
      }
    });

    test('links in content work', async ({ page }) => {
      await page.goto(`/blog/${blogPosts[0].slug}`);

      const contentLinks = page.locator('article a, .blog-content a');
      const count = await contentLinks.count();

      for (let i = 0; i < Math.min(count, 3); i++) {
        const link = contentLinks.nth(i);
        const href = await link.getAttribute('href');
        expect(href).toBeTruthy();
      }
    });

    test('headings have proper hierarchy', async ({ page }) => {
      await page.goto(`/blog/${blogPosts[0].slug}`);

      const headings = await page.evaluate(() => {
        const all = Array.from(document.querySelectorAll('article h1, article h2, article h3, article h4'));
        return all.map(h => parseInt(h.tagName.charAt(1)));
      });

      // Check no level skips greater than 1
      for (let i = 1; i < headings.length; i++) {
        if (headings[i] > headings[i - 1]) {
          expect(headings[i] - headings[i - 1]).toBeLessThanOrEqual(1);
        }
      }
    });
  });
});
