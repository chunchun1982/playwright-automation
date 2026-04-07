import { test  } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Leavepage } from "../pages/LeavePage";

test('Apply Leave', async({page})=>{

const loginpage=new LoginPage(page);
const leavepage=new Leavepage(page);
await loginpage.goto();
await loginpage.login('Admin', 'admin123');
await leavepage.navigateToLeaveModule();
await leavepage.clickApplyLeave();
await leavepage.selectLeaveType();
await leavepage.enterLeaveDates('2026-03-10','2026-03-12');
await leavepage.entercomment('Family vacation');
await leavepage.clickApply();
await leavepage.verifyLeaveApplied();

})