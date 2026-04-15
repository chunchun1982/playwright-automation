"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const LoginPage_1 = require("../pages/LoginPage");
const DashBoardPage_1 = require("../pages/DashBoardPage");
test_1.test.describe('Dashboard Test', () => {
    let loginPage;
    let dashboard;
    test_1.test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage_1.LoginPage(page);
        dashboard = new DashBoardPage_1.DashBoardPage(page);
        await loginPage.goto();
        await loginPage.login('Admin', 'admin123');
        await (0, test_1.expect)(page).toHaveURL(/dashboard/);
    });
    (0, test_1.test)('Verify Dashboard & Click on Assign Leave', async () => {
        await dashboard.verifyDashboardLoaded();
        await dashboard.clickAssignLeave();
    });
});
test_1.test.describe('Login Negative Test', () => {
    (0, test_1.test)('Invalid login shows error', async ({ page }) => {
        const loginPage = new LoginPage_1.LoginPage(page);
        await loginPage.goto();
        await loginPage.login('wrong', 'wrong');
        await (0, test_1.expect)(page.getByText(/invalid credentials/i)).toBeVisible();
    });
});
//# sourceMappingURL=Dashboard.spec.js.map