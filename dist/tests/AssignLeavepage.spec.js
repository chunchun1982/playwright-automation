"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const LoginPage_1 = require("../pages/LoginPage");
const AssignLeavepage_1 = require("../pages/AssignLeavepage");
test_1.test.describe('Assign Leave Tests', () => {
    (0, test_1.test)('Assign leave to employee', async ({ page }) => {
        const loginPage = new LoginPage_1.LoginPage(page);
        const assignLeavePage = new AssignLeavepage_1.AssignLeavepage(page);
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
//# sourceMappingURL=AssignLeavepage.spec.js.map