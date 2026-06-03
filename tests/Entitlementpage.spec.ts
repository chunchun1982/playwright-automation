import{test} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import{Entitlementpage} from '../pages/Entitlementpage';


test('Add Entitlement', async({page})=>{
    const login=new LoginPage(page);
    const entitlement=new Entitlementpage(page);
    await login.goto();
    await login.login('Admin', 'admin123');
    await entitlement.navigatetoLeaveMenu();
   
    await entitlement.clickEntitlement();
    await entitlement.clickAddEntitlement();
   
    await entitlement.enterEntitlementDetails('Ranga  Akunuri', 'CAN - FMLA', '2026', '2');
    await entitlement.handleConfirmationPopup(); // Handle confirmation pop-up if it appears
    await entitlement.verifyEntitlementAdded();
    // Optionally, you can add assertions here to verify the content of the success message
})



