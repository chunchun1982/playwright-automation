"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEmployeePage = void 0;
const test_1 = require("@playwright/test");
const BasePage_1 = require("./BasePage");
class AddEmployeePage extends BasePage_1.BasePage {
    constructor() {
        super(...arguments);
        this.firstName = this.page.getByPlaceholder('First Name');
        this.lastName = this.page.getByPlaceholder('Last Name');
        this.createLoginCheckbox = this.page.locator('.oxd-switch-input');
        //readonly username = this.page.locator('input').nth(4);
        this.username = this.page.getByRole('textbox').nth(5);
        this.password = this.page.locator('input[type="password"]').nth(0);
        this.confirmPassword = this.page.locator('input[type="password"]').nth(1);
        this.saveButton = this.page.getByRole('button', { name: 'Save' });
        this.successToast = this.page.locator('.oxd-toast--success');
    }
    async addEmployee(data) {
        await this.firstName.fill(data.firstName);
        await this.lastName.fill(data.lastName);
        await this.createLoginCheckbox.highlight();
        await this.createLoginCheckbox.click();
        //await this.page.pause();
        await this.username.fill(data.username + Date.now());
        //await this.page.pause();
        await this.password.fill(data.password);
        await this.confirmPassword.fill(data.confirmpassword);
        await this.saveButton.click();
        // Validate success message
        await (0, test_1.expect)(this.page.getByText('Successfully Saved')).toBeVisible();
        //await expect(this.page.locator('.oxd-toast--success')).toContainText('Successfully Saved');
    }
}
exports.AddEmployeePage = AddEmployeePage;
//# sourceMappingURL=AddEmplloyeePage.js.map