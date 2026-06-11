import { test, expect, Page } from '@playwright/test';
import { AuctionLoginPage } from '../pages/AuctionLoginpage';
import { AddClientPage } from '../pages/Addclientpage';

test.describe('Client Master Tests', () => {
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

        const auctionLoginPage = new AuctionLoginPage(page);
        await auctionLoginPage.goto();
        await auctionLoginPage.closeModalDialog();
        await auctionLoginPage.BidderLoginlink();
        await auctionLoginPage.login('Vijayadmin', 'Welcome@123');
        await expect(page).toHaveURL(/AdminDashboard/);
        await expect(page).toHaveTitle("Today's Auctions");
    });

    test.afterAll(async () => {
        await page.close();
    });

    test('Client Master Navigation', async () => {
        const auctionLoginPage = new AuctionLoginPage(page);
        await auctionLoginPage.navigateToClientMaster();
        await expect(page).toHaveURL(/Clients/);
    });

    test('Add Client', async () => {
        const addClientPage = new AddClientPage(page);
        await addClientPage.clickAddClient();
        await addClientPage.addClientDetails(
            'Test New Company',
            '123 Test St',
            'India',
            'AABCR1742E',
            'AHMR01411E',
            '24AABCR1742E1ZV',
            'TST',
            '10',
            'Rakes Singh'
        );
        await addClientPage.addTermsAndConditions('D:\\Auctionit_Testing\\ChartNotes.pdf');
        await page.pause(); // Pause to verify file upload
        await addClientPage.clickSave();
    });
});