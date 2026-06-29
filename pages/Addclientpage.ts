import{Page,Locator} from "@playwright/test";

export class AddClientPage {
    readonly page: Page;
    readonly addClientButton: Locator;
    readonly Companyname: Locator;
    readonly RegAddress: Locator;
    readonly countrydropdown: Locator;
    readonly PAN: Locator;
    readonly TAN: Locator;
    readonly TIN: Locator;
    readonly isactive: Locator;
    readonly Prefixauctioncode: Locator;
    readonly Revenuerate: Locator;
    readonly PlantTechpersondetails: Locator;
    readonly Termsandcondition: Locator;
    readonly saveButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.addClientButton = page.locator('#btnadd');
        this.Companyname =page.locator('#CompanyName');
        this.RegAddress = page.locator('#RegisteredAddress');
        this.countrydropdown = page.locator('#ddlCountry');
        this.PAN = page.locator('#Pan');
        this.TAN = page.locator('#Tan');
        this.TIN = page.locator('#Tin');
        this.isactive = page.getByRole('checkbox', { name: 'Is Active' });
        this.Prefixauctioncode = page.locator('#PrefixAuctionCode');
        this.Revenuerate = page.locator('#RevenueRate');
        this.PlantTechpersondetails = page.locator('#PlantTechPersonDetails');
        this.Termsandcondition = page.locator('#Client #dropzonefrmTNC');
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }
    async clickAddClient() {
        await this.addClientButton.hover();
        await this.addClientButton.click();
    }
    async clickSave() {
        await this.saveButton.click();
    }
    //add client details
    async addClientDetails(companyName: string, regAddress: string, country: string, pan: string, tan: string, tin: string, prefixAuctionCode: string, revenueRate: string, plantTechPersonDetails: string) {
        await this.Companyname.fill(companyName);
        await this.RegAddress.fill(regAddress);
        await this.countrydropdown.selectOption(country);
        await this.PAN.fill(pan);
        await this.TAN.fill(tan);
        await this.TIN.fill(tin);
        await this.Prefixauctioncode.fill(prefixAuctionCode);
        await this.Revenuerate.fill(revenueRate);
        await this.PlantTechpersondetails.fill(plantTechPersonDetails);
    }
    async addTermsAndConditions(filePath: string) {
        
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.Termsandcondition.click(),
        ]);
        await fileChooser.setFiles(filePath);
        await this.page.waitForLoadState('networkidle');
    }
}


