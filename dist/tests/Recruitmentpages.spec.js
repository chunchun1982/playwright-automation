"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const LoginPage_1 = require("../pages/LoginPage");
const Recruitmentpages_1 = require("../pages/Recruitmentpages");
//import { Leavepage } from "../pages/LeavePage"; 
(0, test_1.test)('Recruitment ', async ({ page }) => {
    const loginpage = new LoginPage_1.LoginPage(page);
    //const leavepage=new Leavepage(page);
    await loginpage.goto();
    await loginpage.login('Admin', 'admin123');
    const recruitmentPage = new Recruitmentpages_1.RecruitmentPage(page);
    await recruitmentPage.clickRecurientmenulink();
    await recruitmentPage.selectjobtitle('QA Engineer');
    await page.pause();
    await recruitmentPage.selectvacancy('Software Engineer');
    await page.pause();
    await recruitmentPage.selecthiringmanager('Rahul Patil');
    await page.pause();
    await recruitmentPage.selectstatus('Shortlisted');
    await recruitmentPage.candidateNameInput.fill('John Doe');
    await recruitmentPage.keywordInput.fill('Automation Testing');
    await recruitmentPage.Dateofappliacationfrom.fill('2026-01-01');
    await recruitmentPage.Dateofappliacationto.fill('2026-12-31');
    await recruitmentPage.selectMethodOfApplication('Online');
    await recruitmentPage.verifyCandidatePresent('John Doe');
    await recruitmentPage.clickAdd();
    // Fill candidate details
    await recruitmentPage.verifyContactNumberEmpty(); // Check field is empty before filling
    await recruitmentPage.fillCandidateForm({
        firstName: 'Michel',
        lastName: 'Hussy',
        vacancy: 'Software Engineer',
        email: 'michel.hussy@test.com',
        phone: '9876543210',
        keywords: 'Automation, Playwright',
        date: '2026-03-21',
        notes: 'QA Candidate',
        resumePath: 'tests/test-data/resume.pdf'
    });
    await recruitmentPage.saveCandidate();
    await recruitmentPage.verifyCandidateAdded();
});
//# sourceMappingURL=Recruitmentpages.spec.js.map