# Requirements Document

## Introduction

This document defines the requirements for automating and validating the login functionality of the OrangeHRM application at `https://opensource-demo.orangehrmlive.com`. The automation suite is built with Playwright and TypeScript using the Page Object Model (POM) pattern. It covers successful login, failed login scenarios, field-level validations, logout, screenshot capture on failure, reporting, and test maintainability.

---

## Glossary

- **LoginPage**: The Page Object class that encapsulates all locators and actions for the OrangeHRM login screen.
- **DashboardPage**: The Page Object class that encapsulates all locators and actions for the OrangeHRM dashboard screen shown after successful login.
- **Test_Suite**: The collection of Playwright spec files that exercise the login and logout functionality.
- **Test_Data_File**: A TypeScript file located in `tests/test-data/` that exports test credentials and expected outcomes, keeping data separate from test logic.
- **Reporter**: The Allure and list reporters configured in `playwright.config.ts` that produce test execution reports.
- **Valid_Credentials**: A username and password combination that the OrangeHRM application accepts and results in a successful login (e.g., `Admin` / `admin123`).
- **Invalid_Credentials**: Any username or password combination that the OrangeHRM application rejects.
- **POM**: Page Object Model — a design pattern where each application page is represented by a dedicated TypeScript class.

---

## Requirements

### Requirement 1: Successful Login

**User Story:** As a test engineer, I want to verify that a user can log in with valid credentials, so that I can confirm the core authentication flow works correctly.

#### Acceptance Criteria

1. WHEN the LoginPage is loaded and credentials with a registered username and its correct corresponding password are submitted, THE LoginPage SHALL navigate the browser to a URL ending with `/dashboard`.
2. WHEN the LoginPage is loaded and credentials with a registered username and its correct corresponding password are submitted, THE DashboardPage SHALL display an h1 heading with the text `Dashboard`.
3. IF login completes without an authentication error, THEN THE DashboardPage SHALL not display any error alert element or field-level validation message element.

---

### Requirement 2: Login Failure with Invalid Username

**User Story:** As a test engineer, I want to verify that login fails when an invalid username is provided, so that I can confirm the application rejects unauthorised access.

#### Acceptance Criteria

1. WHEN a username that does not match any registered account and any non-empty password are submitted on the LoginPage, THE LoginPage SHALL display an alert message containing the exact text `Invalid credentials`.
2. WHEN a username that does not match any registered account and any non-empty password are submitted on the LoginPage, THE LoginPage SHALL keep the browser URL at the root path `/`.
3. WHEN a username that does not match any registered account is submitted, THE LoginPage SHALL retain the submitted username value in the username field and clear the password field.

---

### Requirement 3: Login Failure with Invalid Password

**User Story:** As a test engineer, I want to verify that login fails when an invalid password is provided, so that I can confirm the application enforces password validation.

#### Acceptance Criteria

1. WHEN a recognised username and an incorrect password are submitted on the LoginPage, THE LoginPage SHALL display a visible on-page error element containing the exact text `Invalid credentials`.
2. WHEN a recognised username and an incorrect password are submitted on the LoginPage, THE LoginPage SHALL keep the browser URL at the root path `/`.
3. WHEN a recognised username and an incorrect password are submitted, THE LoginPage SHALL retain the submitted username value in the username field and clear the password field.

---

### Requirement 4: Validation when Username is Empty

**User Story:** As a test engineer, I want to verify the application's behaviour when the username field is left empty, so that I can confirm field-level validation is enforced.

#### Acceptance Criteria

1. WHEN the username field is empty, the password field contains any value, and the Login button is clicked on the LoginPage, THE LoginPage SHALL display a validation message with the text `Required` beneath the username field.
2. WHEN the username field is empty, the password field contains any value, and the Login button is clicked on the LoginPage, THE LoginPage SHALL keep the browser URL at the root path `/`.

---

### Requirement 5: Validation when Password is Empty

**User Story:** As a test engineer, I want to verify the application's behaviour when the password field is left empty, so that I can confirm field-level validation is enforced.

#### Acceptance Criteria

1. WHEN the password field is empty, the username field contains a valid value, and the Login button is clicked on the LoginPage, THE LoginPage SHALL display a validation message with the text `Required` beneath the password field.
2. WHEN the password field is empty, the username field contains a valid value, and the Login button is clicked on the LoginPage, THE LoginPage SHALL keep the browser URL at the root path `/`.
3. WHEN the password field is empty and the Login button is clicked on the LoginPage, THE LoginPage SHALL retain the value entered in the username field without clearing it.

---

### Requirement 6: Logout

**User Story:** As a test engineer, I want to verify that a successfully logged-in user can log out, so that I can confirm the session termination flow works correctly.

#### Acceptance Criteria

