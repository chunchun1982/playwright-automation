import { test, expect } from '@playwright/test';
import { getTestData } from '../utils/excelReader';

type LoginData = {
  username: string;
  password: string;
};

const testData= getTestData('tests/test-data/data.xlsx', 'Sheet1') as LoginData[];

test.describe('Login Test with Excel Data', () => {

  testData.forEach((data: LoginData, index: number) => {

    test(`Login Test ${index + 1}`, async ({ page }) => {

      await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

      await page.fill('input[name="username"]', data.username);
      await page.fill('input[name="password"]', data.password);
      await page.click('button[type="submit"]');

    });

  });

});