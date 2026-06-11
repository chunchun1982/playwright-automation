import {Page,Locator} from '@playwright/test';

export class AuctionLoginPage {
    readonly page: Page;
    readonly Bidderlogin: Locator;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly modalDialogImage: Locator;
    readonly modalCloseButton: Locator;
    readonly Masters: Locator;
    readonly clientMgmt: Locator;
    readonly clientmaster: Locator;



    constructor(page: Page    ) {
        this.page = page;
        this.Bidderlogin = page.getByRole('link', { name: 'Bidder Login' });
        this.username = page.getByRole('textbox', { name: /username/i });
        this.password = page.getByRole('textbox', { name: /password/i });
        this.loginButton = page.getByRole('link', { name: 'Sign in' });
        this.modalDialogImage = page.locator('.modal-dialog > img');
        //this.modalCloseButton = page.locator('.modal-dialog').getByRole('button', { name: '×' });
        this.modalCloseButton = page.getByRole('button', { name: '×' });
        this.Masters = page.getByRole('link', { name: 'Masters' });
        this.clientMgmt = page.getByRole('link', { name: 'Client Management' });
        this.clientmaster = page.getByRole('link', { name: 'Client Master' });

    } 
    async goto() {
        await this.page.goto('http://auctionit-new-testing.intellicomcenters.com/');
        //await this.page.waitForLoadState('networkidle');
       
    }

    async closeModalDialog() {
        if (await this.modalDialogImage.isVisible()) {
            await this.modalCloseButton.waitFor({ state: 'visible' });
            await this.modalCloseButton.hover();
            await this.modalCloseButton.click();
            await this.modalDialogImage.waitFor({ state: 'hidden' });
        }
    }

    async BidderLoginlink() {
        await this.Bidderlogin.click();
    }

    async login(user: string, pass: string) {
        await this.username.fill('');
        await this.username.fill(user);
        await this.password.fill('');
        await this.password.fill(pass);
        await this.loginButton.click();
    }
    async navigateToClientMaster() {
        await this.Masters.hover();
        await this.clientMgmt.hover();
        await this.clientmaster.click();
    }
}      