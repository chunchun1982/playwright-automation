import { Page, Locator } from '@playwright/test';
export declare class LoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    constructor(page: Page);
    goto(): Promise<void>;
    login(user: string, pass: string): Promise<void>;
    get errorMessage(): Locator;
}
//# sourceMappingURL=LoginPage.d.ts.map