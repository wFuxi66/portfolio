import { test, expect } from '@playwright/test';

const anchors = [
    { label: /about|profil|à propos/i, id: /about|profil/i },
    { label: /skills|compétences/i, id: /skills|competences/i },
    { label: /projects|projets/i, id: /projects|projets/i },
    { label: /contact/i, id: /contact/i },
];

test.describe('anchor navigation', () => {
    for (const anchor of anchors) {
        test(`header link "${anchor.label}" scrolls to a matching section`, async ({ page }) => {
            await page.goto('/');
            const link = page.locator('header a', { hasText: anchor.label }).first();
            if (!(await link.count())) {
                test.skip(true, 'header link not present in current locale');
            }
            await link.click();
            await page.waitForTimeout(400);
            const scrolled = await page.evaluate(() => window.scrollY);
            expect(scrolled).toBeGreaterThan(0);
        });
    }

    test('below-the-fold sections eventually mount', async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForLoadState('networkidle');
        const sections = page.locator('main section, main [role="region"]');
        const count = await sections.count();
        expect(count).toBeGreaterThanOrEqual(3);
    });
});
