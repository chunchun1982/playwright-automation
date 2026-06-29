# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Auctioncreatepage.spec.ts >> Auction Creation Tests >> Create Auction
- Location: tests\Auctioncreatepage.spec.ts:48:7

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('#SaveButton')

```

# Test source

```ts
  1  | import{Page,Locator} from '@playwright/test';
  2  | export class Auctioncreatepage {
  3  |  readonly page: Page;
  4  |  readonly Auctionmanagement: Locator
  5  |  readonly Auctioncreate: Locator
  6  |  readonly NewAuction: Locator
  7  |  readonly CountryDropdown: Locator
  8  |  readonly ClientDropdown: Locator
  9  |  readonly AuctionNoInput: Locator
  10 |  readonly AuctionTypeDropdown: Locator
  11 |  readonly AuctionPSDTCalender: Locator
  12 |  readonly AuctionDate: Locator
  13 |  readonly EMDAmount: Locator
  14 |  readonly SaveButton: Locator
  15 |  constructor(page: Page) {
  16 |     this.page = page;
  17 |     this.Auctionmanagement = page.locator('a,button').filter({ hasText: 'Auction Management' }).first();
  18 |     this.Auctioncreate = page.locator('a,button').filter({ hasText: 'Auction Creation' }).first();
  19 |     this.NewAuction = page.locator('a,button').filter({ hasText: 'New' }).first();
  20 |     this.CountryDropdown = page.locator('#CountryId');
  21 |     this.ClientDropdown = page.locator('#ClientId');
  22 |     this.AuctionNoInput = page.locator('#AuctionNumber');
  23 |     this.AuctionTypeDropdown = page.locator('#AuctionType');
  24 |     this.AuctionPSDTCalender = page.locator('#AuctionPublishStartDate, input[id*="PublishStartDate"], input[name*="PublishStartDate"], input[placeholder*="HH:mm:ss"]').first();
  25 |     this.AuctionDate = page.locator('#AuctionDate, input[id*="AuctionDate"], input[name*="AuctionDate"], input[placeholder*="DD/MMM/YYYY"]').first();
  26 |     this.EMDAmount = page.locator('#EMDAmount');
  27 |     this.SaveButton = page.locator('input[type="submit"][value*="Save"], button[type="submit"], #SaveButton').first();
  28 |  }
  29 | async clickAuctionManagement() {
  30 |       await this.Auctionmanagement.hover();
  31 |       await this.Auctionmanagement.hover();
  32 |       await this.Auctioncreate.hover();
  33 |       await this.NewAuction.click();
  34 | 
  35 | }
  36 | async addclientsave(country: string, client: string, auctionNo: string, auctionType: string, auctionDate: string, psdtDate: string, emdAmount: string) {
  37 |     await this.CountryDropdown.selectOption(country);
  38 |     await this.ClientDropdown.selectOption(client);
  39 |     await this.AuctionNoInput.fill(auctionNo);
  40 |     await this.AuctionTypeDropdown.selectOption(auctionType);
  41 | 
  42 |     await this.AuctionDate.waitFor({ state: 'visible', timeout: 15000 });
  43 |     await this.AuctionDate.click();
  44 |     await this.AuctionDate.fill(auctionDate);
> 45 | 
     |                           ^ Error: locator.click: Target page, context or browser has been closed
  46 |     await this.AuctionPSDTCalender.waitFor({ state: 'visible', timeout: 15000 });
  47 |     await this.AuctionPSDTCalender.click();
  48 |     await this.AuctionPSDTCalender.fill(psdtDate);
  49 | 
  50 |     await this.EMDAmount.fill(emdAmount);
  51 |     await this.SaveButton.click();
  52 | } 
  53 | 
  54 | }
```