---
description: "Workspace instructions for the Playwright POM test suite. Use these guidelines when writing or refactoring tests, page objects, and CI commands."
---

# Copilot Workspace Instructions (Playwright POM)

These instructions help Copilot understand the project structure, conventions, and common workflows for this Playwright-based automation repo.

## 🧭 Project Overview

- This repository is a **Playwright test suite** built using the **Page Object Model (POM)** pattern.
- Tests are written in **TypeScript** and live under `tests/`.
- Page objects are under `pages/`.
- The project uses **Playwright Test** (`@playwright/test`) with a configured `playwright.config.ts`.

## 🏁 How to Run Tests

Use Playwright CLI directly (no npm scripts are defined):

- Run all tests:
  ```bash
  npx playwright test
  ```

- Run a specific test file:
  ```bash
  npx playwright test tests/login.spec.ts
  ```

- Open the HTML report (after a run):
  ```bash
  npx playwright show-report
  ```

## 🧩 Conventions & Patterns

### 📁 File organization
- `tests/*.spec.ts` — test suites (Playwright `test()` + `test.describe()`)
- `pages/*.ts` — page object classes (selectors + actions)
- `playwright.config.ts` — global Playwright settings (browsers, retries, reports)

### 🧠 Page Objects
- Each page object usually exports a class that accepts a `Page` and exposes `Locator` properties + helper methods.
- Keep actions in page methods (e.g., `login()`, `navigateTo...()`) and avoid asserting inside page objects.

### 🧪 Tests
- Use Playwright’s `test.beforeEach()` / `test.afterEach()` hooks for setup/teardown.
- Keep test expectations in test files, not inside page objects.
- Use data-driven patterns where appropriate (e.g., iterating over login credentials).

## 🔍 What to Recommend Copilot

When asked to help with code changes or new tests, focus on:
- Adding/maintaining **page objects** in `pages/`.
- Creating or refactoring **test suites** in `tests/`.
- Using **Playwright selectors** (role/locator patterns) and **await**-based flow.
- Running Playwright CLI commands to reproduce locally.

## ⚠️ Important Notes

- There are **no npm scripts**, so always run tests via `npx playwright ...`.
- The suite is currently configured to run **headed** (non-headless). If you suggest changing that, mention the Playwright config entry.

---

*If you need a more specific instruction set for a subset of the repo (e.g., `tests/` only), we can add a separate `*.instructions.md` file with an `applyTo` glob.*
