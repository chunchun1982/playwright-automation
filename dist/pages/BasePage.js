"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const test_1 = require("@playwright/test");
class BasePage {
    constructor(page) {
        this.page = page;
    }
    async waitForUrlContains(urlPart) {
        await (0, test_1.expect)(this.page).toHaveURL(new RegExp(urlPart));
    }
    async clickByRole(role, name) {
        await this.page.getByRole(role, { name }).click();
    }
}
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map