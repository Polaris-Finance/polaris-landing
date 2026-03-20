import { test, expect } from '@playwright/test';

/**
 * Security Tests
 *
 * Validates application-level security best practices.
 * Infrastructure-level headers (X-Frame-Options, HSTS, CSP, etc.) are
 * configured at the GitHub Pages / CDN layer and verified by Lighthouse.
 */

test.describe('Content Security', () => {
  test('no inline event handlers in HTML', async ({ page }) => {
    await page.goto('/');

    const inlineHandlers = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const violations: string[] = [];

      elements.forEach((el) => {
        const attrs = el.attributes;
        for (let j = 0; j < attrs.length; j++) {
          if (attrs[j].name.startsWith('on') && attrs[j].name !== 'onload') {
            violations.push(`${el.tagName}[${attrs[j].name}]`);
          }
        }
      });

      return violations;
    });

    expect(inlineHandlers).toEqual([]);
  });

  test('no javascript: URLs', async ({ page }) => {
    await page.goto('/');

    const jsLinks = await page.locator('a[href^="javascript:"]').count();
    expect(jsLinks).toBe(0);
  });

  test('no sensitive data in URLs', async ({ page }) => {
    await page.goto('/');

    const links = await page.locator('a[href]').all();
    const sensitivePatterns = [
      /password=/i,
      /api[_-]?key=/i,
      /secret=/i,
      /token=/i,
      /auth=/i,
    ];

    const violations: string[] = [];

    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href) {
        for (const pattern of sensitivePatterns) {
          if (pattern.test(href)) {
            violations.push(href);
          }
        }
      }
    }

    expect(violations).toEqual([]);
  });

  test('no credentials in source', async ({ page }) => {
    await page.goto('/');

    const html = await page.content();

    const credentialPatterns = [
      /api[_-]?key\s*[:=]\s*["'][^"']{20,}/i,
      /secret\s*[:=]\s*["'][^"']{10,}/i,
      /password\s*[:=]\s*["'][^"']+["']/i,
      /private[_-]?key/i,
    ];

    const violations: string[] = [];

    for (const pattern of credentialPatterns) {
      if (pattern.test(html)) {
        violations.push(pattern.source);
      }
    }

    expect(violations, 'No credentials should be exposed in HTML').toEqual([]);
  });

  test('404 page does not leak server info', async ({ page }) => {
    await page.goto('/nonexistent-page-xyz123');

    const visibleText = await page.evaluate(() => document.body.innerText);
    expect(visibleText).not.toMatch(/at\s+\w+\s+\(.+:\d+:\d+\)/);
  });
});
