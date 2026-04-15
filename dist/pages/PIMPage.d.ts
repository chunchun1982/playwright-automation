import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export declare class PIMPage extends BasePage {
    readonly pimMenu: import("playwright-core").Locator;
    readonly addEmployeeTab: import("playwright-core").Locator;
    constructor(page: Page);
    navigateToPIM(): Promise<void>;
    clickAddEmployee(): Promise<void>;
}
//# sourceMappingURL=PIMPage.d.ts.map