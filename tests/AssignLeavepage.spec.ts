import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { AssignLeavepage } from "../pages/AssignLeavepage";

test.describe('Assign Leave Tests', () => {
  test('Assign leave to employee', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const assignLeavePage = new AssignLeavepage(page);

    // Navigate to the application
    await loginPage.goto();

    // Login
    await loginPage.login('Admin', 'admin123');
    await page.pause();
    // Navigate to Assign Leave page
    await assignLeavePage.navigateToAssignLeave();
     
    // Assign leave
    await assignLeavePage.assignLeave({
      employeeName: 'Ranga  Akunuri', // Replace with actual employee name
      leaveType: 'CAN - Personal', // Replace with actual leave type
      fromDate: '2026-04-10',
      toDate: '2026-04-12',
      comments: 'Vacation leave'
    });

    // Add assertions if needed, e.g., verify success message
    // await expect(page.locator('.success-message')).toBeVisible();
  });
});