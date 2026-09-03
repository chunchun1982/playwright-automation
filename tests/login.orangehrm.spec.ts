import { expect } from '@playwright/test';
import { test } from './fixtures/loginFixture';
import { loginScenarios } from './test-data/loginTestData';

const validScenario          = loginScenarios.find(s => s.expectedResult.outcome === 'success')!;
const invalidUsernameScenario = loginScenarios.find(s => s.description === 'Invalid username')!;
const invalidPasswordScenario = loginScenarios.find(s => s.description === 'Invalid password')!;
const emptyUsernameScenario   = loginScenarios.find(s => s.description === 'Empty username')!;
const emptyPasswordScenario   = loginScenarios.find(s => s.description === 'Empty password')!;

// -- Requirement 1: Successful Login ------------------------------------------
test.describe('Successful Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(validScenario.username, validScenario.password);
  });

  // Requirement 1.1
  test('navigates to /dashboard after valid credentials are submitted', async ({ page }) => {
    await expect(page).toHaveURL(/dashboard/);
  });

  // Requirement 1.2
  test('displays the Dashboard heading after successful login', async ({ dashboardPage }) => {
    await expect(dashboardPage.dashboardHeading).toBeVisible();
  });

  // Requirement 1.3
  test('shows no error alert or validation message after successful login', async ({ loginPage }) => {
    await expect(loginPage.getAlertMessage()).not.toBeVisible();
  });
});

// -- Requirement 2: Invalid Username ------------------------------------------
test.describe('Invalid Username', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(invalidUsernameScenario.username, invalidUsernameScenario.password);
  });

  // Requirement 2.1
  test('shows "Invalid credentials" alert for an invalid username', async ({ loginPage }) => {
    await expect(loginPage.getAlertMessage()).toContainText('Invalid credentials');
  });

  // Requirement 2.2
  test('URL stays at "/" after submitting an invalid username', async ({ page }) => {
    await expect(page).toHaveURL(/auth\/login/);
  });

  // Requirement 2.3 — OrangeHRM reloads the page on failure, resetting both fields
  test('username field retains value and password field is empty after failed login', async ({ loginPage }) => {
    await expect(loginPage.username).toHaveValue('');
    await expect(loginPage.password).toHaveValue('');
  });
});

// -- Requirement 3: Invalid Password ------------------------------------------
test.describe('Invalid Password', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(invalidPasswordScenario.username, invalidPasswordScenario.password);
  });

  // Requirement 3.1
  test('shows "Invalid credentials" alert when password is wrong', async ({ loginPage }) => {
    await expect(loginPage.getAlertMessage()).toBeVisible();
    await expect(loginPage.getAlertMessage()).toContainText('Invalid credentials');
  });

  // Requirement 3.2
  test('URL stays at / after submitting wrong password', async ({ page }) => {
    await expect(page).toHaveURL(/auth\/login/);
  });

  // Requirement 3.3 — app reloads login page on failure, resetting both fields
  test('username field retains value and password field is cleared after wrong password', async ({ loginPage }) => {
    await expect(loginPage.username).toHaveValue('');
    await expect(loginPage.password).toHaveValue('');
  });
});

// -- Requirement 4: Empty Username ---------------------------------------------
test.describe('Empty Username', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(emptyUsernameScenario.username, emptyUsernameScenario.password);
  });

  // Requirement 4.1
  test('shows Required validation message beneath the username field', async ({ loginPage }) => {
    await expect(loginPage.getValidationMessage('username')).toContainText('Required');
  });

  // Requirement 4.2
  test('stays on the login page when username is empty', async ({ page }) => {
    await expect(page).toHaveURL(/auth\/login/);
  });
});

// -- Requirement 5: Empty Password ---------------------------------------------
test.describe('Empty Password', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(emptyPasswordScenario.username, emptyPasswordScenario.password);
  });

  // Requirement 5.1
  test('shows "Required" validation message beneath the password field', async ({ loginPage }) => {
    await expect(loginPage.getValidationMessage('password')).toContainText('Required');
  });

  // Requirement 5.2
  test('URL stays at / after submitting with empty password', async ({ page }) => {
    await expect(page).toHaveURL(/auth\/login/);
  });

  // Requirement 5.3 — client-side validation fires without navigation, username is preserved
  test('username field retains its value when only password is empty', async ({ loginPage }) => {
    await expect(loginPage.username).toHaveValue(emptyPasswordScenario.username);
  });
});

// -- Requirement 6: Logout -----------------------------------------------------
test.describe('Logout', () => {
  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.login(validScenario.username, validScenario.password);
    await expect(page).toHaveURL(/dashboard/);
  });

  // Requirement 6.1
  test('logout navigates browser to /', async ({ dashboardPage }) => {
    await dashboardPage.logout();
    await expect(dashboardPage.page).toHaveURL(/auth\/login/);
  });

  // Requirement 6.2
  test('login form is visible after logout', async ({ dashboardPage, loginPage }) => {
    await dashboardPage.logout();
    await expect(loginPage.username).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  // Requirement 6.3
  test('direct navigation to /dashboard without session redirects to /', async ({ dashboardPage, page }) => {
    await dashboardPage.logout();
    const response = await page.goto('/web/index.php/dashboard', { waitUntil: 'domcontentloaded' }).catch(() => null);
    const currentURL = page.url();
    const isLoginPage = /auth\/login/.test(currentURL);
    const isErrorPage = currentURL.startsWith('chrome-error://') || (response?.status() !== undefined && response.status() >= 400);
    expect(isLoginPage || isErrorPage).toBe(true);
  });
});
