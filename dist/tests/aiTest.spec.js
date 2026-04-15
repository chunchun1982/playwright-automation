"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const openai_1 = __importDefault(require("openai"));
require("dotenv/config");
const client = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY
});
(0, test_1.test)('AI assisted login validation', async ({ page }) => {
    // Open OrangeHRM site
    await page.goto('https://opensource-demo.orangehrmlive.com');
    // Login
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    // Wait for dashboard to load
    //await page.waitForURL(/dashboard/);
    // Verify dashboard page
    await (0, test_1.expect)(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 });
    // Get page title
    const title = await page.title();
    console.log("Page Title:", title);
    // Send title to OpenAI
    const response = await client.responses.create({
        model: "gpt-4.1-mini",
        input: `Check if this page title belongs to OrangeHRM website: ${title}`
    });
    console.log("AI Response:");
    console.log(response.output_text);
});
//# sourceMappingURL=aiTest.spec.js.map