1. WHILE a user is authenticated and on the DashboardPage, WHEN the user selects Logout from the user profile menu, THE DashboardPage SHALL navigate the browser to the root path `/`.
2. WHEN the browser navigates to the root path `/` following a logout, THE LoginPage SHALL display the username input field, the password input field, and the Login button.
3. IF an unauthenticated user attempts to navigate directly to the DashboardPage URL, THEN THE System SHALL redirect the browser to the root path `/`.

---

### Requirement 7: Automatic Screenshot Capture on Test Failure

**User Story:** As a test engineer, I want screenshots to be captured automatically when a test fails, so that I can diagnose failures without re-running tests.

#### Acceptance Criteria

1. WHEN a test in the Test_Suite fails, THE Test_Suite SHALL capture a PNG screenshot of the browser viewport immediately after the failure is detected and before any teardown or cleanup steps execute.
2. WHEN a screenshot is captured, THE Test_Suite SHALL save the file to the `test-results/` directory, with a filename that includes the test name and a timestamp, creating the directory if it does not already exist.
3. IF the screenshot file cannot be written to the `test-results/` directory, THEN THE Test_Suite SHALL log an error message indicating the failure to save the screenshot and continue executing the remaining tests without interruption.

---

### Requirement 8: Test Reporting

**User Story:** As a test engineer, I want test execution reports to be generated after each run, so that I can review pass/fail status, timings, and failure details.

#### Acceptance Criteria

1. WHEN the Test_Suite completes execution, THE Reporter SHALL generate an Allure report in the `allure-report/` directory containing each test name, its status (passed, failed, or skipped), and its duration.
2. WHEN the Test_Suite completes execution, THE Reporter SHALL output a list-format summary to the console showing the total test count, pass count, fail count, and skipped count.

---

### Requirement 9: Page Object Model Structure

**User Story:** As a test engineer, I want test code to follow the Page Object Model, so that tests are maintainable, readable, and reusable across the suite.

#### Acceptance Criteria

1. THE LoginPage SHALL encapsulate all login-screen locators — username input, password input, and Login button — using only `getByRole`, `getByLabel`, or `getByPlaceholder` locator methods; the class SHALL NOT use `page.locator()`, `page.$()`, or `page.$$()` for these elements.
2. THE LoginPage SHALL expose a `login(username: string, password: string): Promise<void>` method that fills the credentials and submits the form without using hard waits (`waitForTimeout`), and the method SHALL resolve only after navigation to the post-login page is complete.
3. THE DashboardPage SHALL expose a `logout(): Promise<void>` method that opens the user profile menu and clicks the Logout option without using hard waits, and the method SHALL resolve only after the application has navigated back to the login page.
4. THE Test_Suite SHALL instantiate LoginPage and DashboardPage objects within test bodies or `beforeEach` hooks; spec files SHALL NOT call `page.locator()`, `page.$()`, `page.$$()`, `page.getByRole()`, `page.getByLabel()`, or `page.getByPlaceholder()` directly.

---

### Requirement 10: Test Data Separation

**User Story:** As a test engineer, I want test credentials and expected outcomes to be stored separately from test logic, so that updating test data does not require modifying test files.

#### Acceptance Criteria

1. THE Test_Data_File SHALL export a typed array of login scenarios where each entry contains at minimum: `username` (string), `password` (string), and `expectedResult` (object with `outcome` typed as `"success" | "failure"` and `expectedMessage` typed as string) fields, all typed as a TypeScript interface.
2. THE Test_Suite SHALL import credential sets from the Test_Data_File and SHALL NOT contain hard-coded username or password strings inline within test blocks or `beforeEach` hooks.
3. THE Test_Data_File SHALL include at minimum one entry for each of: valid credentials (outcome: `"success"`, expectedMessage: `"Dashboard"`), invalid username (outcome: `"failure"`, expectedMessage: `"Invalid credentials"`), invalid password (outcome: `"failure"`, expectedMessage: `"Invalid credentials"`), empty username (outcome: `"failure"`, expectedMessage: `"Required"`), and empty password (outcome: `"failure"`, expectedMessage: `"Required"`).

---

### Requirement 11: Test Independence

**User Story:** As a test engineer, I want each test to be self-contained, so that test execution order does not affect individual test outcomes.

#### Acceptance Criteria

1. THE Test_Suite SHALL ensure each test begins with the browser navigated to the login URL with no active authenticated session, so that no test inherits state from a prior test.
2. WHEN a test that exercises post-login functionality begins, THE Test_Suite SHALL submit credentials and confirm the browser URL ends with `/dashboard` before the test's own actions proceed, rather than relying on session state from a prior test.
3. THE Test_Suite SHALL NOT contain `test.only` in any committed code.
4. WHEN any single test in the Test_Suite is executed in isolation without any prior test having run, THE test SHALL produce a deterministic pass or fail result independent of execution order.
