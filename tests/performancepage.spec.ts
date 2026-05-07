import { test, Page } from '@playwright/test';

test('Measure page load time', async ({ page }) => {

    const start = Date.now();

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/performance/viewPerformanceModule');

    const end = Date.now();

    const loadTime = end - start;

    console.log(`Page load time: ${loadTime} ms`);

});