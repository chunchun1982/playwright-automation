# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: AuctionLoginpage.spec.ts >> Client Master Tests >> Client Master Navigation
- Location: tests\AuctionLoginpage.spec.ts:51:9

# Error details

```
"beforeAll" hook timeout of 30000ms exceeded.
```

# Test source

```ts
  1   | import { test, expect, Page } from '@playwright/test';
  2   | import { feature, story, severity, description, owner, tag, step } from 'allure-js-commons';
  3   | import { AuctionLoginPage } from '../pages/AuctionLoginpage';
  4   | import { AddClientPage } from '../pages/Addclientpage';
  5   | import { AddBidderPage } from '../pages/AddBidderpage';
  6   | 
  7   | test.describe('Client Master Tests', () => {
  8   |     let page: Page;
  9   | 
> 10  |     test.beforeAll(async ({ browser }) => {
      |          ^ "beforeAll" hook timeout of 30000ms exceeded.
  11  |         // --- Allure suite-level metadata ---
  12  |         feature('Client Master');
  13  |         story('Navigation');
  14  |         severity('normal');
  15  |         description('Verifies that the user can navigate to the Client Master page.');
  16  |         owner('QA Team');
  17  |         tag('Regression');
  18  | 
  19  |         const context = await browser.newContext();
  20  |         page = await context.newPage();
  21  | 
  22  |         const auctionLoginPage = new AuctionLoginPage(page);
  23  | 
  24  |         await test.step('Navigate to Auction Login Page', async () => {
  25  |             await auctionLoginPage.goto();
  26  |         });
  27  | 
  28  |         await test.step('Close modal dialog', async () => {
  29  |             await auctionLoginPage.closeModalDialog();
  30  |         });
  31  | 
  32  |         await test.step('Click Bidder Login link', async () => {
  33  |             await auctionLoginPage.BidderLoginlink();
  34  |         });
  35  | 
  36  |         await test.step('Login with valid credentials', async () => {
  37  |             await auctionLoginPage.login('Vijayadmin', 'Welcome@123');
  38  |         });
  39  | 
  40  |         await test.step('Verify redirect to Admin Dashboard', async () => {
  41  |             await expect(page).toHaveURL(/AdminDashboard/);
  42  |             await expect(page).toHaveTitle("Today's Auctions");
  43  |         });
  44  |     });
  45  | 
  46  |     test.afterAll(async () => {
  47  |         await page.close();
  48  |     });
  49  | 
  50  |     // ─────────────────────────────────────────────────────────────────
  51  |     test('Client Master Navigation', async () => {
  52  |         feature('Client Master');
  53  |         story('Navigation');
  54  |         severity('normal');
  55  |         description('Verifies that the user can navigate to the Client Master page.');
  56  | 
  57  |         const auctionLoginPage = new AuctionLoginPage(page);
  58  | 
  59  |         await test.step('Navigate to Client Master', async () => {
  60  |             await auctionLoginPage.navigateToClientMaster();
  61  |         });
  62  | 
  63  |         await test.step('Verify URL contains /Clients', async () => {
  64  |             await expect(page).toHaveURL(/Clients/);
  65  |         });
  66  |     });
  67  | 
  68  |     // ─────────────────────────────────────────────────────────────────
  69  |     test('Add Client', async () => {
  70  |         feature('Client Master');
  71  |         story('Add Client');
  72  |         severity('critical');
  73  |         description('Verifies that a new client can be added with all required details and a terms & conditions PDF.');
  74  | 
  75  |         const addClientPage = new AddClientPage(page);
  76  | 
  77  |         await test.step('Click Add Client button', async () => {
  78  |             await addClientPage.clickAddClient();
  79  |         });
  80  | 
  81  |         await test.step('Fill in client details', async () => {
  82  |             await addClientPage.addClientDetails(
  83  |                 'Kata Automation Company',
  84  |                 '123 Test St',
  85  |                 'India',
  86  |                 'AABCR1742E',
  87  |                 'AHMR01411E',
  88  |                 '24AABCR1742E1ZV',
  89  |                 'TST',
  90  |                 '10',
  91  |                 'Rakes Singh'
  92  |             );
  93  |         });
  94  | 
  95  |         await test.step('Upload Terms and Conditions PDF', async () => {
  96  |             await addClientPage.addTermsAndConditions('D:\\Auctionit_Testing\\ChartNotes.pdf');
  97  |             await page.pause(); // Pause to verify file upload
  98  |         });
  99  | 
  100 |         await test.step('Click Save and verify success message', async () => {
  101 |             await addClientPage.clickSave();
  102 |             await expect(page.locator('text=Inserted successfully')).toBeVisible();
  103 |         });
  104 |     });
  105 | 
  106 |     // ─────────────────────────────────────────────────────────────────
  107 |     test('Navigate to Bidder Master', async () => {
  108 |         feature('Bidder Master');
  109 |         story('Navigation');
  110 |         severity('normal');
```