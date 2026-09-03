import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashBoardPage } from '../../pages/DashBoardPage';

/**
 * Custom fixture types.
 * Every test that imports `test` from this file receives `loginPage`
 * (constructed and already navigated to the login page) and `dashboardPage`
 * (constructed, ready for post-login interactions).
 */
type LoginFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashBoardPage;
};

export const test = base.extend<LoginFixtures>({
  // Provides a LoginPage instance already navigated to '/'
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  // Provides a DashBoardPage instance ready for use after login
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashBoardPage(page);
    await use(dashboardPage);
  },
});

export { expect } from '@playwright/test';
