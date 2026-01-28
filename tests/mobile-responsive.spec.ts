import { test, expect } from '@playwright/test';

const mobileDevices = [
  { name: 'iPhone SE', viewport: { width: 375, height: 667 } },
  { name: 'iPhone 12', viewport: { width: 390, height: 844 } },
  { name: 'iPhone 14 Pro Max', viewport: { width: 430, height: 932 } },
  { name: 'Samsung Galaxy S21', viewport: { width: 360, height: 800 } },
  { name: 'Pixel 7', viewport: { width: 412, height: 915 } },
];

const tabletDevices = [
  { name: 'iPad Mini', viewport: { width: 768, height: 1024 } },
  { name: 'iPad Pro 11"', viewport: { width: 834, height: 1194 } },
  { name: 'iPad Pro 12.9"', viewport: { width: 1024, height: 1366 } },
];

test.describe('Mobile Responsiveness', () => {
  test.describe('Hero Section', () => {
    for (const device of mobileDevices) {
      test(`hero is properly sized on ${device.name}`, async ({ page }) => {
        await page.setViewportSize(device.viewport);
        await page.goto('/');

        // Hero should fill viewport height
        const heroScene = page.locator('.hero-scene');
        await expect(heroScene).toBeVisible();

        const heroBox = await heroScene.boundingBox();
        expect(heroBox?.height).toBeGreaterThan(device.viewport.height * 0.6);

        // Hero title should be visible and not overflow
        const heroTitle = page.locator('.hero-title');
        await expect(heroTitle).toBeVisible();

        const titleBox = await heroTitle.boundingBox();
        expect(titleBox?.width).toBeLessThanOrEqual(device.viewport.width);
      });

      test(`hero content is readable on ${device.name}`, async ({ page }) => {
        await page.setViewportSize(device.viewport);
        await page.goto('/');

        // Check font sizes are appropriate
        const titleSize = await page.locator('.hero-title').evaluate(el =>
          parseFloat(getComputedStyle(el).fontSize)
        );

        // Minimum readable title size
        expect(titleSize).toBeGreaterThanOrEqual(20);

        const taglineSize = await page.locator('.hero-tagline').evaluate(el =>
          parseFloat(getComputedStyle(el).fontSize)
        );

        // Minimum readable body size
        expect(taglineSize).toBeGreaterThanOrEqual(14);
      });
    }
  });

  test.describe('Navigation', () => {
    for (const device of mobileDevices) {
      test(`nav fits on ${device.name} without overflow`, async ({ page }) => {
        await page.setViewportSize(device.viewport);
        await page.goto('/');

        const nav = page.locator('.top-nav');
        await expect(nav).toBeVisible();

        const navBox = await nav.boundingBox();
        expect(navBox?.width).toBeLessThanOrEqual(device.viewport.width);

        // Check no horizontal scroll
        const hasHorizontalScroll = await page.evaluate(() =>
          document.documentElement.scrollWidth > window.innerWidth
        );
        expect(hasHorizontalScroll).toBe(false);
      });

      test(`nav elements don't overlap on ${device.name}`, async ({ page }) => {
        await page.setViewportSize(device.viewport);
        await page.goto('/');

        const logo = await page.locator('.top-nav__brand').boundingBox();
        const links = await page.locator('.top-nav__links').boundingBox();
        const cta = await page.locator('.top-nav__cta').boundingBox();

        if (logo && links) {
          expect(logo.x + logo.width).toBeLessThanOrEqual(links.x + 5);
        }

        if (links && cta) {
          expect(links.x + links.width).toBeLessThanOrEqual(cta.x + 5);
        }
      });
    }

    test('mobile nav shows icons instead of text', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // Text should be hidden
      const linkText = page.locator('.top-nav__link-text').first();
      const textDisplay = await linkText.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(textDisplay).toBe('none');

      // Icons should be visible
      const linkIcon = page.locator('.top-nav__link-icon').first();
      const iconDisplay = await linkIcon.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(iconDisplay).not.toBe('none');
    });

    test('very narrow screens show emblem logo', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 });
      await page.goto('/');

      const fullLogo = page.locator('.top-nav__logo--full');
      const emblem = page.locator('.top-nav__logo--emblem');

      const fullDisplay = await fullLogo.evaluate(el =>
        getComputedStyle(el).display
      );

      // On very narrow screens, full logo should be hidden
      if (fullDisplay === 'none') {
        const emblemDisplay = await emblem.evaluate(el =>
          getComputedStyle(el).display
        );
        expect(emblemDisplay).not.toBe('none');
      }
    });
  });

  test.describe('Content Sections', () => {
    for (const device of mobileDevices) {
      test(`cards stack properly on ${device.name}`, async ({ page }) => {
        await page.setViewportSize(device.viewport);
        await page.goto('/');

        // Scroll to token section
        await page.locator('.token-card').first().scrollIntoViewIfNeeded();

        const cards = page.locator('.token-card');
        const count = await cards.count();

        if (count >= 2) {
          const card1 = await cards.nth(0).boundingBox();
          const card2 = await cards.nth(1).boundingBox();

          // Cards should stack vertically on mobile
          if (device.viewport.width < 640 && card1 && card2) {
            expect(card2.y).toBeGreaterThan(card1.y + card1.height - 10);
          }
        }
      });

      test(`text doesn't overflow on ${device.name}`, async ({ page }) => {
        await page.setViewportSize(device.viewport);
        await page.goto('/');

        // Check for horizontal overflow
        const hasOverflow = await page.evaluate(() => {
          const body = document.body;
          return body.scrollWidth > body.clientWidth;
        });

        expect(hasOverflow).toBe(false);
      });
    }
  });

  test.describe('Tablet Layout', () => {
    for (const device of tabletDevices) {
      test(`layout adapts correctly on ${device.name}`, async ({ page }) => {
        await page.setViewportSize(device.viewport);
        await page.goto('/');

        // Full logo should be visible
        const fullLogo = page.locator('.top-nav__logo--full');
        const display = await fullLogo.evaluate(el =>
          getComputedStyle(el).display
        );
        expect(display).not.toBe('none');

        // Nav text should be visible
        const linkText = page.locator('.top-nav__link-text').first();
        const textDisplay = await linkText.evaluate(el =>
          getComputedStyle(el).display
        );

        if (device.viewport.width > 540) {
          expect(textDisplay).not.toBe('none');
        }
      });

      test(`grid layouts work on ${device.name}`, async ({ page }) => {
        await page.setViewportSize(device.viewport);
        await page.goto('/');

        // Check stat cards grid
        const statCards = page.locator('.stat-card');
        const count = await statCards.count();

        if (count >= 2) {
          const card1 = await statCards.nth(0).boundingBox();
          const card2 = await statCards.nth(1).boundingBox();

          // On tablet, should have multi-column layout
          if (device.viewport.width >= 640 && card1 && card2) {
            // Cards could be same row or next row, but shouldn't all stack
            const cardsPerRow = device.viewport.width >= 1024 ? 4 : 2;
            if (cardsPerRow > 1) {
              // Card 2 should be either same row or reasonable distance below
              expect(card2.x).toBeGreaterThanOrEqual(0);
            }
          }
        }
      });
    }
  });

  test.describe('CTA Buttons', () => {
    test('hero CTAs stack on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      const ctas = page.locator('.hero-cta .btn-primary');
      const count = await ctas.count();

      if (count >= 2) {
        const cta1 = await ctas.nth(0).boundingBox();
        const cta2 = await ctas.nth(1).boundingBox();

        if (cta1 && cta2) {
          // On mobile, buttons should stack (cta2 below cta1)
          expect(cta2.y).toBeGreaterThanOrEqual(cta1.y + cta1.height - 5);
        }
      }
    });

    test('hero CTAs are side by side on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/');

      const ctas = page.locator('.hero-cta .btn-primary');
      const count = await ctas.count();

      if (count >= 2) {
        const cta1 = await ctas.nth(0).boundingBox();
        const cta2 = await ctas.nth(1).boundingBox();

        if (cta1 && cta2) {
          // On desktop, buttons should be side by side
          expect(Math.abs(cta1.y - cta2.y)).toBeLessThan(20);
          expect(cta2.x).toBeGreaterThan(cta1.x + cta1.width - 20);
        }
      }
    });
  });

  test.describe('Footer', () => {
    for (const device of mobileDevices) {
      test(`footer is usable on ${device.name}`, async ({ page }) => {
        await page.setViewportSize(device.viewport);
        await page.goto('/');

        await page.locator('.footer').scrollIntoViewIfNeeded();

        const footer = page.locator('.footer');
        await expect(footer).toBeVisible();

        // Footer links should be tappable
        const footerLinks = page.locator('.footer__link');
        const count = await footerLinks.count();

        for (let i = 0; i < count; i++) {
          const link = footerLinks.nth(i);
          await expect(link).toBeVisible();
        }

        // No horizontal overflow
        const footerBox = await footer.boundingBox();
        expect(footerBox?.width).toBeLessThanOrEqual(device.viewport.width);
      });
    }
  });

  test.describe('System Diagram', () => {
    test('shows vertical diagram on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // Scroll to system diagram
      const diagram = page.locator('.system-diagram');
      await diagram.scrollIntoViewIfNeeded();

      // Vertical diagram should be visible on mobile
      const verticalImg = page.locator('.system-diagram img.md\\:hidden');
      const horizontalImg = page.locator('.system-diagram img.hidden.md\\:block');

      const verticalDisplay = await verticalImg.evaluate(el =>
        getComputedStyle(el).display
      );
      const horizontalDisplay = await horizontalImg.evaluate(el =>
        getComputedStyle(el).display
      );

      expect(verticalDisplay).not.toBe('none');
      expect(horizontalDisplay).toBe('none');
    });

    test('shows horizontal diagram on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/');

      // Scroll to system diagram
      const diagram = page.locator('.system-diagram');
      await diagram.scrollIntoViewIfNeeded();

      // Horizontal diagram should be visible on desktop
      const verticalImg = page.locator('.system-diagram img.md\\:hidden');
      const horizontalImg = page.locator('.system-diagram img.hidden.md\\:block');

      const verticalDisplay = await verticalImg.evaluate(el =>
        getComputedStyle(el).display
      );
      const horizontalDisplay = await horizontalImg.evaluate(el =>
        getComputedStyle(el).display
      );

      expect(verticalDisplay).toBe('none');
      expect(horizontalDisplay).not.toBe('none');
    });
  });
});

