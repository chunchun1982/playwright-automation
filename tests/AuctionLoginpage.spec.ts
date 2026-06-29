import { test, expect, Page } from '@playwright/test';
import { AuctionLoginPage } from '../pages/AuctionLoginpage';
import { AddClientPage } from '../pages/Addclientpage';
import { AddBidderPage } from '../pages/AddBidderpage';
import * as allure from 'allure-js-commons';;

test.describe('Client Master Tests', () => {
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

        const auctionLoginPage = new AuctionLoginPage(page);

        await allure.step('Launch application', async () => {
            await auctionLoginPage.goto();
        });
     

        await allure.step('Login to application', async () => {
            await auctionLoginPage.closeModalDialog();
            await auctionLoginPage.BidderLoginlink();
            await auctionLoginPage.login('Vijayadmin', 'Welcome@123');
        });

        await allure.step('Validate dashboard', async () => {
            await expect(page).toHaveURL(/AdminDashboard/);
            await expect(page).toHaveTitle("Today's Auctions");
        });
    });

       test.afterAll(async () => {
        await page.close();
    });
    

    test('Client Master Navigation', async () => {
        allure.epic('Auction Application');
        allure.feature('Client Module');
        allure.story('Navigate to Client Master');
        allure.severity('normal');

        const auctionLoginPage = new AuctionLoginPage(page);

        await allure.step('Navigate to Client Master', async () => {
            await auctionLoginPage.navigateToClientMaster();
        });

        await allure.step('Verify Client page URL', async () => {
            await expect(page).toHaveURL(/Clients/);
        });
    });

    test('Add Client', async () => {
        allure.epic('Auction Application');
        allure.feature('Client Module');
        allure.story('Add New Client');
        allure.severity('critical');

        const addClientPage = new AddClientPage(page);

        await allure.step('Click Add Client button', async () => {
            await addClientPage.clickAddClient();
        });

        await allure.step('Enter client details', async () => {
            await addClientPage.addClientDetails(
                'Sharma Automation Company',
                '123 Test St',
                'India',
                'AABCR1742E',
                'AHMR01411E',
                '24AABCR1742E1ZV',
                'TST',
                '10',
                'Rakes Singh'
            );
        });

        await allure.step('Upload Terms and Conditions document', async () => {
            await addClientPage.addTermsAndConditions('D:\\Auctionit_Testing\\ChartNotes.pdf');
        });

        await allure.step('Click Save button', async () => {
            await addClientPage.clickSave();
        });

        await allure.step('Verify client added successfully', async () => {
            await expect(page.locator('text=Inserted successfully')).toBeVisible();
        });
    });

    test('Navigate to Bidder Master', async () => {
        allure.epic('Auction Application');
        allure.feature('Bidder Module');
        allure.story('Navigate to Bidder Master');
        allure.severity('normal');

        const auctionLoginPage = new AuctionLoginPage(page);

        await allure.step('Navigate to Bidder Master', async () => {
            await auctionLoginPage.navigateToBidderMaster();
        });

        await allure.step('Verify Bidder page URL', async () => {
            await expect(page).toHaveURL(/Bidders/);
        });
    });

    test('Add Bidder', async () => {
        allure.epic('Auction Application');
        allure.feature('Bidder Module');
        allure.story('Add New Bidder');
        allure.severity('critical'); 

        const addBidderPage = new AddBidderPage(page);

        await allure.step('Click Add Bidder button', async () => { 
            await addBidderPage.clickAddBidder();
        });

        await allure.step('Enter bidder details', async () => {
            await addBidderPage.addBidderDetails(
                'Forward Auction',
                'Sharma Automation Company',
                '123 Test St',
                'AABCR1742E',
                'India',
                'Maharashtra',
                'Mumbai',
                '400001',
                'Rakesh Singh',
                'Sales Manager',
                '1234567890',
                '9876543210',
                'rakesh.singh@test.com',
                'rakesh.singh'
            );
        });

        await allure.step('Click Save button', async () => {
            await addBidderPage.clickSave();
        });
    });

});