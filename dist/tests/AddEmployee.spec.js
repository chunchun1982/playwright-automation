"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const LoginPage_1 = require("../pages/LoginPage");
const PIMPage_1 = require("../pages/PIMPage");
const AddEmplloyeePage_1 = require("../pages/AddEmplloyeePage");
(0, test_1.test)('Add Employee with Login Details', async ({ page }) => {
    const login = new LoginPage_1.LoginPage(page);
    const pim = new PIMPage_1.PIMPage(page);
    const addEmployee = new AddEmplloyeePage_1.AddEmployeePage(page);
    await login.goto();
    await login.login('Admin', 'admin123');
    await pim.navigateToPIM();
    await pim.clickAddEmployee();
    await addEmployee.addEmployee({
        firstName: 'Mark',
        lastName: 'Voucher',
        //empId: '12345',
        username: 'Mark.Voucher',
        password: 'Password@123',
        confirmpassword: 'Password@123'
    });
});
//# sourceMappingURL=AddEmployee.spec.js.map