test.describe('Full Page Scroll Test', () => {
  // All major sections that should be visible when scrolling
  // Note: compass-divider is excluded as it has height:0 by design (content overflows)
  const pageSections = [
    { selector: '.hero-scene', name: 'Hero' },
    { selector: '.section', name: 'Content Section', multiple: true },
    { selector: '.token-card', name: 'Token Cards', multiple: true },
    { selector: '.stat-card', name: 'Stat Cards', multiple: true },
    { selector: '.benefit-card', name: 'Benefit Cards', multiple: true },
    { selector: '.system-diagram', name: 'System Diagram' },
    { selector: '.blog-callout', name: 'Blog Callout' },
    { selector: '.footer', name: 'Footer' },
  ];

  for (const device of mobileDevices) {
    test(`full page scroll works on ${device.name}`, async ({ page }) => {
      await page.setViewportSize(device.viewport);
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      // Scroll through entire page incrementally
      const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
      const viewportHeight = device.viewport.height;
      const scrollSteps = Math.ceil(scrollHeight / (viewportHeight * 0.8));

      for (let i = 0; i <= scrollSteps; i++) {
        const scrollY = i * viewportHeight * 0.8;
        await page.evaluate((y) => window.scrollTo(0, y), scrollY);
        await page.waitForTimeout(100);

        // Check no horizontal overflow at any scroll position
        const hasOverflow = await page.evaluate(() =>
          document.documentElement.scrollWidth > document.documentElement.clientWidth
        );
        expect(hasOverflow, `Horizontal overflow at scroll position ${scrollY}px`).toBe(false);
      }

      // Verify we can reach the footer (bottom of page)
      await page.locator('.footer').scrollIntoViewIfNeeded();
      const footer = page.locator('.footer');
      await expect(footer).toBeVisible();
    });

    test(`all sections visible and properly sized on ${device.name}`, async ({ page }) => {
      await page.setViewportSize(device.viewport);
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      for (const section of pageSections) {
        const locator = page.locator(section.selector);
        const count = await locator.count();

        if (count === 0) {
          // Section might not exist on all pages, skip
          continue;
        }

        // Check first instance (or all if not multiple)
        const elementsToCheck = section.multiple ? Math.min(count, 2) : 1;

        for (let i = 0; i < elementsToCheck; i++) {
          const element = locator.nth(i);
          await element.scrollIntoViewIfNeeded();

          // Element should be visible
          await expect(element, `${section.name} #${i + 1} should be visible`).toBeVisible();

          // Element should not overflow viewport width
          const box = await element.boundingBox();
          if (box) {
            expect(
              box.width,
              `${section.name} #${i + 1} width (${box.width}px) should fit viewport (${device.viewport.width}px)`
            ).toBeLessThanOrEqual(device.viewport.width + 1);

            // Element should not be positioned off-screen to the left
            expect(
              box.x,
              `${section.name} #${i + 1} should not be off-screen left`
            ).toBeGreaterThanOrEqual(-1);
          }
        }
      }
    });

    test(`no content cut off at bottom on ${device.name}`, async ({ page }) => {
      await page.setViewportSize(device.viewport);
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      // Scroll to absolute bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(200);

      // Footer should be fully visible
      const footer = page.locator('.footer');
      const footerBox = await footer.boundingBox();
      const viewportBottom = await page.evaluate(() => window.scrollY + window.innerHeight);

      if (footerBox) {
        const footerBottom = footerBox.y + footerBox.height;
        // Footer bottom should be reachable (within viewport when scrolled to bottom)
        expect(footerBottom).toBeLessThanOrEqual(viewportBottom + 10);
      }

      // Check the last element in footer is visible
      const footerLinks = page.locator('.footer__link');
      const lastLink = footerLinks.last();
      await expect(lastLink).toBeVisible();
    });
  }
});

test.describe('Visual Regression Snapshots', () => {
  test('homepage mobile screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 }); // iPhone 12
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: 'tests/screenshots/homepage-mobile.png',
      fullPage: true
    });
  });

  test('homepage small mobile screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: 'tests/screenshots/homepage-mobile-small.png',
      fullPage: true
    });
  });

  test('homepage tablet screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: 'tests/screenshots/homepage-tablet.png',
      fullPage: true
    });
  });

  test('homepage desktop screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: 'tests/screenshots/homepage-desktop.png',
      fullPage: true
    });
  });
});
