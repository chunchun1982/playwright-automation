import { test, expect, Page } from '@playwright/test';
import { AuctionLoginPage } from '../pages/AuctionLoginpage';
import { Auctioncreatepage } from '../pages/Auctioncreatepage';
import * as allure from 'allure-js-commons';

test.describe('Auction Creation Tests', () => {
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
  });

  
  test.afterAll(async () => {
    await page.close();
  });

  test('Auction Creation Navigation', async () => {
    allure.epic('Auction Application');
    allure.feature('Auction Creation Module');
    allure.story('Navigate to Auction Creation Page');
    allure.severity('normal');

    const auctionCreatePage = new Auctioncreatepage(page);

    await allure.step('Navigate to Auction Creation Page', async () => {
      await auctionCreatePage.clickAuctionManagement();
    });

    await allure.step('Verify Auction Creation page URL', async () => {
      await expect(page).toHaveURL(/Auction/);
    });
  });

  test('Create Auction', async () => {
    allure.epic('Auction Application');
    allure.feature('Auction Creation Module');
    allure.story('Create New Auction');
    allure.severity('critical');

    const auctionCreatePage = new Auctioncreatepage(page);



    await allure.step('Create New Auction', async () => {
      await auctionCreatePage.addclientsave(
        'India',
        'HEG Limited',
        'AUC567',
        'Forward',
        '2024-07-01',
        '2024-06-15 10:00:00',
        '100000'
      );
    });
  });
});