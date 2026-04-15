import { BasePage } from "./BasePage";
export declare class AddEmployeePage extends BasePage {
    readonly firstName: import("playwright-core").Locator;
    readonly lastName: import("playwright-core").Locator;
    readonly createLoginCheckbox: import("playwright-core").Locator;
    readonly username: import("playwright-core").Locator;
    readonly password: import("playwright-core").Locator;
    readonly confirmPassword: import("playwright-core").Locator;
    readonly saveButton: import("playwright-core").Locator;
    readonly successToast: import("playwright-core").Locator;
    addEmployee(data: {
        firstName: string;
        lastName: string;
        username: string;
        password: string;
        confirmpassword: string;
    }): Promise<void>;
}
//# sourceMappingURL=AddEmplloyeePage.d.ts.map