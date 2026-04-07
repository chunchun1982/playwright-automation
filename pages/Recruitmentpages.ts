import { Page, Locator, expect } from '@playwright/test';

export class RecruitmentPage {

  readonly page: Page;
  readonly form: Locator;
  readonly recruitmentlink: Locator;
  readonly candidatesLink: Locator;
   readonly jobtitlesdropdown: Locator;
  readonly vacanciesdropdown: Locator;
  readonly hiringmanagerdropdown: Locator;
  readonly statusdropdown: Locator;
  readonly candidateNameInput: Locator;
  readonly keywordInput: Locator;
  readonly Dateofappliacationfrom: Locator;  
  readonly Dateofappliacationto: Locator; 
  readonly methodofapplicationdropdown: Locator;
  //readonly searchButton: Locator;
  readonly addButton: Locator;
  //add condidate locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly advacancydropdown: Locator;
  readonly emailInput: Locator;
  readonly contactNumberInput: Locator;
   readonly resumeUploadInput: Locator;
  readonly keywordsInput: Locator;
  readonly dateOfApplicationInput: Locator;
  readonly noteInput: Locator;
  readonly consentToKeepDataCheckbox: Locator;
  readonly saveButton: Locator;
  readonly successToast: Locator;
 


  constructor(page: Page) {
    this.page = page;
    this.recruitmentlink = page.getByRole('link', { name: /recruitment/i });
    this.candidatesLink = page.getByRole('link', { name: /candidates/i });
    
    this.candidateNameInput = page.getByRole('textbox', { name: 'Type for hints...' });
    this.keywordInput = page.getByRole('textbox', { name: 'Enter comma seperated words...' });
    this.Dateofappliacationfrom = page.getByRole('textbox', { name: 'From' });
    this.Dateofappliacationto = page.getByRole('textbox', { name: 'To' });
    this.methodofapplicationdropdown = page.getByText('-- Select --').nth(4);
    //this.searchButton = page.getByRole('button', { name: /search/i });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.jobtitlesdropdown = page.locator("div.oxd-input-group:has(label:has-text('Job Title')) .oxd-select-text");
    this.vacanciesdropdown = page.locator("div.oxd-input-group:has(label:has-text('Vacancy')) .oxd-select-text");
    this.hiringmanagerdropdown = page.locator("div.oxd-input-group:has(label:has-text('Hiring Manager')) .oxd-select-text");
    this.statusdropdown = page.locator("div.oxd-input-group:has(label:has-text('Status')) .oxd-select-text");
    this.methodofapplicationdropdown = page.locator("div.oxd-input-group:has(label:has-text('Method of Application')) .oxd-select-text");
    
    // Add candidate form locators
     // Form scope
    this.form = page.locator('form');

    this.firstNameInput = this.form.getByPlaceholder('First Name');
    this.lastNameInput = this.form.getByPlaceholder('Last Name');
    this.advacancydropdown = this.form.locator('.oxd-input-group').filter({ hasText: 'Vacancy' }).locator('.oxd-select-text');

    this.emailInput = this.form.locator('.oxd-input-group').filter({ hasText: 'Email' }).locator('input');

    this.contactNumberInput = this.form.locator('.oxd-input-group').filter({ hasText: 'Contact Number' }).locator('input');

     this.resumeUploadInput = this.form.locator('input[type="file"]');

    this.keywordsInput = this.form.getByPlaceholder('Enter comma seperated words...');

    this.dateOfApplicationInput = this.form.locator('input[placeholder*="yyyy"]');

    this.noteInput = this.form.locator('textarea');

    // Robust checkbox locator - use accessibility-first approach
    //this.consentToKeepDataCheckbox = this.form.getByRole('checkbox', {name: /consent to keep data/i});
      this.consentToKeepDataCheckbox = this.form.locator('.oxd-icon.bi-check');

    this.saveButton = page.getByRole('button', { name: 'Save' });

    //this.successToast = page.locator('.oxd-toast--success');
    this.successToast = page.locator('.oxd-toast--success').filter({ hasText: 'Successfully Saved' });
    
  }

