"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const LoginPage_1 = require("../pages/LoginPage");
test_1.test.describe('Login Feature', () => {
    /* test('Valid Login', async ({ page }) => {
       const login = new LoginPage(page);
       await login.goto();
       await login.login('Admin', 'admin123');
   
       //await expect(page).toHaveURL(/dashboard/);
       await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
   
     });*/
    (0, test_1.test)('Valid Login', async ({ page }) => {
        const login = new LoginPage_1.LoginPage(page);
        await login.goto();
        await login.login('Admin', 'admin123');
        //await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
        await (0, test_1.expect)(page).toHaveURL(/dashboard/);
        await (0, test_1.expect)(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    });
    (0, test_1.test)('Invalid Login', async ({ page }) => {
        const login = new LoginPage_1.LoginPage(page);
        await login.goto();
        await login.login('Admin', 'wrongpass');
        await (0, test_1.expect)(page.getByText(/invalid credentials/i)).toBeVisible();
    });
});
//# sourceMappingURL=HooksLoginDashbord.spec.js.map