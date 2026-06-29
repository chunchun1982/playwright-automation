import{Page,Locator} from '@playwright/test';
export class Auctioncreatepage {
 readonly page: Page;
 readonly Auctionmanagement: Locator
 readonly Auctioncreate: Locator
 readonly NewAuction: Locator
 readonly CountryDropdown: Locator
 readonly ClientDropdown: Locator
 readonly AuctionNoInput: Locator
 readonly AuctionTypeDropdown: Locator
 readonly AuctionPSDTCalender: Locator
 readonly AuctionDate: Locator
 readonly EMDAmount: Locator
 readonly SaveButton: Locator
 constructor(page: Page) {
    this.page = page;
    this.Auctionmanagement = page.locator('a,button').filter({ hasText: 'Auction Management' }).first();
    this.Auctioncreate = page.locator('a,button').filter({ hasText: 'Auction Creation' }).first();
    this.NewAuction = page.locator('a,button').filter({ hasText: 'New' }).first();
    this.CountryDropdown = page.locator('#CountryId');
    this.ClientDropdown = page.locator('#ClientId');
    this.AuctionNoInput = page.locator('#AuctionNumber');
    this.AuctionTypeDropdown = page.locator('#AuctionType');
    this.AuctionPSDTCalender = page.locator('#AuctionPublishStartDate, input[id*="PublishStartDate"], input[name*="PublishStartDate"], input[placeholder*="HH:mm:ss"]').first();
    this.AuctionDate = page.locator('#AuctionDate, input[id*="AuctionDate"], input[name*="AuctionDate"], input[placeholder*="DD/MMM/YYYY"]').first();
    this.EMDAmount = page.locator('#EMDAmount');
    this.SaveButton = page.getByRole('button', { name: 'Save' })
 }
async clickAuctionManagement() {
      await this.Auctionmanagement.hover();
      await this.Auctionmanagement.hover();
      await this.Auctioncreate.hover();
      await this.NewAuction.click();

}
async addclientsave(country: string, client: string, auctionNo: string, auctionType: string, auctionDate: string, psdtDate: string, emdAmount: string) {
    await this.CountryDropdown.selectOption(country);
    await this.ClientDropdown.selectOption(client);
    await this.AuctionNoInput.fill(auctionNo);
    await this.AuctionTypeDropdown.selectOption(auctionType);

    await this.AuctionDate.waitFor({ state: 'visible', timeout: 15000 });
    await this.AuctionDate.click();
    await this.AuctionDate.fill(auctionDate);

    await this.AuctionPSDTCalender.waitFor({ state: 'visible', timeout: 15000 });
    await this.AuctionPSDTCalender.click();
    await this.AuctionPSDTCalender.fill(psdtDate);

    await this.EMDAmount.fill(emdAmount);
    await this.SaveButton.click();
} 

}