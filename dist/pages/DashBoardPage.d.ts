import { Page, Locator } from "@playwright/test";
export declare class DashBoardPage {
    readonly page: Page;
    readonly dashboardHeading: Locator;
    readonly quickLaunchCard: Locator;
    constructor(page: Page);
    verifyDashboardLoaded(): Promise<void>;
    clickAssignLeave(): Promise<void>;
}
//# sourceMappingURL=DashBoardPage.d.ts.map