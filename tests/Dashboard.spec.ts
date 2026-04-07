import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashBoardPage } from '../pages/DashBoardPage';

test.describe('Dashboard Test', () => {

  let loginPage: LoginPage;
  let dashboard: DashBoardPage;

  test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    dashboard = new DashBoardPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    await expect(page).toHaveURL(/dashboard/);
  });

  test('Verify Dashboard & Click on Assign Leave', async () => {

    await dashboard.verifyDashboardLoaded();
    await dashboard.clickAssignLeave();

  });
  
  });
test.describe('Login Negative Test', () => {
  test('Invalid login shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wrong', 'wrong');
    await expect(page.getByText(/invalid credentials/i)).toBeVisible();
  });

});
