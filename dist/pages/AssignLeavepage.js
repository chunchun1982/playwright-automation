"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignLeavepage = void 0;
class AssignLeavepage {
    constructor(page) {
        this.page = page;
        this.leaveMenu = page.locator('a:has-text("Leave")');
        this.assignLeaveSubMenu = page.locator('a:has-text("Assign Leave")');
        this.employeeNameInput = page.getByRole('textbox', { name: 'Type for hints...' });
        this.leaveTypeDropdown = page.locator("div.oxd-input-group:has(label:has-text('Leave Type')) .oxd-select-text");
        this.fromDateInput = page.locator("div.oxd-input-group:has(label:has-text('From Date')) input");
        this.toDateInput = page.locator("div.oxd-input-group:has(label:has-text('To Date')) input");
        this.commentsTextarea = page.locator("div.oxd-input-group:has(label:has-text('Comments')) textarea");
        this.assignButton = page.locator('button:has-text("Assign")');
    }
    async navigateToAssignLeave() {
        await this.leaveMenu.click();
        await this.assignLeaveSubMenu.click();
    }
    //seelect value from Auto suggestion list and click on it
    async selectDropdown(dropdown, value) {
        await dropdown.click();
        //to write dropdown value in console
        const dropdownList = this.page.locator('.oxd-select-dropdown');
        await dropdownList.waitFor({ state: 'visible' });
        // Select exact visible option and ensure it's in view
        const option = dropdownList.getByText(value, { exact: true });
        await option.scrollIntoViewIfNeeded();
        await option.click();
    }
    async selectEmployeeName(name) {
        //await this.selectDropdown(this.employeeNameInput, name);
        // Type employee name
        await this.employeeNameInput.fill(name);
        // Wait for suggestion list
        const suggestionList = this.page.locator('.oxd-autocomplete-dropdown');
        await suggestionList.waitFor({ state: 'visible' });
        // Select matching option
        const option = suggestionList.getByText(name, { exact: false });
        await option.first().click();
    }
    async selectLeaveType(value) {
        // Click on the dropdown to open it
        await this.leaveTypeDropdown.click();
        // Wait for the dropdown to appear
        const dropdownList = this.page.locator('.oxd-select-dropdown');
        await dropdownList.waitFor({ state: 'visible', timeout: 5000 });
        // Find and click the option
        const option = dropdownList.locator(`div:has-text("${value}")`).first();
        await option.waitFor({ state: 'visible', timeout: 5000 });
        await option.click();
        // Wait for dropdown to close
        await dropdownList.waitFor({ state: 'hidden', timeout: 5000 });
    }
    async setDate(input, date) {
        await input.click();
        await input.fill(date);
        await input.blur();
    }
    async setFromDate(date) {
        await this.setDate(this.fromDateInput, date);
    }
    async setToDate(date) {
        await this.setDate(this.toDateInput, date);
    }
    async addComments(text) {
        await this.commentsTextarea.fill(text);
    }
    async submitAssignLeave() {
        await this.assignButton.click();
    }
    async assignLeave(options) {
        await this.selectEmployeeName(options.employeeName);
        await this.page.pause();
        await this.selectLeaveType(options.leaveType);
        await this.setFromDate(options.fromDate);
        await this.setToDate(options.toDate);
        if (options.comments)
            await this.addComments(options.comments);
        await this.submitAssignLeave();
    }
}
exports.AssignLeavepage = AssignLeavepage;
//# sourceMappingURL=AssignLeavepage.js.map