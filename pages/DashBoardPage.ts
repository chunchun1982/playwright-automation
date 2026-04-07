import { Page, Locator, expect} from "@playwright/test";
export class DashBoardPage {

  readonly page: Page;
  readonly dashboardHeading: Locator;
  readonly quickLaunchCard: Locator;

  constructor(page: Page) {
    this.page = page;

    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });

    // Correct parent card
    this.quickLaunchCard = page.locator('div.oxd-grid-item', {
      has: page.getByText('Quick Launch')
    });
  }

  async verifyDashboardLoaded() {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.dashboardHeading).toBeVisible();
  }

  async clickAssignLeave() {
  await this.page.getByRole('button', { name: 'Assign Leave' }).click();
}

  }
