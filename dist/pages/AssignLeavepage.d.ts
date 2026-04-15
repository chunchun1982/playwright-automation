import { Page, Locator } from "@playwright/test";
export declare class AssignLeavepage {
    readonly page: Page;
    readonly leaveMenu: Locator;
    readonly assignLeaveSubMenu: Locator;
    readonly employeeNameInput: Locator;
    readonly leaveTypeDropdown: Locator;
    readonly fromDateInput: Locator;
    readonly toDateInput: Locator;
    readonly commentsTextarea: Locator;
    readonly assignButton: Locator;
    constructor(page: Page);
    navigateToAssignLeave(): Promise<void>;
    selectDropdown(dropdown: Locator, value: string): Promise<void>;
    selectEmployeeName(name: string): Promise<void>;
    selectLeaveType(value: string): Promise<void>;
    setDate(input: Locator, date: string): Promise<void>;
    setFromDate(date: string): Promise<void>;
    setToDate(date: string): Promise<void>;
    addComments(text: string): Promise<void>;
    submitAssignLeave(): Promise<void>;
    assignLeave(options: {
        employeeName: string;
        leaveType: string;
        fromDate: string;
        toDate: string;
        comments?: string;
    }): Promise<void>;
}
//# sourceMappingURL=AssignLeavepage.d.ts.map