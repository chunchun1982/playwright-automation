# Implementation Plan: OrangeHRM Login Automation

## Overview

Implement the full OrangeHRM login/logout automation suite in TypeScript using Playwright and the Page Object Model pattern. The plan enhances two existing POM classes, creates a typed test data file, and adds a comprehensive spec file covering all 11 requirements. No changes are required to `playwright.config.ts`, `BasePage.ts`, or any existing spec files.

## Tasks

- [x] 1. Create typed test data file
  - [x] 1.1 Create `tests/test-data/loginTestData.ts` with interfaces and scenario array
    - Define `ExpectedResult` interface: `{ outcome: 'success' | 'failure'; expectedMessage: string }`
    - Define `LoginScenario` interface: `{ description: string; username: string; password: string; expectedResult: ExpectedResult }`
    - Export `loginScenarios` array with exactly 5 entries: valid credentials, invalid username, invalid password, empty username, empty password
    - _Requirements: 10.1, 10.2, 10.3_

- [x] 2. Enhance `LoginPage`
  - [x] 2.1 Update `pages/LoginPage.ts` to extend `BasePage` and add new locator methods
    - Add `import { BasePage } from './BasePage'` and change class to `extends BasePage`
    - Replace `this.page = page` constructor assignment with `super(page)`
    - Keep existing `username`, `password`, `loginButton` locators (already use `getByRole`)
    - Update `login()` to use `Promise.all([this.page.waitForLoadState('networkidle'), this.loginButton.click()])` — remove explicit field clears or keep clear-then-fill pattern; no `waitForTimeout`
    - Add `getAlertMessage(): Locator` returning `this.page.getByRole('alert')`
    - Add `getValidationMessage(field: 'username' | 'password'): Locator` that anchors to the field's `div[class*="oxd-form-row"]` ancestor then targets `.oxd-text--span`
    - Add `getErrorMessage(): Locator` as an alias returning `this.getAlertMessage()`
    - Remove the old inline `get errorMessage()` getter
    - _Requirements: 9.1, 9.2_

- [x] 3. Enhance `DashBoardPage`
  - [x] 3.1 Update `pages/DashBoardPage.ts` to extend `BasePage` and add `logout()` method
    - Add `import { BasePage } from './BasePage'` and change class to `extends BasePage`
    - Replace `this.page = page` constructor assignment with `super(page)`
    - Keep existing `dashboardHeading`, `quickLaunchCard` locators and `verifyDashboardLoaded()`, `clickAssignLeave()` methods unchanged
    - Add `logout(): Promise<void>` that clicks `this.page.getByRole('banner').getByRole('img', { name: /user profile/i })`, then clicks `this.page.getByRole('menuitem', { name: /logout/i })`, then asserts `await expect(this.page).toHaveURL('/')`
    - _Requirements: 6.1, 6.2, 9.3_

- [x] 4. Checkpoint — verify compilation
  - Run `npx tsc --noEmit` from the project root to confirm zero TypeScript errors before writing the spec.

