"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const LoginPage_1 = require("../pages/LoginPage");
const loginData = [
    {
        username: 'Admin',
        password: 'admin123',
        expectedResult: 'success'
    },
    {
        username: 'Admin',
        password: 'wrongpass',
        expectedResult: 'failure'
    },
    {
        username: 'WrongUser',
        password: 'admin123',
        expectedResult: 'failure'
    }
];
for (const data of loginData) {
    (0, test_1.test)(`Login test for ${data.username} - ${data.expectedResult}`, async ({ page }) => {
        const loginPage = new LoginPage_1.LoginPage(page);
        await loginPage.goto();
        await loginPage.login(data.username, data.password);
        if (data.expectedResult === 'success') {
            await (0, test_1.expect)(page).toHaveURL(/dashboard/);
        }
        else {
            await (0, test_1.expect)(page.getByText(/invalid credentials/i)).toBeVisible();
        }
    });
}
// Without data array code
/*test('User should login successfully', async ({ page }) => {
  
  const loginPage1 = new LoginPage(page);

  await loginPage1.goto();
  
   
   await loginPage1.login('Admin', 'admin123');
   test.setTimeout(60000);
   await expect(page).toHaveURL(/dashboard/);

});
test('Invalid login test', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('Admin', 'wrongpass');

  await expect(page.getByText(/invalid credentials/i)).toBeVisible();
});*/
//# sourceMappingURL=login.spec.js.map