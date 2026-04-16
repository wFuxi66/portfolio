import { test, expect } from '@playwright/test';

test.describe('landing page smoke', () => {
    test('root renders without a blocking error', async ({ page }) => {
        const consoleErrors = [];
        page.on('pageerror', (err) => consoleErrors.push(err.message));
        page.on('console', (msg) => {
            if (msg.type() === 'error') consoleErrors.push(msg.text());
        });

        await page.goto('/');
        await expect(page).toHaveTitle(/Jimmy|Zheng|Portfolio/i);

        const main = page.locator('main');
        await expect(main).toBeVisible();

        const criticalErrors = consoleErrors.filter(
            (line) => !/favicon|source map|Failed to load resource/i.test(line)
        );
        expect(criticalErrors, criticalErrors.join('\n')).toEqual([]);
    });

    test('hero headline is present', async ({ page }) => {
        await page.goto('/');
        const hero = page.locator('main h1, main [role="heading"][aria-level="1"]').first();
        await expect(hero).toBeVisible();
    });

    test('footer links are interactive', async ({ page }) => {
        await page.goto('/');
        const linkedin = page.locator('footer a', { hasText: /linkedin/i }).first();
        await expect(linkedin).toHaveAttribute('href', /linkedin\.com/);
        await expect(linkedin).toHaveAttribute('target', '_blank');
    });
});
