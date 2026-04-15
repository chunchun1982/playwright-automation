"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const LoginPage_1 = require("../pages/LoginPage");
const LeavePage_1 = require("../pages/LeavePage");
(0, test_1.test)('Apply Leave', async ({ page }) => {
    const loginpage = new LoginPage_1.LoginPage(page);
    const leavepage = new LeavePage_1.Leavepage(page);
    await loginpage.goto();
    await loginpage.login('Admin', 'admin123');
    await leavepage.navigateToLeaveModule();
    await leavepage.clickApplyLeave();
    await leavepage.selectLeaveType();
    await leavepage.enterLeaveDates('2026-03-10', '2026-03-12');
    await leavepage.entercomment('Family vacation');
    await leavepage.clickApply();
    await leavepage.verifyLeaveApplied();
});
//# sourceMappingURL=Leave.spec.js.map