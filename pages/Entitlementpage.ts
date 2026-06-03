import{Page,Locator} from "@playwright/test";

export class Entitlementpage {
  readonly page: Page;
  readonly LeaveMenu: Locator;
  readonly EmployeeName: Locator;
  readonly LeaveType: Locator;
  readonly Leaveperiod: Locator;
  readonly Entitlement: Locator;
  readonly AddEntitlementList: Locator;
  readonly Entitlementcomments: Locator;
  readonly SaveButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.LeaveMenu = page.locator("//span[text()='Leave'] ");
    this.Entitlement = page.getByText('Entitlements') 
    this.AddEntitlementList = page.getByRole('menuitem', { name: 'Add Entitlements' });
    this.EmployeeName = page.getByPlaceholder('Type for hints...').nth(0);
    this.LeaveType = page.locator("div.oxd-input-group:has(label:has-text('Leave Type')) .oxd-select-text");
    this.Leaveperiod = page.locator("div.oxd-input-group:has(label:has-text('Leave Period')) .oxd-select-text");
    this.Entitlementcomments = page.locator("div.oxd-input-group:has(label:has-text('Entitlement')) input, div.oxd-input-group:has(label:has-text('Entitlement')) textarea");
    this.SaveButton = page.getByRole('button', { name: 'Save' });
    this.successMessage = page.getByText('Update Entitlement'); // Replace 'Success Message Text' with the actual text of the success message
  }
async navigatetoLeaveMenu() {
  await this.LeaveMenu.click();
}
async clickEntitlement() {
  await this.Entitlement.click();   

}
async clickAddEntitlement() {
  await this.AddEntitlementList.click();
}
async selectLeavePeriod(year: string) {

  //const dropdown = this.page.locator("div.oxd-input-group:has(label:has-text('Leave Period')) .oxd-select-text");
 // await dropdown.click();
  //const option = this.page.locator('.oxd-select-dropdown div').filter({ hasText: value }).first();
  //await option.waitFor({ state: 'visible' });
 // await option.click();


  const dropdown = this.page.locator("div.oxd-input-group:has(label:has-text('Leave Period')) .oxd-select-text");
  await dropdown.click();
  const dropdownContainer = this.page.locator('.oxd-select-dropdown');
  await dropdownContainer.waitFor({ state: 'visible' });
  const options = dropdownContainer.locator('div');
  const count = await options.count();
  console.log("Available Leave Periods:");
  for (let i = 0; i < count; i++) {
    console.log(await options.nth(i).innerText());
  }

  const option = options.filter({ hasText: year }).first();

  await option.click();
}

//to write the code for entering employee name, leave type, leave period and clicking on save button
async enterEntitlementDetails(employeeName: string, leaveType: string, leavePeriod: string, entitlementComments: string) {
  await this.EmployeeName.fill(employeeName);
  const suggestion = this.page.locator('.oxd-autocomplete-dropdown').getByText(employeeName);
  await suggestion.click();
  await this.selectLeaveType(leaveType);
  await this.selectLeavePeriod(leavePeriod);
  await this.Entitlementcomments.fill(entitlementComments);
  await this.SaveButton.click();
}

async selectLeaveType(value: string) {
  await this.LeaveType.click();
  const dropdownList = this.page.locator('.oxd-select-dropdown');
  await dropdownList.waitFor({ state: 'visible', timeout: 5000 });
  const option = dropdownList.locator(`div:has-text("${value}")`).first();
  await option.waitFor({ state: 'visible', timeout: 5000 });
  await option.click();
  await dropdownList.waitFor({ state: 'hidden', timeout: 5000 });
}
async verifyEntitlementAdded() {
  await this.successMessage.waitFor({ state: 'visible' });
  // Optionally, you can add assertions here to verify the content of the success message 
}
//click on confirmation pop-up if it appears after clicking save button
async handleConfirmationPopup() {
  const confirmationPopup = this.page.locator('.oxd-dialog-container');
  if (await confirmationPopup.isVisible()) {
    const confirmButton = confirmationPopup.getByRole('button', { name: 'Confirm' });
    await confirmButton.click();
  }


}
}