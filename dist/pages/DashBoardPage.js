"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashBoardPage = void 0;
const test_1 = require("@playwright/test");
class DashBoardPage {
    constructor(page) {
        this.page = page;
        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
        // Correct parent card
        this.quickLaunchCard = page.locator('div.oxd-grid-item', {
            has: page.getByText('Quick Launch')
        });
    }
    async verifyDashboardLoaded() {
        await (0, test_1.expect)(this.page).toHaveURL(/dashboard/);
        await (0, test_1.expect)(this.dashboardHeading).toBeVisible();
    }
    async clickAssignLeave() {
        await this.page.getByRole('button', { name: 'Assign Leave' }).click();
    }
}
exports.DashBoardPage = DashBoardPage;
//# sourceMappingURL=DashBoardPage.js.map