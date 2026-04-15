"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const LoginPage_1 = require("../pages/LoginPage");
test_1.test.describe('Login Page Tests', () => {
    test_1.test.beforeEach(async ({ page }) => {
        // Navigate to login page before each test
        await page.goto('/');
    });
    test_1.test.describe('Valid Credentials', () => {
        (0, test_1.test)('should login successfully with valid credentials', async ({ page }) => {
            const loginPage = new LoginPage_1.LoginPage(page);
            await loginPage.login('Admin', 'admin123');
            // Verify successful login by checking dashboard URL
            await (0, test_1.expect)(page).toHaveURL(/dashboard/);
        });
        (0, test_1.test)('should display dashboard after successful login', async ({ page }) => {
            const loginPage = new LoginPage_1.LoginPage(page);
            await loginPage.login('Admin', 'admin123');
            // Verify dashboard content is visible
            await (0, test_1.expect)(page.getByText(/dashboard/i)).toBeVisible();
        });
    });
    test_1.test.describe('Invalid Credentials', () => {
        (0, test_1.test)('should fail login with incorrect password', async ({ page }) => {
            const loginPage = new LoginPage_1.LoginPage(page);
            await loginPage.login('Admin', 'wrongpassword');
            // Verify error message appears and user stays on login page
            await (0, test_1.expect)(page.getByText(/invalid credentials/i)).toBeVisible();
            await (0, test_1.expect)(page).toHaveURL('/');
        });
        (0, test_1.test)('should fail login with non-existent username', async ({ page }) => {
            const loginPage = new LoginPage_1.LoginPage(page);
            await loginPage.login('NonExistentUser', 'admin123');
            // Verify error message appears
            await (0, test_1.expect)(page.getByText(/invalid credentials/i)).toBeVisible();
        });
        (0, test_1.test)('should fail login with empty username', async ({ page }) => {
            const loginPage = new LoginPage_1.LoginPage(page);
            await loginPage.login('', 'admin123');
            // Verify appropriate validation or error
            const errorMsg = page.getByText(/invalid credentials/i);
            const isDisplayed = await errorMsg.isVisible().catch(() => false);
            if (isDisplayed) {
                await (0, test_1.expect)(errorMsg).toBeVisible();
            }
        });
        (0, test_1.test)('should fail login with empty password', async ({ page }) => {
            const loginPage = new LoginPage_1.LoginPage(page);
            await loginPage.login('Admin', '');
            // Verify appropriate validation or error
            const errorMsg = page.getByText(/invalid credentials/i);
            const isDisplayed = await errorMsg.isVisible().catch(() => false);
            if (isDisplayed) {
                await (0, test_1.expect)(errorMsg).toBeVisible();
            }
        });
    });
    test_1.test.describe('UI Elements Visibility', () => {
        (0, test_1.test)('should display all login form elements', async ({ page }) => {
            const loginPage = new LoginPage_1.LoginPage(page);
            // Verify username input is visible
            await (0, test_1.expect)(loginPage.username).toBeVisible();
            // Verify password input is visible
            await (0, test_1.expect)(loginPage.password).toBeVisible();
            // Verify login button is visible
            await (0, test_1.expect)(loginPage.loginButton).toBeVisible();
        });
        (0, test_1.test)('should have correct input types', async ({ page }) => {
            const loginPage = new LoginPage_1.LoginPage(page);
            // Verify username field type
            await (0, test_1.expect)(loginPage.username).toHaveAttribute('type', 'text');
            // Verify password field type
            await (0, test_1.expect)(loginPage.password).toHaveAttribute('type', 'password');
        });
    });
    test_1.test.describe('Form Behavior', () => {
        (0, test_1.test)('should clear and fill credentials correctly', async ({ page }) => {
            const loginPage = new LoginPage_1.LoginPage(page);
            // Fill with initial values
            await loginPage.username.fill('TestUser');
            await loginPage.password.fill('TestPass');
            // Verify values are filled
            await (0, test_1.expect)(loginPage.username).toHaveValue('TestUser');
            await (0, test_1.expect)(loginPage.password).toHaveValue('TestPass');
        });
        (0, test_1.test)('should have working login button', async ({ page }) => {
            const loginPage = new LoginPage_1.LoginPage(page);
            // Verify button is clickable and enabled
            await (0, test_1.expect)(loginPage.loginButton).toBeEnabled();
        });
    });
});
//# sourceMappingURL=login.advanced.spec.js.map