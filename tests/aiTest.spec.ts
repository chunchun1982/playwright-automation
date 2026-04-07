import { test, expect } from '@playwright/test';
import OpenAI from "openai";
import 'dotenv/config';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

test('AI assisted login validation', async ({ page }) => {

  // Open OrangeHRM site
  await page.goto('https://opensource-demo.orangehrmlive.com');

  // Login
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  // Wait for dashboard to load
  //await page.waitForURL(/dashboard/);

  // Verify dashboard page
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({timeout:10000});

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