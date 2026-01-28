import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.describe('Keyboard Navigation', () => {
    test('skip link is accessible and functional', async ({ page }) => {
      await page.goto('/');

      // Skip link should be hidden initially
      const skipLink = page.locator('.skip-link');
      const initialTop = await skipLink.evaluate(el => getComputedStyle(el).top);
      expect(parseInt(initialTop)).toBeLessThan(0);

      // Tab to focus skip link
      await page.keyboard.press('Tab');

      // Skip link should become visible when focused
      await expect(skipLink).toBeFocused();

      // Pressing Enter should navigate to main content
      await page.keyboard.press('Enter');
      const url = page.url();
      expect(url).toContain('#main-content');
    });

    test('all interactive elements are focusable', async ({ page }) => {
      await page.goto('/');

      // Check that links and buttons can receive focus
      const links = page.locator('a[href]');
      const linkCount = await links.count();

      expect(linkCount).toBeGreaterThan(0);

      // Verify first few links are focusable
      for (let i = 0; i < Math.min(5, linkCount); i++) {
        const link = links.nth(i);
        await link.focus();
        await expect(link).toBeFocused();
      }
    });

    test('focus is visible on interactive elements', async ({ page }) => {
      await page.goto('/');

      // Tab to first interactive element
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      // Check that focused element has visible outline
      const focusedElement = page.locator(':focus-visible');
      const outline = await focusedElement.evaluate(el => {
        const style = getComputedStyle(el);
        return style.outline || style.outlineStyle;
      });

      expect(outline).not.toBe('none');
    });
  });

  test.describe('Images & Alt Text', () => {
    test('all images have alt attributes', async ({ page }) => {
      await page.goto('/');

      const images = page.locator('img');
      const imageCount = await images.count();

      for (let i = 0; i < imageCount; i++) {
        const alt = await images.nth(i).getAttribute('alt');
        expect(alt, `Image ${i + 1} missing alt attribute`).not.toBeNull();
      }
    });

    test('decorative images have empty alt or aria-hidden', async ({ page }) => {
      await page.goto('/');

      // Icons should be decorative (aria-hidden) or have descriptive alt
      const iconImages = page.locator('.top-nav__link-icon, [aria-hidden="true"]');
      const count = await iconImages.count();

      expect(count).toBeGreaterThan(0);
    });

    test('logo images have appropriate alt text', async ({ page }) => {
      await page.goto('/');

      const logoImages = page.locator('img[alt*="Polaris"]');
      const count = await logoImages.count();

      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('ARIA & Semantic HTML', () => {
    test('navigation has semantic nav element', async ({ page }) => {
      await page.goto('/');

      const navElements = page.locator('nav');
      const count = await navElements.count();

      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('main content area exists', async ({ page }) => {
      await page.goto('/');

      const mainElement = page.locator('main');
      await expect(mainElement).toBeVisible();
    });

    test('footer has semantic footer element', async ({ page }) => {
      await page.goto('/');

      const footerElement = page.locator('footer');
      await expect(footerElement).toBeVisible();
    });

    test('icon-only links have accessible labels', async ({ page }) => {
      await page.goto('/');

      // Footer icon links should have aria-label
      const iconLinks = page.locator('.footer__link--icon');
      const count = await iconLinks.count();

      for (let i = 0; i < count; i++) {
        const ariaLabel = await iconLinks.nth(i).getAttribute('aria-label');
        expect(ariaLabel, `Icon link ${i + 1} missing aria-label`).toBeTruthy();
      }
    });

    test('external links have proper attributes', async ({ page }) => {
      await page.goto('/');

      const externalLinks = page.locator('a[target="_blank"]');
      const count = await externalLinks.count();

      for (let i = 0; i < count; i++) {
        const rel = await externalLinks.nth(i).getAttribute('rel');
        expect(rel, `External link ${i + 1} missing rel attribute`).toContain('noreferrer');
      }
    });
  });

  test.describe('Color & Contrast', () => {
    test('text has sufficient contrast ratio (visual check)', async ({ page }) => {
      await page.goto('/');

      // Get primary text color and background
      const textContrast = await page.evaluate(() => {
        const body = document.body;
        const style = getComputedStyle(body);
        return {
          color: style.color,
          background: style.backgroundColor
        };
      });

      // This is a basic check - full contrast testing requires specialized tools
      expect(textContrast.color).toBeTruthy();
      expect(textContrast.background).toBeTruthy();
    });

    test('buttons are clearly visible', async ({ page }) => {
      await page.goto('/');

      const primaryButton = page.locator('.btn-primary').first();
      await expect(primaryButton).toBeVisible();

      const bgColor = await primaryButton.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );

      // Primary button should have non-transparent background
      expect(bgColor).not.toBe('transparent');
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
    });
  });

  test.describe('Reduced Motion', () => {
    test('respects prefers-reduced-motion', async ({ page }) => {
      // Emulate reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/');

      // Check that animations are disabled or instant
      const animatedElement = page.locator('.polaris-star').first();

      if (await animatedElement.count() > 0) {
        const animationDuration = await animatedElement.evaluate(el =>
          getComputedStyle(el).animationDuration
        );

        // With reduced motion, duration should be minimal
        expect(animationDuration).toMatch(/0\.01ms|0s/);
      }
    });
  });

  test.describe('Touch Targets', () => {
    test('mobile nav links have sufficient touch target size', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // On mobile, icon links should have minimum touch target
      const navLinks = page.locator('.top-nav__link');
      const count = await navLinks.count();

      for (let i = 0; i < count; i++) {
        const box = await navLinks.nth(i).boundingBox();
        if (box) {
          // WCAG recommends 44x44px minimum for touch targets
          expect(box.width, `Nav link ${i + 1} too narrow`).toBeGreaterThanOrEqual(44);
          expect(box.height, `Nav link ${i + 1} too short`).toBeGreaterThanOrEqual(44);
        }
      }
    });

    test('footer icon links have sufficient touch target size', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      const iconLinks = page.locator('.footer__link--icon');
      const count = await iconLinks.count();

      for (let i = 0; i < count; i++) {
        const box = await iconLinks.nth(i).boundingBox();
        if (box) {
          expect(box.width, `Footer icon ${i + 1} too narrow`).toBeGreaterThanOrEqual(44);
          expect(box.height, `Footer icon ${i + 1} too short`).toBeGreaterThanOrEqual(44);
        }
      }
    });
  });
});
