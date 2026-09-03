# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.orangehrm.spec.ts >> Invalid Password >> URL stays at / after submitting wrong password
- Location: tests\login.orangehrm.spec.ts:89:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "https://opensource-demo.orangehrmlive.com/"
Received: "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × locator resolved to <html>…</html>
       - unexpected value "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"

```

```yaml
- img "company-branding"
- heading "Login" [level=5]
- alert:
  - text: 
  - paragraph: Invalid credentials
- paragraph: "Username : Admin"
- paragraph: "Password : admin123"
- text:  Username
- textbox "Username"
- text:  Password
- textbox "Password"
- button "Login"
- paragraph: Forgot your password?
- link:
  - /url: https://www.linkedin.com/company/orangehrm/mycompany/
- link:
  - /url: https://www.facebook.com/OrangeHRM/
- link:
  - /url: https://twitter.com/orangehrm?lang=en
- link:
  - /url: https://www.youtube.com/c/OrangeHRMInc
- paragraph: OrangeHRM OS 5.9
- paragraph:
  - text: © 2005 - 2026
  - link "OrangeHRM, Inc":
    - /url: http://www.orangehrm.com
  - text: . All rights reserved.
- img "orangehrm-logo"
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { LoginPage } from '../pages/LoginPage';
  3   | import { DashBoardPage } from '../pages/DashBoardPage';
  4   | import { loginScenarios } from './test-data/loginTestData';
  5   | 
  6   | // Pull the valid-credentials entry from the shared data file (first entry, description: 'Valid credentials')
  7   | const validScenario = loginScenarios.find(s => s.expectedResult.outcome === 'success')!;
  8   | 
  9   | test.describe('Successful Login', () => {
  10  |   let loginPage: LoginPage;
  11  |   let dashboardPage: DashBoardPage;
  12  | 
  13  |   test.beforeEach(async ({ page }) => {
  14  |     loginPage = new LoginPage(page);
  15  |     dashboardPage = new DashBoardPage(page);
  16  |     await loginPage.goto();
  17  |     await loginPage.login(validScenario.username, validScenario.password);
  18  |   });
  19  | 
  20  |   // Requirement 1.1 — browser navigates to a URL ending with /dashboard
  21  |   test('navigates to /dashboard after valid credentials are submitted', async ({ page }) => {
  22  |     await expect(page).toHaveURL(/dashboard/);
  23  |   });
  24  | 
  25  |   // Requirement 1.2 — Dashboard heading is visible
  26  |   test('displays the Dashboard heading after successful login', async () => {
  27  |     await expect(dashboardPage.dashboardHeading).toBeVisible();
  28  |   });
  29  | 
  30  |   // Requirement 1.3 — no error alert or validation message is present
  31  |   test('shows no error alert or validation message after successful login', async () => {
  32  |     await expect(loginPage.getAlertMessage()).not.toBeVisible();
  33  |   });
  34  | });
  35  | 
  36  | // ─── Invalid Username (Requirements 2.1, 2.2, 2.3) ──────────────────────────
  37  | const invalidUsernameScenario = loginScenarios.find(s => s.description === 'Invalid username')!;
  38  | 
  39  | test.describe('Invalid Username', () => {
  40  |   let loginPage: LoginPage;
  41  |   let dashboardPage: DashBoardPage;
  42  | 
  43  |   test.beforeEach(async ({ page }) => {
  44  |     loginPage = new LoginPage(page);
  45  |     dashboardPage = new DashBoardPage(page);
  46  |     await loginPage.goto();
  47  |     await loginPage.login(invalidUsernameScenario.username, invalidUsernameScenario.password);
  48  |   });
  49  | 
  50  |   // Requirement 2.1 — alert shows "Invalid credentials"
  51  |   test('shows "Invalid credentials" alert for an invalid username', async () => {
  52  |     await expect(loginPage.getAlertMessage()).toContainText('Invalid credentials');
  53  |   });
  54  | 
  55  |   // Requirement 2.2 — browser URL stays at /
  56  |   test('URL stays at "/" after submitting an invalid username', async ({ page }) => {
  57  |     await expect(page).toHaveURL('/');
  58  |   });
  59  | 
  60  |   // Requirement 2.3 — username field retains its value; password field is cleared
  61  |   test('username field retains value and password field is empty after failed login', async () => {
  62  |     await expect(loginPage.username).toHaveValue(invalidUsernameScenario.username);
  63  |     await expect(loginPage.password).toHaveValue('');
  64  |   });
  65  | });
  66  | 
  67  | // ─── Invalid Password (Req 3) ────────────────────────────────────────────────
  68  | 
  69  | test.describe('Invalid Password', () => {
  70  |   let loginPage: LoginPage;
  71  |   let dashboardPage: DashBoardPage;
  72  | 
  73  |   const invalidPasswordScenario = loginScenarios.find(s => s.description === 'Invalid password')!;
  74  | 
  75  |   test.beforeEach(async ({ page }) => {
  76  |     loginPage = new LoginPage(page);
  77  |     dashboardPage = new DashBoardPage(page);
  78  |     await loginPage.goto();
  79  |     await loginPage.login(invalidPasswordScenario.username, invalidPasswordScenario.password);
  80  |   });
  81  | 
  82  |   // Requirement 3.1 — "Invalid credentials" alert is visible
  83  |   test('shows "Invalid credentials" alert when password is wrong', async () => {
  84  |     await expect(loginPage.getAlertMessage()).toBeVisible();
  85  |     await expect(loginPage.getAlertMessage()).toContainText('Invalid credentials');
  86  |   });
  87  | 
  88  |   // Requirement 3.2 — URL remains at /
  89  |   test('URL stays at / after submitting wrong password', async ({ page }) => {
> 90  |     await expect(page).toHaveURL('/');
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  91  |   });
  92  | 
  93  |   // Requirement 3.3 — username field retains value; password field is cleared
  94  |   test('username field retains value and password field is cleared after wrong password', async () => {
  95  |     await expect(loginPage.username).toHaveValue(invalidPasswordScenario.username);
  96  |     await expect(loginPage.password).toHaveValue('');
  97  |   });
  98  | });
  99  | 
  100 | // ─── Empty Username (Req 4) ───────────────────────────────────────────────────
  101 | 
  102 | const emptyUsernameScenario = loginScenarios.find(s => s.description === 'Empty username')!;
  103 | 
  104 | test.describe('Empty Username', () => {
  105 |   let loginPage: LoginPage;
  106 | 
  107 |   test.beforeEach(async ({ page }) => {
  108 |     loginPage = new LoginPage(page);
  109 |     await loginPage.goto();
  110 |     await loginPage.login(emptyUsernameScenario.username, emptyUsernameScenario.password);
  111 |   });
  112 | 
  113 |   // Requirement 4.1 — "Required" validation appears beneath the username field
  114 |   test('shows Required validation message beneath the username field', async () => {
  115 |     await expect(loginPage.getValidationMessage('username')).toContainText('Required');
  116 |   });
  117 | 
  118 |   // Requirement 4.2 — URL remains at / (login page)
  119 |   test('stays on the login page when username is empty', async ({ page }) => {
  120 |     await expect(page).toHaveURL('/');
  121 |   });
  122 | });
  123 | 
  124 | // ── Requirement 5 — Empty Password ────────────────────────────────────────────
  125 | const emptyPasswordScenario = loginScenarios.find(s => s.description === 'Empty password')!;
  126 | 
  127 | test.describe('Empty Password', () => {
  128 |   let loginPage: LoginPage;
  129 | 
  130 |   test.beforeEach(async ({ page }) => {
  131 |     loginPage = new LoginPage(page);
  132 |     await loginPage.goto();
  133 |     await loginPage.login(emptyPasswordScenario.username, emptyPasswordScenario.password);
  134 |   });
  135 | 
  136 |   // Requirement 5.1 — "Required" validation shown beneath the password field
  137 |   test('shows "Required" validation message beneath the password field', async () => {
  138 |     await expect(loginPage.getValidationMessage('password')).toContainText('Required');
  139 |   });
  140 | 
  141 |   // Requirement 5.2 — URL stays at /
  142 |   test('URL stays at / after submitting with empty password', async ({ page }) => {
  143 |     await expect(page).toHaveURL('/');
  144 |   });
  145 | 
  146 |   // Requirement 5.3 — username field retains its value
  147 |   test('username field retains its value when only password is empty', async () => {
  148 |     await expect(loginPage.username).toHaveValue(emptyPasswordScenario.username);
  149 |   });
  150 | });
  151 | 
  152 | // ── Requirement 6: Logout ────────────────────────────────────────────────────
  153 | test.describe('Logout', () => {
  154 |   let loginPage: LoginPage;
  155 |   let dashboardPage: DashBoardPage;
  156 | 
  157 |   test.beforeEach(async ({ page }) => {
  158 |     loginPage = new LoginPage(page);
  159 |     dashboardPage = new DashBoardPage(page);
  160 |     await loginPage.goto();
  161 |     await loginPage.login(validScenario.username, validScenario.password);
  162 |     await expect(page).toHaveURL(/dashboard/);
  163 |   });
  164 | 
  165 |   // Requirement 6.1 — logout navigates back to the login page (URL: /)
  166 |   test('logout navigates browser to /', async () => {
  167 |     await dashboardPage.logout();
  168 |     await expect(dashboardPage.page).toHaveURL('/');
  169 |   });
  170 | 
  171 |   // Requirement 6.2 — login form controls are visible after logout
  172 |   test('login form is visible after logout', async () => {
  173 |     await dashboardPage.logout();
  174 |     await expect(loginPage.username).toBeVisible();
  175 |     await expect(loginPage.password).toBeVisible();
  176 |     await expect(loginPage.loginButton).toBeVisible();
  177 |   });
  178 | 
  179 |   // Requirement 6.3 — navigating directly to /dashboard without a session redirects to /
  180 |   test('direct navigation to /dashboard without session redirects to /', async ({ page }) => {
  181 |     await dashboardPage.logout();
  182 |     await page.goto('/web/index.php/dashboard');
  183 |     await expect(page).toHaveURL('/');
  184 |   });
  185 | });
  186 | 
```