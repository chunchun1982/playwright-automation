import { test, expect } from '@playwright/test';

// Independent test data (no shared state)
const users = [
  { username: 'Admin', password: 'admin123' },
  { username: 'user2', password: 'pass2' },
  { username: 'user3', password: 'pass3' }
];

// Run tests in parallel
test.describe('Parallel Login Tests', () => {
     test.describe.configure({ mode: 'parallel' });

  users.forEach((user, index) => {

    test(`Login Test for ${user.username}`, async ({ page }) => {

      // Each test gets its own browser context automatically
      await page.goto('https://opensource-demo.orangehrmlive.com');

      // Fill credentials
      await page.getByRole('textbox', { name: /username/i }).fill(user.username);
      await page.getByRole('textbox', { name: /password/i }).fill(user.password);

      // Click login
      await page.getByRole('button', { name: /login/i }).click();

      // Assertion (example)
      await expect(page).toHaveURL(/dashboard|home/);

      // Optional: Validate unique session (no collision)
      console.log(`Logged in with: ${user.username}`);
      console.log(`Running in worker: ${test.info().workerIndex}`);
    });

  });

});