import{Page,Locator} from '@playwright/test';
import { AuctionLoginPage } from '../pages/AuctionLoginpage'; 
import { AddClientPage } from '../pages/Addclientpage';
export class AddBidderPage {
    readonly page: Page;
    readonly BidderScope: Locator;
    readonly CompanyName: Locator;
    readonly RegAddress: Locator;
    readonly PAN: Locator;
    readonly Country: Locator;
    readonly State: Locator;
    readonly City: Locator;
    readonly PinCode: Locator;
    readonly IsActive: Locator;
    readonly FullName: Locator;
    readonly Designation: Locator;
    readonly ContactNumber: Locator;
    readonly WhatsAppNumber: Locator;
    readonly Email: Locator;
    readonly UserName: Locator;
    readonly SaveButton: Locator;
    readonly clickAddBidderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.BidderScope = page.locator('#ddlBidderScope');
        this.CompanyName = page.locator('#CompanyName');
        this.RegAddress = page.locator('#RegisteredAddress');
        this.PAN = page.locator('#PAN');
        this.Country = page.locator('#Country');
        this.State = page.locator('#State');
        this.City = page.locator('#City');
        this.PinCode = page.locator('#PinCode');
        this.IsActive = page.getByRole('checkbox', { name: 'BidderIsActive' });
        this.FullName = page.locator('#Name');
        this.Designation = page.locator('#Designation');
        this.ContactNumber = page.locator('#PrimaryPhoneNumber');
        this.WhatsAppNumber = page.locator('#WhatsAPPPriNumber');
        this.Email = page.locator('#EmailId');
        this.UserName = page.locator('#UserLoginName');
        this.SaveButton = page.locator('#bidderBtnSave');
        this.clickAddBidderButton = page.getByRole('button', { name: 'Insert' });

    }
     async clickAddBidder() {
        await this.clickAddBidderButton.hover();
        await this.clickAddBidderButton.click();
    }
    async clickSave() {
        await this.SaveButton.click();
    }


    async addBidderDetails(bidderScope: string, companyName: string, regAddress: string, pan: string, country: string, state: string, city: string, pinCode: string, fullName: string, designation: string, contactNumber: string, whatsAppNumber: string, email: string, userName: string) {
        await this.BidderScope.selectOption(bidderScope);
        await this.CompanyName.fill(companyName);
        await this.RegAddress.fill(regAddress);
        await this.PAN.fill(pan);
        await this.Country.selectOption(country);
        await this.State.selectOption(state);
        await this.City.selectOption(city);
        await this.PinCode.fill(pinCode);
        await this.FullName.fill(fullName);
        await this.Designation.fill(designation);
        await this.ContactNumber.fill(contactNumber);
        await this.WhatsAppNumber.fill(whatsAppNumber);
        await this.Email.fill(email);
        await this.UserName.fill(userName);
        
    }
    }
