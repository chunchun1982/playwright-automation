import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PIMPage } from '../pages/PIMPage';
import { AddEmployeePage } from '../pages/AddEmplloyeePage';

test('Add Employee with Login Details', async ({ page }) => {

  const login = new LoginPage(page);
  const pim=new PIMPage(page);
  const addEmployee = new AddEmployeePage(page);

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