  async clickRecurientmenulink() {
    await this.recruitmentlink.click();

  }

  async clickCandidates() {
    await this.candidatesLink.click();
  }
  async selectjobtitle(jobtitle: string) {
    await this.selectDropdown(this.jobtitlesdropdown, jobtitle);
  }
    //async selectvacancy(vacancy: string) {
   // await this.vacanciesdropdown.click();
   // await this.page.locator(`text=${vacancy}`).click();
 // }
 async selectvacancy(vacancy: string){
    await this.selectDropdown(this.vacanciesdropdown, vacancy); 

}

    async selecthiringmanager(hiringmanager: string) {
     await this.selectDropdown(this.hiringmanagerdropdown, hiringmanager);  
  }
  
async selectstatus(status: string) {
  await this.selectDropdown(this.statusdropdown, status);

    
  }
  async enterCandidateName(name: string) {
      await this.selectAutoSuggestion(this.candidateNameInput, name);
  }
async enterKeyword(keyword: string) {
    await this.keywordInput.fill(keyword);
  }
    async enterDateOfApplicationFrom(date: string) {
    await this.Dateofappliacationfrom.fill(date);
  }
    async enterDateOfApplicationTo(date: string) {
    await this.Dateofappliacationto.fill(date);
  } 
    async selectMethodOfApplication(method: string) {   
    await this.selectDropdown(this.methodofapplicationdropdown, method);
  } 
    
    async clickAdd() {
    await this.addButton.click();
  }
  // Navigation
  async goToAddCandidate() {
    await this.recruitmentlink.click();
    await this.addButton.click();
  }

  // Add candidate form methods
     // Fill form
  async fillCandidateForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    keywords: string;
    date: string;
    notes: string;
    resumePath: string;
    vacancy: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.page.pause();
    await this.selectVacancy(data.vacancy);
    await this.emailInput.fill(data.email);
    await this.contactNumberInput.fill(data.phone);

    await this.resumeUploadInput.setInputFiles(data.resumePath);

    await this.keywordsInput.fill(data.keywords);
    await this.dateOfApplicationInput.fill(data.date);
    await this.noteInput.fill(data.notes);

    await this.consentToKeepDataCheckbox.setChecked(true);
  }
  // Save
  async saveCandidate() {
    await this.saveButton.click();
  }

  // Validation
  async verifyCandidateAdded() {
    await expect(this.successToast).toBeVisible();
  }
  
  async verifyContactNumberEmpty() {
    await expect(this.contactNumberInput).toHaveValue('');
  }

  async selectDropdown(dropdown: Locator, value: string) {
    await dropdown.click();
   //to write dropdown value in console

    const dropdownList = this.page.locator('.oxd-select-dropdown');
    await dropdownList.waitFor({ state: 'visible' });
  

    // Select exact visible option and ensure it's in view
    const option = dropdownList.getByText(value, { exact: true });
    await option.scrollIntoViewIfNeeded();
    await option.click();
  }
async selectAutoSuggestion(input: Locator, value: string) {

  // Clear existing value
  await input.fill('');

  // Type value using modern API
  await input.pressSequentially(value, { delay: 100 });

  // Wait for suggestion dropdown
  const dropdown = this.page.locator('.oxd-autocomplete-dropdown');
  await dropdown.waitFor();

  // Select exact match
  const option = dropdown.getByText(value, { exact: true });

  await option.scrollIntoViewIfNeeded();
  await option.click();
}
async verifyCandidatePresent(name: string) {
  await this.page.locator('.oxd-table-body').waitFor();

  const rows = this.page.locator('.oxd-table-row').filter({
    hasText: new RegExp(name.replace(' ', '\\s+'))
  });

  await expect(rows.first()).toBeVisible();
}
async selectVacancy(vacancy: string) {
  await this.selectDropdown(this.advacancydropdown, vacancy);
}

}





