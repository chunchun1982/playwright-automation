import { Page, Locator } from "@playwright/test";
export declare class Leavepage {
    readonly page: Page;
    readonly leaveMenu: Locator;
    readonly applyLeaveMenu: Locator;
    readonly leaveTypeDropdown: Locator;
    readonly fromDate: Locator;
    readonly toDate: Locator;
    readonly commentBox: Locator;
    readonly applyButton: Locator;
    readonly successMessage: Locator;
    constructor(page: Page);
    navigateToLeaveModule(): Promise<void>;
    clickApplyLeave(): Promise<void>;
    selectLeaveType(): Promise<void>;
    enterLeaveDates(from: string, To: string): Promise<void>;
    entercomment(comment: string): Promise<void>;
    clickApply(): Promise<void>;
    verifyLeaveApplied(): Promise<void>;
}
//# sourceMappingURL=LeavePage.d.ts.map