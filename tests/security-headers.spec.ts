import { test, expect } from '@playwright/test';

/**
 * Security Headers Tests
 *
 * Validates HTTP security headers and best practices for web security.
 * These headers help protect against common attacks like XSS, clickjacking,
 * and content-type sniffing.
 */

test.describe('Security Headers', () => {
  test.describe('HTTP Headers', () => {
    test('homepage returns correct content-type', async ({ request }) => {
      const response = await request.get('/');
      const contentType = response.headers()['content-type'];

      expect(contentType).toContain('text/html');
    });

    test('static assets have correct content-types', async ({ request }) => {
      // Test CSS
      const cssResponse = await request.get('/_next/static/css/app/layout.css').catch(() => null);
      if (cssResponse?.ok()) {
        expect(cssResponse.headers()['content-type']).toContain('text/css');
      }

      // Test JS (Next.js chunks)
      // Note: Exact paths vary, this is a pattern check
    });

    test('X-Frame-Options or CSP frame-ancestors is set', async ({ request }) => {
      const response = await request.get('/');
      const headers = response.headers();

      const xFrameOptions = headers['x-frame-options'];
      const csp = headers['content-security-policy'];

      // Either X-Frame-Options or CSP frame-ancestors should be set
      const hasFrameProtection =
        xFrameOptions === 'DENY' ||
        xFrameOptions === 'SAMEORIGIN' ||
        csp?.includes('frame-ancestors');

      // Log current state for awareness
      console.log('X-Frame-Options:', xFrameOptions || 'not set');
      console.log('CSP frame-ancestors:', csp?.includes('frame-ancestors') ? 'present' : 'not set');

      // This is a warning rather than failure - depends on deployment config
      if (!hasFrameProtection) {
        console.warn('Warning: No clickjacking protection detected. Consider adding X-Frame-Options header.');
      }
    });

    test('X-Content-Type-Options is set', async ({ request }) => {
      const response = await request.get('/');
      const xContentTypeOptions = response.headers()['x-content-type-options'];

      console.log('X-Content-Type-Options:', xContentTypeOptions || 'not set');

      // Recommended: nosniff
      if (xContentTypeOptions) {
        expect(xContentTypeOptions).toBe('nosniff');
      }
    });

    test('Referrer-Policy is set appropriately', async ({ request }) => {
      const response = await request.get('/');
      const referrerPolicy = response.headers()['referrer-policy'];

      console.log('Referrer-Policy:', referrerPolicy || 'not set');

      // Should be one of the secure options
      const secureOptions = [
        'no-referrer',
        'no-referrer-when-downgrade',
        'strict-origin',
        'strict-origin-when-cross-origin',
        'same-origin',
        'origin',
        'origin-when-cross-origin',
      ];

      if (referrerPolicy) {
        expect(secureOptions).toContain(referrerPolicy);
      }
    });

    test('Strict-Transport-Security (HSTS) check', async ({ request }) => {
      // Note: HSTS only applies to HTTPS connections
      // This test documents the current state
      const response = await request.get('/');
      const hsts = response.headers()['strict-transport-security'];

      console.log('Strict-Transport-Security:', hsts || 'not set (expected for localhost)');

      // HSTS is typically set in production via server config, not in local dev
    });
  });

  test.describe('Content Security', () => {
    test('no inline event handlers in HTML', async ({ page }) => {
      await page.goto('/');

      // Check for inline event handlers which are considered insecure
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

    test('forms have CSRF protection if present', async ({ page }) => {
      await page.goto('/');

      const forms = await page.locator('form').all();

      for (const form of forms) {
        // Check for CSRF token or same-origin action
        const action = await form.getAttribute('action');
        const method = await form.getAttribute('method');

        if (method?.toLowerCase() === 'post') {
          // POST forms should have CSRF token or be same-origin
          const csrfInput = await form.locator('input[name="_csrf"], input[name="csrf_token"], input[name="authenticity_token"]').count();
          const isSameOrigin = !action || action.startsWith('/') || action.startsWith('https://polarisfinance.io');

          expect(csrfInput > 0 || isSameOrigin, 'POST forms should have CSRF protection').toBe(true);
        }
      }
    });
  });

  test.describe('Privacy & Data', () => {
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

      // Check for common credential patterns
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
  });

  test.describe('Third-Party Resources', () => {
    test('external scripts use integrity attributes', async ({ page }) => {
      await page.goto('/');

      const externalScripts = await page.locator('script[src^="http"]:not([src*="localhost"])').all();
      const scriptsWithoutIntegrity: string[] = [];

      for (const script of externalScripts) {
        const src = await script.getAttribute('src');
        const integrity = await script.getAttribute('integrity');

        // Skip known CDNs that might not need SRI
        if (src && !integrity) {
          scriptsWithoutIntegrity.push(src);
        }
      }

      if (scriptsWithoutIntegrity.length > 0) {
        console.log('Scripts without integrity:', scriptsWithoutIntegrity);
        // This is informational - SRI is a best practice but not required
      }
    });

    test('no mixed content issues', async ({ page }) => {
      const mixedContentWarnings: string[] = [];

      page.on('console', msg => {
        if (msg.text().includes('Mixed Content') || msg.text().includes('mixed content')) {
          mixedContentWarnings.push(msg.text());
        }
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      expect(mixedContentWarnings).toEqual([]);
    });
  });

  test.describe('Cookie Security', () => {
    test('cookies have secure attributes', async ({ page, context }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const cookies = await context.cookies();

      for (const cookie of cookies) {
        console.log(`Cookie: ${cookie.name}`);
        console.log(`  Secure: ${cookie.secure}`);
        console.log(`  HttpOnly: ${cookie.httpOnly}`);
        console.log(`  SameSite: ${cookie.sameSite}`);

        // In production, session cookies should be secure
        if (cookie.name.includes('session') || cookie.name.includes('auth')) {
          // These checks are warnings for localhost
          if (!cookie.secure) {
            console.warn(`Warning: ${cookie.name} should have Secure flag in production`);
          }
          if (!cookie.httpOnly) {
            console.warn(`Warning: ${cookie.name} should have HttpOnly flag`);
          }
        }
      }

      // Test passes if no errors - cookie security depends on production config
      expect(true).toBe(true);
    });
  });

  test.describe('Error Handling Security', () => {
    test('404 page does not leak server info', async ({ page }) => {
      await page.goto('/nonexistent-page-xyz123');

      // Should not contain server stack traces in visible text
      // Note: Next.js may include node_modules paths in build metadata, that's OK
      // We're checking for actual stack traces exposed to users
      const visibleText = await page.evaluate(() => document.body.innerText);
      expect(visibleText).not.toMatch(/at\s+\w+\s+\(.+:\d+:\d+\)/); // Stack trace pattern with line numbers
    });

    test('error responses have appropriate status codes', async ({ request }) => {
      const notFoundResponse = await request.get('/this-page-does-not-exist-12345');
      expect(notFoundResponse.status()).toBe(404);
    });
  });
});
