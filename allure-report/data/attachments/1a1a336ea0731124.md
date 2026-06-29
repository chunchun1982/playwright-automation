# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: AuctionLoginpage.spec.ts >> Client Master Tests >> Add Client
- Location: tests\AuctionLoginpage.spec.ts:55:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Inserted successfully')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Inserted successfully')

```

# Test source

```ts
  1   | import { test, expect, Page } from '@playwright/test';
  2   | import { AuctionLoginPage } from '../pages/AuctionLoginpage';
  3   | import { AddClientPage } from '../pages/Addclientpage';
  4   | import { AddBidderPage } from '../pages/AddBidderpage';
  5   | import * as allure from 'allure-js-commons';;
  6   | 
  7   | test.describe('Client Master Tests', () => {
  8   |     let page: Page;
  9   | 
  10  |     test.beforeAll(async ({ browser }) => {
  11  |         const context = await browser.newContext();
  12  |         page = await context.newPage();
  13  | 
  14  |         const auctionLoginPage = new AuctionLoginPage(page);
  15  | 
  16  |         await allure.step('Launch application', async () => {
  17  |             await auctionLoginPage.goto();
  18  |         });
  19  |      
  20  | 
  21  |         await allure.step('Login to application', async () => {
  22  |             await auctionLoginPage.closeModalDialog();
  23  |             await auctionLoginPage.BidderLoginlink();
  24  |             await auctionLoginPage.login('Vijayadmin', 'Welcome@123');
  25  |         });
  26  | 
  27  |         await allure.step('Validate dashboard', async () => {
  28  |             await expect(page).toHaveURL(/AdminDashboard/);
  29  |             await expect(page).toHaveTitle("Today's Auctions");
  30  |         });
  31  |     });
  32  | 
  33  |        test.afterAll(async () => {
  34  |         await page.close();
  35  |     });
  36  |     
  37  | 
  38  |     test('Client Master Navigation', async () => {
  39  |         allure.epic('Auction Application');
  40  |         allure.feature('Client Module');
  41  |         allure.story('Navigate to Client Master');
  42  |         allure.severity('normal');
  43  | 
  44  |         const auctionLoginPage = new AuctionLoginPage(page);
  45  | 
  46  |         await allure.step('Navigate to Client Master', async () => {
  47  |             await auctionLoginPage.navigateToClientMaster();
  48  |         });
  49  | 
  50  |         await allure.step('Verify Client page URL', async () => {
  51  |             await expect(page).toHaveURL(/Clients/);
  52  |         });
  53  |     });
  54  | 
  55  |     test('Add Client', async () => {
  56  |         allure.epic('Auction Application');
  57  |         allure.feature('Client Module');
  58  |         allure.story('Add New Client');
  59  |         allure.severity('critical');
  60  | 
  61  |         const addClientPage = new AddClientPage(page);
  62  | 
  63  |         await allure.step('Click Add Client button', async () => {
  64  |             await addClientPage.clickAddClient();
  65  |         });
  66  | 
  67  |         await allure.step('Enter client details', async () => {
  68  |             await addClientPage.addClientDetails(
  69  |                 'Opera Automation Company',
  70  |                 '123 Test St',
  71  |                 'India',
  72  |                 'AABCR1742E',
  73  |                 'AHMR01411E',
  74  |                 '24AABCR1742E1ZV',
  75  |                 'TST',
  76  |                 '10',
  77  |                 'Rakes Singh'
  78  |             );
  79  |         });
  80  | 
  81  |         await allure.step('Upload Terms and Conditions document', async () => {
  82  |             await addClientPage.addTermsAndConditions('D:\\Auctionit_Testing\\ChartNotes.pdf');
  83  |         });
  84  | 
  85  |         await allure.step('Click Save button', async () => {
  86  |             await addClientPage.clickSave();
  87  |         });
  88  | 
  89  |         await allure.step('Verify client added successfully', async () => {
> 90  |             await expect(page.locator('text=Inserted successfully')).toBeVisible();
      |                                                                      ^ Error: expect(locator).toBeVisible() failed
  91  |         });
  92  |     });
  93  | 
  94  |     test('Navigate to Bidder Master', async () => {
  95  |         allure.epic('Auction Application');
  96  |         allure.feature('Bidder Module');
  97  |         allure.story('Navigate to Bidder Master');
  98  |         allure.severity('normal');
  99  | 
  100 |         const auctionLoginPage = new AuctionLoginPage(page);
  101 | 
  102 |         await allure.step('Navigate to Bidder Master', async () => {
  103 |             await auctionLoginPage.navigateToBidderMaster();
  104 |         });
  105 | 
  106 |         await allure.step('Verify Bidder page URL', async () => {
  107 |             await expect(page).toHaveURL(/Bidders/);
  108 |         });
  109 |     });
  110 | 
  111 |     test('Add Bidder', async () => {
  112 |         allure.epic('Auction Application');
  113 |         allure.feature('Bidder Module');
  114 |         allure.story('Add New Bidder');
  115 |         allure.severity('critical');
  116 | 
  117 |         const addBidderPage = new AddBidderPage(page);
  118 | 
  119 |         await allure.step('Click Add Bidder button', async () => {
  120 |             await addBidderPage.clickAddBidder();
  121 |         });
  122 | 
  123 |         await allure.step('Enter bidder details', async () => {
  124 |             await addBidderPage.addBidderDetails(
  125 |                 'Forward Auction',
  126 |                 'Opera Automation Company',
  127 |                 '123 Test St',
  128 |                 'AABCR1742E',
  129 |                 'India',
  130 |                 'Maharashtra',
  131 |                 'Mumbai',
  132 |                 '400001',
  133 |                 'Rakesh Singh',
  134 |                 'Sales Manager',
  135 |                 '1234567890',
  136 |                 '9876543210',
  137 |                 'rakesh.singh@test.com',
  138 |                 'rakesh.singh'
  139 |             );
  140 |         });
  141 | 
  142 |         await allure.step('Click Save button', async () => {
  143 |             await addBidderPage.clickSave();
  144 |         });
  145 |     });
  146 | 
  147 | });
```