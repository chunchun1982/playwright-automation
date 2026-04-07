import { Page, Locator } from "@playwright/test";

export class Leavepage 
{
  readonly page: Page;
  readonly leaveMenu: Locator;
  readonly applyLeaveMenu: Locator;
  readonly leaveTypeDropdown: Locator;
  readonly fromDate: Locator;
  readonly toDate: Locator;
  readonly commentBox: Locator;
  readonly applyButton: Locator;
  readonly successMessage: Locator;
  constructor(page: Page)
  {
      this.page=page;
      // Locators
    this.leaveMenu = page.locator('//span[text()="Leave"]');
    this.applyLeaveMenu = page.locator('//a[text()="Apply"]');
    this.leaveTypeDropdown = page.getByRole('combobox', { name: 'Leave Type' });
    this.fromDate = page.getByPlaceholder('yyyy-mm-dd').first();
    this.toDate = page.getByPlaceholder('yyyy-mm-dd').nth(1);
    this.commentBox = page.getByRole('textbox', { name: 'Comment' });
    this.applyButton =page.getByRole('button', { name: 'Apply' });
    this.successMessage = page.getByRole('alert');
  }

  async navigateToLeaveModule()
  {
     await this.leaveMenu.click();
   
  }

  async clickApplyLeave()
  {
    await this.applyLeaveMenu.click();
  }

  async selectLeaveType()
  {
     await this.leaveTypeDropdown.click()
     await this.page.locator('text=CAN - FMLA').click()
  }

  async enterLeaveDates(from: string , To: string)
  {
     await this.fromDate.fill(from);
     await this.toDate.fill(To );

  }
  async entercomment(comment:string)
  {
    await this.commentBox.fill(comment);

  }

  async clickApply()
  {
    await this.applyButton.click();

  }
   async verifyLeaveApplied()
   {
      await this.successMessage.waitFor();

   }


}