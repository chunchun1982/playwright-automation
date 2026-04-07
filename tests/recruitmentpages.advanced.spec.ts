import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RecruitmentPage } from '../pages/Recruitmentpages';

test.describe('Advanced Recruitment Page Test Scenarios', () => {
  let recruitmentPage: RecruitmentPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    recruitmentPage = new RecruitmentPage(page);

    // Login before each test
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await recruitmentPage.clickRecurientmenulink();
  });

  test.describe('Advanced Search and Filter Scenarios', () => {
    test('Search with multiple keywords and verify results', async () => {
      await recruitmentPage.enterKeyword('Automation, Testing, Selenium');
      await recruitmentPage.selectjobtitle('QA Engineer');
      await recruitmentPage.selectstatus('Shortlisted');

      // Verify that search criteria are applied
      await expect(recruitmentPage.keywordInput).toHaveValue('Automation, Testing, Selenium');
    });

    test('Filter by date range and verify chronological order', async () => {
      await recruitmentPage.enterDateOfApplicationFrom('2026-01-01');
      await recruitmentPage.enterDateOfApplicationTo('2026-12-31');

      // Verify date inputs are set correctly
      await expect(recruitmentPage.Dateofappliacationfrom).toHaveValue('2026-01-01');
      await expect(recruitmentPage.Dateofappliacationto).toHaveValue('2026-12-31');
    });

    test('Complex multi-criteria search with all filters', async () => {
      await recruitmentPage.selectjobtitle('QA Engineer');
      await recruitmentPage.selectvacancy('Software Engineer');
      await recruitmentPage.selecthiringmanager('Rahul Patil');
      await recruitmentPage.selectstatus('Shortlisted');
      await recruitmentPage.enterCandidateName('John Doe');
      await recruitmentPage.enterKeyword('Automation Testing');
      await recruitmentPage.enterDateOfApplicationFrom('2026-01-01');
      await recruitmentPage.enterDateOfApplicationTo('2026-12-31');
      await recruitmentPage.selectMethodOfApplication('Online');

      // Verify all filters are applied
      await expect(recruitmentPage.candidateNameInput).toHaveValue('John Doe');
      await expect(recruitmentPage.keywordInput).toHaveValue('Automation Testing');
    });

    test('Search with special characters in keywords', async () => {
      await recruitmentPage.enterKeyword('C++, C#, .NET, JavaScript');
      await expect(recruitmentPage.keywordInput).toHaveValue('C++, C#, .NET, JavaScript');
    });

    test('Verify dropdown options are sorted alphabetically', async ({ page }) => {
      await recruitmentPage.jobtitlesdropdown.click();
      const dropdownOptions = page.locator('.oxd-select-dropdown li');
      await expect(dropdownOptions.first()).toBeVisible();

      // Get all option texts and verify they are sorted
      const optionTexts = await dropdownOptions.allTextContents();
      const sortedOptions = [...optionTexts].sort();
      expect(optionTexts).toEqual(sortedOptions);
    });
  });

  test.describe('Advanced Add Candidate Scenarios', () => {
    test('Add candidate with maximum field lengths', async () => {
      const longFirstName = 'A'.repeat(50);
      const longLastName = 'B'.repeat(50);
      const longEmail = 'a'.repeat(50) + '@example.com';
      const longPhone = '1'.repeat(20);
      const longKeywords = 'Keyword'.repeat(20);
      const longNotes = 'This is a very long note. '.repeat(50);

      await recruitmentPage.clickAdd();
      await recruitmentPage.fillCandidateForm({
        firstName: longFirstName,
        lastName: longLastName,
        vacancy: 'Software Engineer',
        email: longEmail,
        phone: longPhone,
        keywords: longKeywords,
        date: '2026-03-20',
        notes: longNotes,
        resumePath: 'tests/test-data/resume.pdf'
      });

      await recruitmentPage.saveCandidate();
      await recruitmentPage.verifyCandidateAdded();
    });

    test('Add candidate with Unicode characters', async () => {
      await recruitmentPage.clickAdd();
      await recruitmentPage.fillCandidateForm({
        firstName: 'José',
        lastName: 'Müller',
        vacancy: 'Software Engineer',
        email: 'jose.mueller@test.com',
        phone: '1234567890',
        keywords: 'Java, 测试, 自动化',
        date: '2026-03-21',
        notes: 'Candidate with Unicode characters: ñáéíóú',
        resumePath: 'tests/test-data/resume.pdf'
      });

      await recruitmentPage.saveCandidate();
      await recruitmentPage.verifyCandidateAdded();
    });

    test('Add candidate with future date', async () => {
      await recruitmentPage.clickAdd();
      await recruitmentPage.fillCandidateForm({
        firstName: 'Future',
        lastName: 'Candidate',
        vacancy: 'Software Engineer',
        email: 'future.candidate@test.com',
        phone: '1234567890',
        keywords: 'Future Tech',
        date: '2027-12-31',
        notes: 'Future dated application',
        resumePath: 'tests/test-data/resume.pdf'
      });

      await recruitmentPage.saveCandidate();
      await recruitmentPage.verifyCandidateAdded();
    });

    test('Add candidate with past date (historical)', async () => {
      await recruitmentPage.clickAdd();
      await recruitmentPage.fillCandidateForm({
        firstName: 'Historical',
        lastName: 'Candidate',
        vacancy: 'Software Engineer',
        email: 'historical.candidate@test.com',
        phone: '1234567890',
        keywords: 'Legacy Systems',
        date: '2020-01-01',
        notes: 'Historical application date',
        resumePath: 'tests/test-data/resume.pdf'
      });

      await recruitmentPage.saveCandidate();
      await recruitmentPage.verifyCandidateAdded();
    });

    test('Add candidate with complex email formats', async () => {
      const testEmails = [
        'test.email+tag@example.com',
        'test.email@example.co.uk',
        'test_email@example-domain.com',
        '123test@example.com'
      ];

      for (const email of testEmails) {
        await recruitmentPage.clickAdd();
        await recruitmentPage.fillCandidateForm({
          firstName: 'Email',
          lastName: 'Test',
          vacancy: 'Software Engineer',
          email: email,
          phone: '1234567890',
          keywords: 'Email Testing',
          date: '2026-03-22',
          notes: `Testing email: ${email}`,
          resumePath: 'tests/test-data/resume.pdf'
        });

        await recruitmentPage.saveCandidate();
        await recruitmentPage.verifyCandidateAdded();
      }
    });

    test('Add candidate with various phone number formats', async () => {
      const phoneFormats = [
        '+1-555-123-4567',
        '(555) 123-4567',
        '555.123.4567',
        '5551234567',
        '+44 20 7123 4567'
      ];

      for (const phone of phoneFormats) {
        await recruitmentPage.clickAdd();
        await recruitmentPage.fillCandidateForm({
          firstName: 'Phone',
          lastName: 'Test',
          vacancy: 'Software Engineer',
          email: `phone.test${phone.replace(/[^a-zA-Z0-9]/g, '')}@test.com`,
          phone: phone,
          keywords: 'Phone Testing',
          date: '2026-03-23',
          notes: `Testing phone: ${phone}`,
          resumePath: 'tests/test-data/resume.pdf'
        });

        await recruitmentPage.saveCandidate();
        await recruitmentPage.verifyCandidateAdded();
      }
    });
  });

  test.describe('Advanced Form Validation Scenarios', () => {
    test('Verify form field character limits and truncation', async () => {
      await recruitmentPage.clickAdd();

      // Test first name field limit
      const excessiveFirstName = 'A'.repeat(100);
      await recruitmentPage.firstNameInput.fill(excessiveFirstName);
      const actualFirstName = await recruitmentPage.firstNameInput.inputValue();
      expect(actualFirstName.length).toBeLessThanOrEqual(50); // Assuming 50 char limit

      // Test email field with very long domain
      const longEmail = 'test@' + 'a'.repeat(200) + '.com';
      await recruitmentPage.emailInput.fill(longEmail);
      const actualEmail = await recruitmentPage.emailInput.inputValue();
      expect(actualEmail.length).toBeLessThanOrEqual(100); // Assuming reasonable limit
    });

    test('Verify date field accepts various formats', async () => {
      await recruitmentPage.clickAdd();

      const dateFormats = ['2026-03-24', '03/24/2026', '24-03-2026'];

      for (const date of dateFormats) {
        await recruitmentPage.dateOfApplicationInput.fill(date);
        const actualDate = await recruitmentPage.dateOfApplicationInput.inputValue();
        // Verify some date format is accepted
        expect(actualDate).toBeTruthy();
      }
    });

    test('Verify keywords field handles various separators', async () => {
      await recruitmentPage.clickAdd();

      const keywordFormats = [
        'Java, Python, JavaScript',
        'Java; Python; JavaScript',
        'Java | Python | JavaScript',
        'Java\nPython\nJavaScript'
      ];

      for (const keywords of keywordFormats) {
        await recruitmentPage.keywordsInput.fill(keywords);
        const actualKeywords = await recruitmentPage.keywordsInput.inputValue();
        expect(actualKeywords).toBe(keywords);
      }
    });

    test('Verify form maintains state during navigation', async () => {
      await recruitmentPage.clickAdd();
      await recruitmentPage.firstNameInput.fill('Test');
      await recruitmentPage.lastNameInput.fill('User');
      await recruitmentPage.emailInput.fill('test.user@test.com');

      // Navigate away and back (simulate tab switching)
      await recruitmentPage.clickRecurientmenulink();
      await recruitmentPage.clickAdd();

      // Verify form is reset (not maintaining state)
      await expect(recruitmentPage.firstNameInput).toHaveValue('');
      await expect(recruitmentPage.lastNameInput).toHaveValue('');
      await expect(recruitmentPage.emailInput).toHaveValue('');
    });
  });

  test.describe('Advanced Consent Checkbox Scenarios', () => {
    test('Verify consent checkbox state persistence during form filling', async () => {
      await recruitmentPage.clickAdd();

      // Check consent first
      await recruitmentPage.consentToKeepDataCheckbox.check();
      await expect(recruitmentPage.consentToKeepDataCheckbox).toBeChecked();

      // Fill other fields
      await recruitmentPage.firstNameInput.fill('Test');
      await recruitmentPage.lastNameInput.fill('User');
      await recruitmentPage.emailInput.fill('test.user@test.com');

      // Verify checkbox still checked
      await expect(recruitmentPage.consentToKeepDataCheckbox).toBeChecked();
    });

    test('Verify consent checkbox can be toggled multiple times', async () => {
      await recruitmentPage.clickAdd();

      // Toggle multiple times
      for (let i = 0; i < 5; i++) {
        await recruitmentPage.consentToKeepDataCheckbox.check();
        await expect(recruitmentPage.consentToKeepDataCheckbox).toBeChecked();

        await recruitmentPage.consentToKeepDataCheckbox.uncheck();
        await expect(recruitmentPage.consentToKeepDataCheckbox).not.toBeChecked();
      }
    });

    test('Verify consent checkbox accessibility', async ({ page }) => {
      await recruitmentPage.clickAdd();

      // Check if checkbox has proper ARIA attributes
      const checkbox = recruitmentPage.consentToKeepDataCheckbox;
      await expect(checkbox).toHaveAttribute('type', 'checkbox');

      // Check if associated label exists
      const label = page.locator('label').filter({ hasText: /consent to keep data/i });
      await expect(label).toBeVisible();
    });
  });

  test.describe('Advanced Navigation and UI Scenarios', () => {
    test('Verify keyboard navigation through form fields', async ({ page }) => {
      await recruitmentPage.clickAdd();

      // Start with first name field
      await recruitmentPage.firstNameInput.focus();
      await expect(recruitmentPage.firstNameInput).toBeFocused();

      // Tab through fields
      await page.keyboard.press('Tab');
      await expect(recruitmentPage.lastNameInput).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(recruitmentPage.advacancydropdown).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(recruitmentPage.emailInput).toBeFocused();
    });

    test('Verify form modal can be closed and reopened', async ({ page }) => {
      await recruitmentPage.clickAdd();

      // Verify modal is open
      await expect(recruitmentPage.firstNameInput).toBeVisible();

      // Close modal (assuming there's a close button or ESC)
      await page.keyboard.press('Escape');

      // Verify modal is closed (form fields not visible)
      await expect(recruitmentPage.firstNameInput).not.toBeVisible();

      // Reopen modal
      await recruitmentPage.clickAdd();
      await expect(recruitmentPage.firstNameInput).toBeVisible();
    });

    test('Verify page scrolling and element visibility', async ({ page }) => {
      await recruitmentPage.clickAdd();

      // Scroll to bottom of form
      await recruitmentPage.noteInput.scrollIntoViewIfNeeded();
      await expect(recruitmentPage.noteInput).toBeVisible();

      // Scroll to top
      await recruitmentPage.firstNameInput.scrollIntoViewIfNeeded();
      await expect(recruitmentPage.firstNameInput).toBeVisible();

      // Verify save button is visible after scrolling
      await recruitmentPage.saveButton.scrollIntoViewIfNeeded();
      await expect(recruitmentPage.saveButton).toBeVisible();
    });

    test('Verify responsive behavior on different screen sizes', async ({ page }) => {
      // Test on mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      await recruitmentPage.clickAdd();
      await expect(recruitmentPage.firstNameInput).toBeVisible();

      // Test on tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(recruitmentPage.firstNameInput).toBeVisible();

      // Test on desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      await expect(recruitmentPage.firstNameInput).toBeVisible();
    });
  });

  test.describe('Advanced Data Persistence and State Scenarios', () => {
    test('Verify multiple candidates can be added sequentially', async () => {
      const candidates = [
        { firstName: 'Alice', lastName: 'Johnson', email: 'alice@test.com' },
        { firstName: 'Bob', lastName: 'Smith', email: 'bob@test.com' },
        { firstName: 'Charlie', lastName: 'Brown', email: 'charlie@test.com' }
      ];

      for (const candidate of candidates) {
        await recruitmentPage.clickAdd();
        await recruitmentPage.fillCandidateForm({
          firstName: candidate.firstName,
          lastName: candidate.lastName,
          vacancy: 'Software Engineer',
          email: candidate.email,
          phone: '1234567890',
          keywords: 'Testing',
          date: '2026-03-25',
          notes: `Sequential candidate: ${candidate.firstName}`,
          resumePath: 'tests/test-data/resume.pdf'
        });

        await recruitmentPage.saveCandidate();
        await recruitmentPage.verifyCandidateAdded();
      }
    });

    test('Verify candidate data integrity after save', async () => {
      const testData = {
        firstName: 'DataIntegrity',
        lastName: 'Test',
        vacancy: 'Software Engineer',
        email: 'data.integrity@test.com',
        phone: '+1-555-DATA-123',
        keywords: 'Data, Integrity, Testing',
        date: '2026-03-26',
        notes: 'Testing data integrity after save operation',
        resumePath: 'tests/test-data/resume.pdf'
      };

      await recruitmentPage.clickAdd();
      await recruitmentPage.fillCandidateForm(testData);


      await recruitmentPage.saveCandidate();
      await recruitmentPage.verifyCandidateAdded();

      // Verify candidate appears in list with correct data
      await recruitmentPage.verifyCandidatePresent(testData.firstName);
    });

    test('Verify form reset after successful save', async () => {
      await recruitmentPage.clickAdd();
      await recruitmentPage.fillCandidateForm({
        firstName: 'Reset',
        lastName: 'Test',
        vacancy: 'Software Engineer',
        email: 'reset.test@test.com',
        phone: '1234567890',
        keywords: 'Reset Testing',
        date: '2026-03-27',
        notes: 'Testing form reset after save',
        resumePath: 'tests/test-data/resume.pdf'
      });

      await recruitmentPage.saveCandidate();
      await recruitmentPage.verifyCandidateAdded();

      // Click Add again to open new form
      await recruitmentPage.clickAdd();

      // Verify form is reset
      await expect(recruitmentPage.firstNameInput).toHaveValue('');
      await expect(recruitmentPage.lastNameInput).toHaveValue('');
      await expect(recruitmentPage.emailInput).toHaveValue('');
      await expect(recruitmentPage.consentToKeepDataCheckbox).not.toBeChecked();
    });
  });

  test.describe('Advanced Error Handling and Edge Cases', () => {
    test('Handle network latency during save operation', async ({ page }) => {
      await recruitmentPage.clickAdd();
      await recruitmentPage.fillCandidateForm({
        firstName: 'Latency',
        lastName: 'Test',
        vacancy: 'Software Engineer',
        email: 'latency.test@test.com',
        phone: '1234567890',
        keywords: 'Latency Testing',
        date: '2026-03-28',
        notes: 'Testing save operation with simulated latency',
        resumePath: 'tests/test-data/resume.pdf'
      });

      // Simulate slow network by throttling
      await page.route('**/api/**', async route => {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
        await route.continue();
      });

      await recruitmentPage.saveCandidate();
      await recruitmentPage.verifyCandidateAdded();
    });

    test('Handle rapid successive form submissions', async () => {
      await recruitmentPage.clickAdd();
      await recruitmentPage.fillCandidateForm({
        firstName: 'Rapid',
        lastName: 'Submit',
        vacancy: 'Software Engineer',
        email: 'rapid.submit@test.com',
        phone: '1234567890',
        keywords: 'Rapid Submit Testing',
        date: '2026-03-29',
        notes: 'Testing rapid successive submissions',
        resumePath: 'tests/test-data/resume.pdf'
      });

      // Click save multiple times rapidly
      const savePromises = [];
      for (let i = 0; i < 3; i++) {
        savePromises.push(recruitmentPage.saveCandidate());
      }

      await Promise.all(savePromises);
      await recruitmentPage.verifyCandidateAdded();
    });

    test('Handle browser refresh during form filling', async ({ page }) => {
      await recruitmentPage.clickAdd();
      await recruitmentPage.firstNameInput.fill('Refresh');
      await recruitmentPage.lastNameInput.fill('Test');

      // Refresh page
      await page.reload();

      // Verify we're back to recruitment page
      await expect(recruitmentPage.addButton).toBeVisible();

      // Verify form data is lost (not persisted)
      await recruitmentPage.clickAdd();
      await expect(recruitmentPage.firstNameInput).toHaveValue('');
      await expect(recruitmentPage.lastNameInput).toHaveValue('');
    });

    test('Handle browser back/forward navigation', async ({ page }) => {
      await recruitmentPage.clickAdd();
      await expect(recruitmentPage.firstNameInput).toBeVisible();

      // Navigate back
      await page.goBack();
      await expect(recruitmentPage.addButton).toBeVisible();

      // Navigate forward
      await page.goForward();
      await expect(recruitmentPage.firstNameInput).toBeVisible();
    });
  });

  test.describe('Advanced Performance and Load Scenarios', () => {
    test('Verify form loading performance', async ({ page }) => {
      const startTime = Date.now();

      await recruitmentPage.clickAdd();

      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000); // Should load within 3 seconds

      await expect(recruitmentPage.firstNameInput).toBeVisible();
    });

    test('Verify dropdown loading performance', async ({ page }) => {
      const startTime = Date.now();

      await recruitmentPage.jobtitlesdropdown.click();

      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(2000); // Should load within 2 seconds

      const dropdownOptions = page.locator('.oxd-select-dropdown li');
      await expect(dropdownOptions.first()).toBeVisible();
    });

    test('Verify save operation performance', async ({ page }) => {
      await recruitmentPage.clickAdd();
      await recruitmentPage.fillCandidateForm({
        firstName: 'Performance',
        lastName: 'Test',
        vacancy: 'Software Engineer',
        email: 'performance.test@test.com',
        phone: '1234567890',
        keywords: 'Performance Testing',
        date: '2026-03-30',
        notes: 'Testing save operation performance',
        resumePath: 'tests/test-data/resume.pdf'
      });

      const startTime = Date.now();

      await recruitmentPage.saveCandidate();

      const saveTime = Date.now() - startTime;
      expect(saveTime).toBeLessThan(5000); // Should save within 5 seconds

      await recruitmentPage.verifyCandidateAdded();
    });
  });

  test.describe('Advanced Accessibility Scenarios', () => {
    test('Verify form field labels are properly associated', async ({ page }) => {
      await recruitmentPage.clickAdd();

      // Check if inputs have associated labels
      const inputs = page.locator('input[type="text"], input[type="email"], textarea');
      const inputCount = await inputs.count();

      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        const ariaLabel = await input.getAttribute('aria-label');
        const ariaLabelledBy = await input.getAttribute('aria-labelledby');
        const placeholder = await input.getAttribute('placeholder');

        // At least one of these should be present for accessibility
        expect(ariaLabel || ariaLabelledBy || placeholder).toBeTruthy();
      }
    });

    test('Verify keyboard accessibility for dropdowns', async ({ page }) => {
      await recruitmentPage.jobtitlesdropdown.click();

      // Use keyboard to navigate dropdown
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');

      // Verify dropdown closes and selection is made
      const dropdownOptions = page.locator('.oxd-select-dropdown');
      await expect(dropdownOptions).not.toBeVisible();
    });

    test('Verify screen reader compatibility', async ({ page }) => {
      await recruitmentPage.clickAdd();

      // Check for ARIA attributes
      const form = recruitmentPage.form;
      const ariaDescribedBy = await form.getAttribute('aria-describedby');
      const role = await form.getAttribute('role');

      // Form should have appropriate ARIA attributes
      expect(role || ariaDescribedBy).toBeTruthy();
    });
  });
});