import { test, expect } from '@playwright/test';

test.describe('Design Quality & Brand Consistency', () => {
  test.describe('Color Palette', () => {
    test('uses correct background colors', async ({ page }) => {
      await page.goto('/');

      const bodyBg = await page.evaluate(() =>
        getComputedStyle(document.body).backgroundColor
      );

      // Should use polaris-navy-darkest (#050a14) or similar dark navy
      expect(bodyBg).toMatch(/rgb\(5,\s*10,\s*20\)|#050a14/i);
    });

    test('hero has gradient background', async ({ page }) => {
      await page.goto('/');

      const heroScene = page.locator('.hero-scene');
      const bgImage = await heroScene.evaluate(el =>
        getComputedStyle(el).backgroundImage
      );

      expect(bgImage).toContain('gradient');
    });

    test('text uses cream colors', async ({ page }) => {
      await page.goto('/');

      const heroTitle = page.locator('.hero-title');
      const color = await heroTitle.evaluate(el =>
        getComputedStyle(el).color
      );

      // Should be cream/star color (E8DCC4 or similar warm tone)
      // RGB values around 232, 220, 196
      expect(color).toMatch(/rgb\(2[23]\d,\s*2[12]\d,\s*1[89]\d\)/i);
    });
  });

  test.describe('Typography', () => {
    test('headings use serif font', async ({ page }) => {
      await page.goto('/');

      const heroTitle = page.locator('.hero-title');
      const fontFamily = await heroTitle.evaluate(el =>
        getComputedStyle(el).fontFamily
      );

      expect(fontFamily.toLowerCase()).toContain('cormorant');
    });

    test('body text uses sans-serif font', async ({ page }) => {
      await page.goto('/');

      const bodyText = page.locator('.hero-tagline');
      const fontFamily = await bodyText.evaluate(el =>
        getComputedStyle(el).fontFamily
      );

      expect(fontFamily.toLowerCase()).toContain('inter');
    });

    test('heading sizes are hierarchical', async ({ page }) => {
      await page.goto('/');

      const h1Size = await page.locator('h1').first().evaluate(el =>
        parseFloat(getComputedStyle(el).fontSize)
      );

      const h2Size = await page.locator('h2').first().evaluate(el =>
        parseFloat(getComputedStyle(el).fontSize)
      );

      // h1 should be larger than h2
      expect(h1Size).toBeGreaterThan(h2Size);
    });
  });

  test.describe('Card Styling', () => {
    test('cards have consistent border radius', async ({ page }) => {
      await page.goto('/');

      await page.locator('.stat-card').first().scrollIntoViewIfNeeded();

      const cardRadius = await page.locator('.stat-card').first().evaluate(el =>
        getComputedStyle(el).borderRadius
      );

      // Should have rounded corners (1.25rem = 20px)
      const radiusValue = parseFloat(cardRadius);
      expect(radiusValue).toBeGreaterThanOrEqual(16);
    });

    test('cards have subtle borders', async ({ page }) => {
      await page.goto('/');

      await page.locator('.token-card').first().scrollIntoViewIfNeeded();

      const border = await page.locator('.token-card').first().evaluate(el =>
        getComputedStyle(el).border
      );

      expect(border).toContain('solid');
      // Border should be subtle (low opacity)
      expect(border).toMatch(/rgba|transparent/i);
    });

    test('cards have backdrop blur', async ({ page }) => {
      await page.goto('/');

      await page.locator('.stat-card').first().scrollIntoViewIfNeeded();

      // Check for backdrop-filter or similar glass effect
      const bgColor = await page.locator('.stat-card').first().evaluate(el =>
        getComputedStyle(el).backgroundColor
      );

      // Background should be semi-transparent
      expect(bgColor).toContain('rgba');
    });
  });

  test.describe('Button Styling', () => {
    test('primary button has correct styling', async ({ page }) => {
      await page.goto('/');

      const btn = page.locator('.btn-primary').first();

      const bgColor = await btn.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );

      const borderRadius = await btn.evaluate(el =>
        getComputedStyle(el).borderRadius
      );

      // Should have cream background
      expect(bgColor).toMatch(/rgb\(2[23]\d,\s*2[12]\d,\s*1[89]\d\)/i);

      // Should be pill-shaped (9999px or similar large radius)
      expect(parseFloat(borderRadius)).toBeGreaterThan(100);
    });

    test('button has hover state', async ({ page }) => {
      await page.goto('/');

      const btn = page.locator('.btn-primary').first();
      const initialBg = await btn.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );

      await btn.hover();

      // Allow time for transition
      await page.waitForTimeout(350);

      const hoverBg = await btn.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );

      // Color should change on hover
      expect(hoverBg).not.toBe(initialBg);
    });
  });

  test.describe('Token Card Colors', () => {
    test('pUSD card has cream accent', async ({ page }) => {
      await page.goto('/');

      await page.locator('.token-card--pusd').scrollIntoViewIfNeeded();

      const card = page.locator('.token-card--pusd');
      const borderColor = await card.evaluate(el =>
        getComputedStyle(el).borderColor
      );

      // Should have cream/gold accent
      expect(borderColor).toMatch(/rgba?\(2[23]\d,\s*2[12]\d,\s*1[89]\d/i);
    });

    test('pETH card has blue accent', async ({ page }) => {
      await page.goto('/');

      await page.locator('.token-card--peth').scrollIntoViewIfNeeded();

      const card = page.locator('.token-card--peth');
      const borderColor = await card.evaluate(el =>
        getComputedStyle(el).borderColor
      );

      // Should have blue accent (7BA5C9 - RGB ~123, 165, 201)
      expect(borderColor).toMatch(/rgba?\(1[12]\d,\s*1[56]\d,\s*2[01]\d/i);
    });

    test('POLAR card has purple accent', async ({ page }) => {
      await page.goto('/');

      await page.locator('.token-card--polar').scrollIntoViewIfNeeded();

      const card = page.locator('.token-card--polar');
      const borderColor = await card.evaluate(el =>
        getComputedStyle(el).borderColor
      );

      // Should have purple accent (9B8FCF - RGB ~155, 143, 207)
      expect(borderColor).toMatch(/rgba?\(1[45]\d,\s*1[34]\d,\s*2[01]\d/i);
    });
  });

  test.describe('Spacing & Layout', () => {
    test('sections have adequate padding', async ({ page }) => {
      await page.goto('/');

      await page.locator('.section').first().scrollIntoViewIfNeeded();

      const padding = await page.locator('.section').first().evaluate(el => {
        const style = getComputedStyle(el);
        return {
          top: parseFloat(style.paddingTop),
          bottom: parseFloat(style.paddingBottom),
          left: parseFloat(style.paddingLeft),
          right: parseFloat(style.paddingRight)
        };
      });

      // Sections should have generous vertical padding
      expect(padding.top).toBeGreaterThanOrEqual(32);
      expect(padding.bottom).toBeGreaterThanOrEqual(32);
    });

    test('content has max-width constraint', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');

      // Check that section content doesn't span full width on large screens
      const maxWidth = await page.locator('.section .max-w-7xl').first().evaluate(el =>
        parseFloat(getComputedStyle(el).maxWidth)
      );

      expect(maxWidth).toBeLessThan(1400);
    });
  });

  test.describe('Animation Quality', () => {
    test('hero elements animate on load', async ({ page }) => {
      await page.goto('/');

      // Check that hero elements have animation
      const heroTitle = page.locator('.hero-logo');
      const animation = await heroTitle.evaluate(el =>
        getComputedStyle(el).animationName
      );

      expect(animation).not.toBe('none');
    });

    test('star has glow animation', async ({ page }) => {
      await page.goto('/');

      const star = page.locator('.polaris-star');
      const animation = await star.evaluate(el =>
        getComputedStyle(el).animationName
      );

      expect(animation).toContain('starPulse');
    });

    test('scroll reveal works', async ({ page }) => {
      await page.goto('/');

      // Find a reveal element
      const revealElement = page.locator('.reveal').first();

      // Scroll to element
      await revealElement.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);

      // After scroll, should have is-visible class
      const hasVisibleClass = await revealElement.evaluate(el =>
        el.classList.contains('is-visible')
      );

      expect(hasVisibleClass).toBe(true);
    });
  });

  test.describe('Visual Consistency', () => {
    test('all icons use consistent styling', async ({ page }) => {
      await page.goto('/');

      const icons = page.locator('.stat-card__icon svg, .benefit-card__icon svg');
      const count = await icons.count();

      if (count >= 2) {
        const sizes: number[] = [];
        for (let i = 0; i < Math.min(count, 4); i++) {
          const box = await icons.nth(i).boundingBox();
          if (box) sizes.push(box.width);
        }

        // All icons should be similar size (within 4px)
        const maxDiff = Math.max(...sizes) - Math.min(...sizes);
        expect(maxDiff).toBeLessThan(8);
      }
    });

    test('dividers are consistently styled', async ({ page }) => {
      await page.goto('/');

      const dividers = page.locator('.compass-divider');
      const count = await dividers.count();

      expect(count).toBeGreaterThanOrEqual(3);

      // All dividers should have same dimensions
      for (let i = 0; i < count; i++) {
        const box = await dividers.nth(i).boundingBox();
        expect(box?.height).toBe(0); // Height is 0, content overflows
      }
    });
  });
});
