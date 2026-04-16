import { test, expect } from '@playwright/test';

test.describe('baseline accessibility', () => {
    test('page has a single h1 in main', async ({ page }) => {
        await page.goto('/');
        const h1s = page.locator('main h1');
        const count = await h1s.count();
        expect(count, 'expected exactly one <h1> in <main>').toBe(1);
    });

    test('images below the fold have alt text', async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForLoadState('networkidle');

        const imagesMissingAlt = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('img'))
                .filter((img) => !img.hasAttribute('alt'))
                .map((img) => img.src);
        });
        expect(imagesMissingAlt, imagesMissingAlt.join('\n')).toEqual([]);
    });

    test('document exposes a meaningful title', async ({ page }) => {
        await page.goto('/');
        const title = await page.title();
        expect(title.trim().length).toBeGreaterThan(3);
    });

    test('respects prefers-reduced-motion', async ({ browser }) => {
        const context = await browser.newContext({ reducedMotion: 'reduce' });
        const page = await context.newPage();
        await page.goto('/');
        await expect(page.locator('main')).toBeVisible();
        await context.close();
    });
});
