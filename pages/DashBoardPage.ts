import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashBoardPage extends BasePage {

  readonly dashboardHeading: Locator;
  readonly quickLaunchCard: Locator;

  constructor(page: Page) {
    super(page);

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

  /**
   * Opens the user profile dropdown and clicks Logout.
   * Waits for navigation back to the login page (URL: /) before resolving.
   */
  async logout(): Promise<void> {
    await this.page.getByRole('banner').locator('li.oxd-userdropdown').click();
    await this.page.getByRole('menuitem', { name: /logout/i }).click();
    await expect(this.page).toHaveURL(/auth\/login/);
  }
}