- [x] 5. Create comprehensive spec file
  - [x] 5.1 Create `tests/login.orangehrm.spec.ts` — Successful Login describe block (Req 1)
    - Import `LoginPage`, `DashBoardPage` from POM; import `loginScenarios` from test data file
    - `beforeEach`: navigate to `/`, instantiate `loginPage` and `dashboardPage`
    - test: submitting valid credentials navigates browser to URL matching `/dashboard` — assert `toHaveURL(/dashboard/)`
    - test: Dashboard heading is visible after login — use `dashboardPage.dashboardHeading`
    - test: no error alert or validation message visible after successful login — assert `loginPage.getAlertMessage()` not visible
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 5.2 Add Invalid Username describe block (Req 2)
    - `beforeEach`: navigate to `/`, instantiate POM objects
    - test: alert shows "Invalid credentials" — use `loginPage.getAlertMessage()`, assert `toContainText('Invalid credentials')`
    - test: URL stays at `/` after invalid username — assert `toHaveURL('/')`
    - test: username field retains value and password field is empty — use `loginPage.username` and `loginPage.password`
    - Credentials sourced from `loginScenarios` array entry for invalid username — no inline strings
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 5.3 Add Invalid Password describe block (Req 3)
    - `beforeEach`: navigate to `/`, instantiate POM objects
    - test: visible alert with "Invalid credentials" text — use `loginPage.getAlertMessage()`
    - test: URL stays at `/`
    - test: username retained, password cleared
    - Credentials from `loginScenarios` invalid-password entry
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 5.4 Add Empty Username describe block (Req 4)
    - `beforeEach`: navigate to `/`, instantiate POM objects
    - test: "Required" validation shown beneath username field — use `loginPage.getValidationMessage('username')`, assert `toContainText('Required')`
    - test: URL stays at `/`
    - Credentials from `loginScenarios` empty-username entry
    - _Requirements: 4.1, 4.2_

  - [x] 5.5 Add Empty Password describe block (Req 5)
    - `beforeEach`: navigate to `/`, instantiate POM objects
    - test: "Required" validation shown beneath password field — use `loginPage.getValidationMessage('password')`
    - test: URL stays at `/`
    - test: username field retains its value when only password is empty
    - Credentials from `loginScenarios` empty-password entry
    - _Requirements: 5.1, 5.2, 5.3_

  - [x] 5.6 Add Logout describe block (Req 6)
    - `beforeEach`: navigate to `/`, instantiate POM objects, call `loginPage.login(validUser, validPass)` using valid entry from `loginScenarios`, assert `toHaveURL(/dashboard/)` before each test
    - test: `dashboardPage.logout()` navigates browser to `/`
    - test: after logout, `loginPage.username`, `loginPage.password`, and `loginPage.loginButton` are all visible
    - test: direct navigation to `/dashboard` without session redirects to `/` — use a fresh `page.goto('/web/index.php/dashboard')` and assert `toHaveURL('/')`
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ]* 5.7 Write property-based structural check for POM encapsulation (Property 2)
    - **Property 2: POM Encapsulation Invariant**
    - Statically verify (grep/regex test or TypeScript AST check) that `login.orangehrm.spec.ts` contains no direct calls to `page.locator(`, `page.$(`  , `page.getByRole(`, `page.getByLabel(`, `page.getByPlaceholder(`
    - Can be implemented as a Node.js test using `fs.readFileSync` + regex assertion run under Playwright's test runner
    - **Validates: Requirements 9.1, 9.4**

  - [ ]* 5.8 Write property-based structural check for credential non-duplication (Property 4)
    - **Property 4: Credential Non-Duplication**
    - Statically verify that `login.orangehrm.spec.ts` contains no hard-coded credential strings (`'Admin'`, `'admin123'`, `'wrongpassword'`, `'NonExistentUser'`) inline
    - Implement as a regex test similar to 5.7
    - **Validates: Requirements 10.2, 10.3**

- [x] 6. Final checkpoint — run spec and confirm all tests pass
  - Run `npx playwright test tests/login.orangehrm.spec.ts --project=chromium` to execute all tests against the live OrangeHRM demo site
  - If `logout()` fails due to missing accessible name on the profile image, update `DashBoardPage.logout()` to use the fallback locator `this.page.getByRole('banner').locator('li.oxd-userdropdown')` and re-run
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation before the next dependent step
- The design has a Correctness Properties section, so property-based structural checks (5.7, 5.8) are included; they verify suite-level invariants rather than pure-function properties
- `playwright.config.ts` is intentionally untouched — screenshots, Allure reporting, and trace are already correctly configured
- Run commands manually in your terminal; do not use watch mode

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1", "3.1"] },
    { "id": 2, "tasks": ["5.1"] },
    { "id": 3, "tasks": ["5.2", "5.3", "5.4", "5.5", "5.6"] },
    { "id": 4, "tasks": ["5.7", "5.8"] }
  ]
}
```
