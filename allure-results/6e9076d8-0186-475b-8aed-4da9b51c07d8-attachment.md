# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: AuctionLoginpage.spec.ts >> Client Master Tests >> Add Bidder
- Location: tests\AuctionLoginpage.spec.ts:109:9

# Error details

```
Error: locator.hover: Target page, context or browser has been closed
```

# Test source

```ts
  1  | import{Page,Locator} from '@playwright/test';
  2  | import { AuctionLoginPage } from '../pages/AuctionLoginpage'; 
  3  | import { AddClientPage } from '../pages/Addclientpage';
  4  | export class AddBidderPage {
  5  |     readonly page: Page;
  6  |     readonly BidderScope: Locator;
  7  |     readonly CompanyName: Locator;
  8  |     readonly RegAddress: Locator;
  9  |     readonly PAN: Locator;
  10 |     readonly Country: Locator;
  11 |     readonly State: Locator;
  12 |     readonly City: Locator;
  13 |     readonly PinCode: Locator;
  14 |     readonly IsActive: Locator;
  15 |     readonly FullName: Locator;
  16 |     readonly Designation: Locator;
  17 |     readonly ContactNumber: Locator;
  18 |     readonly WhatsAppNumber: Locator;
  19 |     readonly Email: Locator;
  20 |     readonly UserName: Locator;
  21 |     readonly SaveButton: Locator;
  22 |     readonly clickAddBidderButton: Locator;
  23 | 
  24 |     constructor(page: Page) {
  25 |         this.page = page;
  26 |         this.BidderScope = page.locator('#ddlBidderScope');
  27 |         this.CompanyName = page.locator('#CompanyName');
  28 |         this.RegAddress = page.locator('#RegisteredAddress');
  29 |         this.PAN = page.locator('#PAN');
  30 |         this.Country = page.locator('#Country');
  31 |         this.State = page.locator('#State');
  32 |         this.City = page.locator('#City');
  33 |         this.PinCode = page.locator('#PinCode');
  34 |         this.IsActive = page.getByRole('checkbox', { name: 'BidderIsActive' });
  35 |         this.FullName = page.locator('#Name');
  36 |         this.Designation = page.locator('#Designation');
  37 |         this.ContactNumber = page.locator('#PrimaryPhoneNumber');
  38 |         this.WhatsAppNumber = page.locator('#WhatsAPPPriNumber');
  39 |         this.Email = page.locator('#EmailId');
  40 |         this.UserName = page.locator('#UserLoginName');
  41 |         this.SaveButton = page.locator('#bidderBtnSave');
  42 |         this.clickAddBidderButton = page.getByRole('button', { name: 'Insert' });
  43 | 
  44 |     }
  45 |      async clickAddBidder() {
> 46 |         await this.clickAddBidderButton.hover();
     |                                         ^ Error: locator.hover: Target page, context or browser has been closed
  47 |         await this.clickAddBidderButton.click();
  48 |     }
  49 |     async clickSave() {
  50 |         await this.SaveButton.click();
  51 |     }
  52 | 
  53 | 
  54 |     async addBidderDetails(bidderScope: string, companyName: string, regAddress: string, pan: string, country: string, state: string, city: string, pinCode: string, fullName: string, designation: string, contactNumber: string, whatsAppNumber: string, email: string, userName: string) {
  55 |         await this.BidderScope.selectOption(bidderScope);
  56 |         await this.CompanyName.fill(companyName);
  57 |         await this.RegAddress.fill(regAddress);
  58 |         await this.PAN.fill(pan);
  59 |         await this.Country.selectOption(country);
  60 |         await this.State.selectOption(state);
  61 |         await this.City.selectOption(city);
  62 |         await this.PinCode.fill(pinCode);
  63 |         await this.FullName.fill(fullName);
  64 |         await this.Designation.fill(designation);
  65 |         await this.ContactNumber.fill(contactNumber);
  66 |         await this.WhatsAppNumber.fill(whatsAppNumber);
  67 |         await this.Email.fill(email);
  68 |         await this.UserName.fill(userName);
  69 |         
  70 |     }
  71 |     }
  72 | 
```