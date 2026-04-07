import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Feature', () => {

 /* test('Valid Login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('Admin', 'admin123');

    //await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();

  });*/

 
  test('Valid Login', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('Admin', 'admin123')
  //await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

     });
  test('Invalid Login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('Admin', 'wrongpass');

   await expect(page.getByText(/invalid credentials/i)).toBeVisible();
    });

});

