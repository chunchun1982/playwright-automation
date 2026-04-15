import { Page } from "@playwright/test";
export declare class BasePage {
    readonly page: Page;
    constructor(page: Page);
    waitForUrlContains(urlPart: string): Promise<void>;
    clickByRole(role: any, name: string): Promise<void>;
}
//# sourceMappingURL=BasePage.d.ts.map