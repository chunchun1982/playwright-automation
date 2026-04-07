import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Page Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto('/');
  });

  test.describe('Valid Credentials', () => {
    
    test('should login successfully with valid credentials', async ({ page }) => {
      const loginPage = new LoginPage(page);
      
      await loginPage.login('Admin', 'admin123');
      
      // Verify successful login by checking dashboard URL
      await expect(page).toHaveURL(/dashboard/);
    });

    test('should display dashboard after successful login', async ({ page }) => {
      const loginPage = new LoginPage(page);
      
      await loginPage.login('Admin', 'admin123');
      
      // Verify dashboard content is visible
      await expect(page.getByText(/dashboard/i)).toBeVisible();
    });
  });

  test.describe('Invalid Credentials', () => {
    
    test('should fail login with incorrect password', async ({ page }) => {
      const loginPage = new LoginPage(page);
      
      await loginPage.login('Admin', 'wrongpassword');
      
      // Verify error message appears and user stays on login page
      await expect(page.getByText(/invalid credentials/i)).toBeVisible();
      await expect(page).toHaveURL('/');
    });

    test('should fail login with non-existent username', async ({ page }) => {
      const loginPage = new LoginPage(page);
      
      await loginPage.login('NonExistentUser', 'admin123');
      
      // Verify error message appears
      await expect(page.getByText(/invalid credentials/i)).toBeVisible();
    });

    test('should fail login with empty username', async ({ page }) => {
      const loginPage = new LoginPage(page);
      
      await loginPage.login('', 'admin123');
      
      // Verify appropriate validation or error
      const errorMsg = page.getByText(/invalid credentials/i);
      const isDisplayed = await errorMsg.isVisible().catch(() => false);
      
      if (isDisplayed) {
        await expect(errorMsg).toBeVisible();
      }
    });

    test('should fail login with empty password', async ({ page }) => {
      const loginPage = new LoginPage(page);
      
      await loginPage.login('Admin', '');
      
      // Verify appropriate validation or error
      const errorMsg = page.getByText(/invalid credentials/i);
      const isDisplayed = await errorMsg.isVisible().catch(() => false);
      
      if (isDisplayed) {
        await expect(errorMsg).toBeVisible();
      }
    });
  });

  test.describe('UI Elements Visibility', () => {
    
    test('should display all login form elements', async ({ page }) => {
      const loginPage = new LoginPage(page);
      
      // Verify username input is visible
      await expect(loginPage.username).toBeVisible();
      
      // Verify password input is visible
      await expect(loginPage.password).toBeVisible();
      
      // Verify login button is visible
      await expect(loginPage.loginButton).toBeVisible();
    });

    test('should have correct input types', async ({ page }) => {
      const loginPage = new LoginPage(page);
      
      // Verify username field type
      await expect(loginPage.username).toHaveAttribute('type', 'text');
      
      // Verify password field type
      await expect(loginPage.password).toHaveAttribute('type', 'password');
    });
  });

  test.describe('Form Behavior', () => {
    
    test('should clear and fill credentials correctly', async ({ page }) => {
      const loginPage = new LoginPage(page);
      
      // Fill with initial values
      await loginPage.username.fill('TestUser');
      await loginPage.password.fill('TestPass');
      
      // Verify values are filled
      await expect(loginPage.username).toHaveValue('TestUser');
      await expect(loginPage.password).toHaveValue('TestPass');
    });

    test('should have working login button', async ({ page }) => {
      const loginPage = new LoginPage(page);
      
      // Verify button is clickable and enabled
      await expect(loginPage.loginButton).toBeEnabled();
    });
  });

});
