import { Page ,expect} from "@playwright/test";
import { BasePage } from "./BasePage";
export class AddEmployeePage extends BasePage
{
  readonly firstName = this.page.getByPlaceholder('First Name');
  readonly lastName = this.page.getByPlaceholder('Last Name');
  readonly createLoginCheckbox = this.page.locator('.oxd-switch-input');
  //readonly username = this.page.locator('input').nth(4);
  readonly username = this.page.getByRole('textbox').nth(5);
  readonly password = this.page.locator('input[type="password"]').nth(0);
  readonly confirmPassword = this.page.locator('input[type="password"]').nth(1);
  readonly saveButton = this.page.getByRole('button', { name: 'Save' });
  readonly successToast = this.page.locator('.oxd-toast--success');
  async addEmployee(data: {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    confirmpassword:string
  })
{
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.createLoginCheckbox.highlight();
    await this.createLoginCheckbox.click();
    //await this.page.pause();
    await this.username.fill(data.username+ Date.now());
    //await this.page.pause();
    await this.password.fill(data.password);
    await this.confirmPassword.fill(data.confirmpassword);
    await this.saveButton.click();
    
    // Validate success message
    await expect(this.page.getByText('Successfully Saved')).toBeVisible();
    //await expect(this.page.locator('.oxd-toast--success')).toContainText('Successfully Saved');


}


}