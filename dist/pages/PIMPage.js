"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PIMPage = void 0;
const BasePage_1 = require("./BasePage");
class PIMPage extends BasePage_1.BasePage {
    constructor(page) {
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
exports.PIMPage = PIMPage;
//# sourceMappingURL=PIMPage.js.map