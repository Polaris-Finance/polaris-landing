import { test, expect } from '@playwright/test';

const mobileWidths = [320, 360, 375, 390, 414, 540];

test.describe('Navbar mobile layout', () => {
  for (const width of mobileWidths) {
    test(`should not have overlap at ${width}px width`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');

      // Wait for navbar to be visible
      await page.waitForSelector('.top-nav');

      // Get bounding boxes
      const logo = await page.locator('.top-nav__brand').boundingBox();
      const links = await page.locator('.top-nav__links').boundingBox();
      const cta = await page.locator('.top-nav__cta').boundingBox();

      // Log dimensions for debugging
      console.log(`\n=== Viewport: ${width}px ===`);
      console.log(`Logo: x=${logo?.x.toFixed(1)}, width=${logo?.width.toFixed(1)}, right=${logo ? (logo.x + logo.width).toFixed(1) : 'N/A'}`);
      console.log(`Links: x=${links?.x.toFixed(1)}, width=${links?.width.toFixed(1)}, right=${links ? (links.x + links.width).toFixed(1) : 'N/A'}`);
      console.log(`CTA: x=${cta?.x.toFixed(1)}, width=${cta?.width.toFixed(1)}, right=${cta ? (cta.x + cta.width).toFixed(1) : 'N/A'}`);

      if (logo && links) {
        const logoLinksGap = links.x - (logo.x + logo.width);
        console.log(`Gap (Logo-Links): ${logoLinksGap.toFixed(1)}px ${logoLinksGap < 0 ? '⚠️ OVERLAP!' : '✓'}`);

        // Check logo doesn't overlap with links
        expect(logo.x + logo.width, `Logo overlaps links at ${width}px`).toBeLessThanOrEqual(links.x + 2); // 2px tolerance
      }

      if (links && cta) {
        const linksCtaGap = cta.x - (links.x + links.width);
        console.log(`Gap (Links-CTA): ${linksCtaGap.toFixed(1)}px ${linksCtaGap < 0 ? '⚠️ OVERLAP!' : '✓'}`);

        // Check links don't overlap with CTA
        expect(links.x + links.width, `Links overlap CTA at ${width}px`).toBeLessThanOrEqual(cta.x + 2); // 2px tolerance
      }

      // Screenshot for visual review
      await page.screenshot({
        path: `tests/screenshots/navbar-${width}px.png`,
        clip: { x: 0, y: 0, width, height: 100 }
      });
    });
  }

  test('detailed element width analysis', async ({ page }) => {
    const results: Array<{
      width: number;
      navWidth: number;
      logoWidth: number;
      linksWidth: number;
      ctaWidth: number;
      totalContent: number;
      availableSpace: number;
      overflow: boolean;
    }> = [];

    for (const width of mobileWidths) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');
      await page.waitForSelector('.top-nav');

      const measurements = await page.evaluate(() => {
        const nav = document.querySelector('.top-nav') as HTMLElement;
        const logo = document.querySelector('.top-nav__brand') as HTMLElement;
        const links = document.querySelector('.top-nav__links') as HTMLElement;
        const cta = document.querySelector('.top-nav__cta') as HTMLElement;

        const navStyle = getComputedStyle(nav);
        const paddingLeft = parseFloat(navStyle.paddingLeft) || 0;
        const paddingRight = parseFloat(navStyle.paddingRight) || 0;
        const navPadding = paddingLeft + paddingRight;

        return {
          navWidth: nav?.offsetWidth || 0,
          logoWidth: logo?.offsetWidth || 0,
          linksWidth: links?.offsetWidth || 0,
          ctaWidth: cta?.offsetWidth || 0,
          navPadding,
        };
      });

      const totalContent = measurements.logoWidth + measurements.linksWidth + measurements.ctaWidth;
      const availableSpace = measurements.navWidth - measurements.navPadding;

      results.push({
        width,
        navWidth: measurements.navWidth,
        logoWidth: measurements.logoWidth,
        linksWidth: measurements.linksWidth,
        ctaWidth: measurements.ctaWidth,
        totalContent,
        availableSpace,
        overflow: totalContent > availableSpace,
      });
    }

    console.log('\n=== ELEMENT WIDTH ANALYSIS ===\n');
    console.table(results);

    // Check for any overflow scenarios
    const overflowWidths = results.filter(r => r.overflow);
    if (overflowWidths.length > 0) {
      console.log('\n⚠️ OVERFLOW DETECTED at these widths:');
      overflowWidths.forEach(r => {
        console.log(`  ${r.width}px: content=${r.totalContent}px, available=${r.availableSpace}px, overflow=${r.totalContent - r.availableSpace}px`);
      });
    } else {
      console.log('\n✓ No overflow detected at any tested width');
    }

    // This test documents the state, doesn't fail on overflow
    expect(results.length).toBe(mobileWidths.length);
  });
});
