import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PIMPage extends BasePage {

  readonly pimMenu;
  readonly addEmployeeTab;

  constructor(page: Page) {
    super(page);

    this.pimMenu = page.getByRole('link', { name: 'PIM' });
    this.addEmployeeTab = page
      .locator('.oxd-topbar-body-nav')
      .getByRole('link', { name: 'Add Employee' });
  }

  async navigateToPIM() {
    await this.pimMenu.click();
    await this.waitForUrlContains('pim');
  }

  async clickAddEmployee() {
    await this.addEmployeeTab.click();
    await this.waitForUrlContains('addEmployee');
  }
}