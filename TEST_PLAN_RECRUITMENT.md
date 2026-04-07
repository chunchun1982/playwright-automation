# Test Plan: Recruitment Module

## 1. Overview

This document outlines the comprehensive test plan for the OrangeHRM Recruitment module. The test plan covers functional testing, validation testing, navigation testing, and edge case scenarios using Playwright with Page Object Model (POM) pattern.

---

## 2. Test Objectives

- Verify all recruitment module features function as designed
- Validate data input and form submission workflows
- Ensure proper navigation and UI element visibility
- Test search, filter, and candidate management operations
- Validate success/failure message displays
- Verify data persistence across sessions
- Test edge cases and boundary conditions

---

## 3. Scope

### In Scope:
- ✅ Recruitment module navigation
- ✅ Candidate search and filtering
- ✅ Add/Edit candidate functionality
- ✅ Form validation and data entry
- ✅ Dropdown selections and multi-criteria filtering
- ✅ Success/Error toast notifications
- ✅ Consent checkbox validation
- ✅ Resume file upload functionality
- ✅ Candidate verification in list

### Out of Scope:
- ❌ Back-end API testing
- ❌ Database validation
- ❌ Performance/Load testing
- ❌ Security testing
- ❌ Mobile app testing
- ❌ Third-party integrations

---

## 4. Test Environment

| Aspect | Details |
|--------|---------|
| **Browser** | Chrome, Firefox, Edge (Headed mode) |
| **OS** | Windows, macOS, Linux |
| **Framework** | Playwright with TypeScript |
| **Base URL** | OrangeHRM Recruitment Module |
| **Test Data** | Resume PDF: `tests/test-data/resume.pdf` |
| **Credentials** | Admin / admin123 |

---

## 5. Test Scenarios

### 5.1 Search and Filter Tests

| Test ID | Scenario | Steps | Expected Result |
|---------|----------|-------|-----------------|
| REC-001 | Search by Job Title | 1. Navigate to Recruitment<br>2. Select Job Title from dropdown | Job Title filter applied successfully |
| REC-002 | Filter by Vacancy | 1. Open Recruitment module<br>2. Select Vacancy from dropdown | Vacancy filter applied |
| REC-003 | Filter by Hiring Manager | 1. Click Recruitment<br>2. Select Hiring Manager | Hiring Manager filter applied |
| REC-004 | Filter by Status | 1. Navigate to Recruitment<br>2. Select Status dropdown | Status filter shows correct values |
| REC-005 | Multi-criteria Filter | 1. Apply Job Title + Vacancy + Status | All filters applied simultaneously |
| REC-006 | Search by Candidate Name | 1. Enter candidate name<br>2. Verify suggestions appear | Auto-suggestions loaded |
| REC-007 | Search by Keywords | 1. Enter comma-separated keywords<br>2. Click search | Keywords filter applied |
| REC-008 | Filter by Date Range | 1. Enter From date: 2026-01-01<br>2. Enter To date: 2026-12-31 | Date range filter applied |
| REC-009 | Filter by Method of Application | 1. Select "Online" from dropdown | Method filter applied |
| REC-010 | Clear Candidate Name | 1. Enter candidate name<br>2. Clear field | Field returns to empty state |

### 5.2 Add Candidate Tests

| Test ID | Scenario | Steps | Expected Result |
|---------|----------|-------|-----------------|
| REC-011 | Add Valid Candidate | 1. Click Add button<br>2. Fill all fields<br>3. Check consent<br>4. Save | Success toast displayed, candidate in list |
| REC-012 | Add with Minimum Data | 1. Click Add<br>2. Fill First Name, Last Name, Vacancy, Email<br>3. Check consent<br>4. Save | Candidate saved successfully |
| REC-013 | Add with Special Characters | 1. Enter "O'Brien" as First Name<br>2. Enter "Murphy-Brown" as Last Name<br>3. Save | Special characters accepted |
| REC-014 | Add with Long Text | 1. Add comprehensive notes (500+ chars)<br>2. Save | Long text saved without truncation |
| REC-015 | Add with Multiple Keywords | 1. Enter "Java, Python, JavaScript, React"<br>2. Save | All keywords saved |
| REC-016 | Add with International Phone | 1. Enter "+49-123-456789"<br>2. Save | International format accepted |
| REC-017 | Add with Numeric in Names | 1. Enter "John123" and "Doe456"<br>2. Save | Numeric values accepted |
| REC-018 | Resume Upload | 1. Click file upload field<br>2. Select resume.pdf<br>3. Verify upload | File uploaded successfully |
| REC-019 | Upload Multiple Times | 1. Upload file<br>2. Upload different file | Latest file replaces previous |
| REC-020 | Add Same Candidate Twice | 1. Add candidate A<br>2. Add different candidate B (different email)<br>3. Save both | Both candidates added (no duplicate prevention shown) |

### 5.3 Form Field Validation Tests

| Test ID | Scenario | Steps | Expected Result |
|---------|----------|-------|-----------------|
| REC-021 | First Name Field | 1. Click Add<br>2. Enter "Robert"<br>3. Verify value | First Name field accepts input |
| REC-022 | Last Name Field | 1. Click Add<br>2. Enter "Williams"<br>3. Verify value | Last Name field accepts input |
| REC-023 | Email Validation | 1. Enter "test@example.com"<br>2. Verify field value | Valid email accepted |
| REC-024 | Contact Number Empty Initially | 1. Click Add<br>2. Check Contact Number field | Field is empty |
| REC-025 | Contact Number Entry | 1. Click Add<br>2. Enter "9876543210"<br>3. Verify value | Contact number accepted |
| REC-026 | Keywords Field | 1. Enter "Automation, Testing"<br>2. Verify value | Comma-separated values accepted |
| REC-027 | Date of Application | 1. Enter "2026-03-21"<br>2. Verify field | Date format accepted |
| REC-028 | Notes Textarea | 1. Enter multi-line notes<br>2. Verify submission | Notes saved with line breaks |
| REC-029 | Vacancy Dropdown | 1. Click dropdown<br>2. Select "Software Engineer" | Vacancy option selected |
| REC-030 | Consent Checkbox Visibility | 1. Click Add<br>2. Verify checkbox present | Checkbox visible and enabled |

### 5.4 Consent Checkbox Tests

| Test ID | Scenario | Steps | Expected Result |
|---------|----------|-------|-----------------|
| REC-031 | Checkbox Initially Unchecked | 1. Open Add Candidate form | Checkbox is unchecked |
| REC-032 | Check Consent Checkbox | 1. Click checkbox<br>2. Verify status | Checkbox is checked |
| REC-033 | Uncheck Consent Checkbox | 1. Check checkbox<br>2. Uncheck it | Checkbox returns to unchecked |
| REC-034 | Checkbox State Persistence | 1. Check checkbox<br>2. Fill form fields<br>3. Verify checkbox still checked | State maintained while filling form |

### 5.5 Navigation Tests

| Test ID | Scenario | Steps | Expected Result |
|---------|----------|-------|-----------------|
| REC-035 | Access Recruitment Module | 1. Login<br>2. Click Recruitment link | Recruitment page loads |
| REC-036 | Navigate to Candidates Tab | 1. Open Recruitment<br>2. Click Candidates link | Candidates tab displays |
| REC-037 | Open Add Candidate Form | 1. Click Add button | Candidate form modal opens |
| REC-038 | All Form Fields Visible | 1. Click Add<br>2. Verify all fields present | All 10+ fields visible in form |
| REC-039 | Save Button Visible | 1. Click Add<br>2. Scroll to bottom | Save button visible and clickable |
| REC-040 | UI Elements Accessible | 1. Navigate Recruitment<br>2. Verify all dropdowns clickable | All interactive elements responsive |

### 5.6 Success/Error Message Tests

| Test ID | Scenario | Steps | Expected Result |
|---------|----------|-------|-----------------|
| REC-041 | Success Toast Display | 1. Add candidate with valid data<br>2. Save | Success toast appears with message |
| REC-042 | Toast Auto-dismiss | 1. Display success toast<br>2. Wait 5 seconds | Toast auto-dismisses |
| REC-043 | Success Toast Visibility | 1. Save candidate<br>2. Verify toast is visible | Toast has `.oxd-toast--success` class |

### 5.7 Data Persistence Tests

| Test ID | Scenario | Steps | Expected Result |
|---------|----------|-------|-----------------|
| REC-044 | Candidate Appears in List | 1. Add candidate "David"<br>2. Save<br>3. Search for "David" | Candidate appears in candidate list |
| REC-045 | Multiple Candidates Listed | 1. Add 3 different candidates<br>2. Apply no filters | All 3 candidates visible |
| REC-046 | Filter Shows Added Candidate | 1. Add candidate with status "Shortlisted"<br>2. Filter by "Shortlisted" | Candidate appears in filtered results |
| REC-047 | Candidate Details Persist | 1. Add candidate with specific data<br>2. Search for candidate<br>3. Verify details | All entered data matches displayed data |

### 5.8 Edge Case Tests

| Test ID | Scenario | Steps | Expected Result |
|---------|----------|-------|-----------------|
| REC-048 | Single Letter Name | 1. Enter "A" as First Name, "B" as Last Name<br>2. Save | Single letter names accepted |
| REC-049 | Maximum Length Input | 1. Fill fields with max characters<br>2. Save | Form accepts maximum input |
| REC-050 | Empty Required Fields Skip | 1. Leave First Name empty<br>2. Try to save | Form shows validation error or prevents save |
| REC-051 | Special Email Formats | 1. Enter "john+test@example.com"<br>2. Save | Email with + sign accepted |
| REC-052 | Whitespace in Keywords | 1. Enter "Java , Python , JavaScript"<br>2. Save | Whitespace handled correctly |
| REC-053 | Empty Dropdown Selection | 1. Click Add<br>2. Try save without selecting Vacancy | Validation error or warning displayed |
| REC-054 | Date Edge Cases | 1. Enter "2026-01-01" (start of year)<br>2. Enter "2026-12-31" (end of year)<br>3. Save | Both date boundaries accepted |
| REC-055 | Rapid Form Submissions | 1. Fill form<br>2. Click Save multiple times rapidly | Only one candidate created (idempotency) |

### 5.9 Dropdown Interaction Tests

| Test ID | Scenario | Steps | Expected Result |
|---------|----------|-------|-----------------|
| REC-056 | Dropdown Opens on Click | 1. Click Job Title dropdown | Options list appears |
| REC-057 | Select Dropdown Option | 1. Click dropdown<br>2. Click "QA Engineer" | Option selected and dropdown closes |
| REC-058 | Keyboard Navigation in Dropdown | 1. Click dropdown<br>2. Press arrow keys<br>3. Press Enter | Option selected via keyboard |
| REC-059 | Search Within Dropdown | 1. Click dropdown<br>2. Type to filter options | Matching options filtered |
| REC-060 | Multiple Dropdowns Independent | 1. Select Job Title<br>2. Select Vacancy<br>3. Change Job Title | Vacancy selection remains unchanged |

### 5.10 Responsive Behavior Tests

| Test ID | Scenario | Steps | Expected Result |
|---------|----------|-------|-----------------|
| REC-061 | Scroll to View Options | 1. Open large dropdown | Options scrollable if list too long |
| REC-062 | Long Text Wrapping | 1. Add candidate with 200+ char notes<br>2. Verify display | Text wraps without breaking layout |
| REC-063 | Form Modal Scrolling | 1. Click Add<br>2. Scroll within modal | All fields accessible by scrolling |

---

## 6. Test Data Requirements

### 6.1 Valid Test Data

```json
{
  "candidate_1": {
    "firstName": "John",
    "lastName": "Doe",
    "vacancy": "Software Engineer",
    "email": "john.doe@test.com",
    "phone": "1234567890",
    "keywords": "Java, Python, Testing",
    "date": "2026-03-20",
    "notes": "Strong technical background"
  },
  "candidate_2": {
    "firstName": "Sarah",
    "lastName": "Smith",
    "vacancy": "QA Engineer",
    "email": "sarah.smith@test.com",
    "phone": "9876543210",
    "keywords": "Automation, Selenium, Playwright",
    "date": "2026-03-21",
    "notes": "5+ years QA experience"
  },
  "credentials": {
    "username": "Admin",
    "password": "admin123"
  },
  "resume_file": "tests/test-data/resume.pdf"
}
```

### 6.2 Invalid Test Data

```json
{
  "invalid_email": "invalid-email",
  "empty_string": "",
  "special_chars_only": "!@#$%^&*()",
  "max_length_exceeded": "a".repeat(1000),
  "sql_injection": "' OR '1'='1",
  "xss_payload": "<script>alert('xss')</script>"
}
```

---

## 7. Test Execution Strategy

### 7.1 Test Execution Flow

```
1. Setup Phase
   ├── Launch Browser (Chrome)
   ├── Navigate to Application
   └── Login with Admin Credentials

2. Search & Filter Tests (REC-001 to REC-010)
   ├── Test individual filters
   ├── Test multi-criteria filters
   └── Verify filter combinations

3. Add Candidate Tests (REC-011 to REC-020)
   ├── Test valid candidate creation
   ├── Test edge cases
   └── Verify data persistence

4. Form Validation Tests (REC-021 to REC-034)
   ├── Validate form fields
   ├── Test consent checkbox
   └── Verify field interactions

5. Navigation Tests (REC-035 to REC-040)
   ├── Verify module navigation
   ├── Check UI element visibility
   └── Test form accessibility

6. Success/Error Tests (REC-041 to REC-043)
   ├── Verify success messages
   ├── Test error handling
   └── Validate message timing

7. Cleanup Phase
   ├── Logout
   └── Close Browser
```

### 7.2 Test Execution Schedule

| Phase | Duration | Status |
|-------|----------|--------|
| Test Plan Review | 1 day | Pending |
| Test Automation | 5 days | In Progress |
| Test Execution (Smoke) | 1 day | Pending |
| Test Execution (Full) | 2 days | Pending |
| Bug Fix & Retesting | 2 days | Pending |
| Report & Sign-off | 1 day | Pending |

### 7.3 Test Execution Commands

```bash
# Run all recruitment tests
npx playwright test tests/Recruitmentpages.spec.ts

# Run specific test category
npx playwright test tests/Recruitmentpages.spec.ts -g "Search and Filter"

# Run with detailed reporting
npx playwright test tests/Recruitmentpages.spec.ts --reporter=html

# Run in headed mode for debugging
npx playwright test tests/Recruitmentpages.spec.ts --headed

# Run with video recording
npx playwright test tests/Recruitmentpages.spec.ts --video=on

# Run with trace debugging
npx playwright test tests/Recruitmentpages.spec.ts --trace=on
```

---

## 8. Success Criteria

- ✅ 95%+ test pass rate
- ✅ All critical path tests pass (Add Candidate, Search, Save)
- ✅ All form validations working correctly
- ✅ Success messages display properly
- ✅ Data persists across sessions
- ✅ No JavaScript errors in browser console
- ✅ Response time < 3 seconds per action
- ✅ All edge cases handled gracefully

---

## 9. Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Dropdown timing issues | High | Add explicit wait before dropdown click |
| File upload failures | High | Mock file upload in test data |
| Toast message timing | Medium | Add visibility wait before assertion |
| Locator brittleness | Medium | Use role-based selectors instead of CSS |
| Test data conflicts | Medium | Use unique timestamps for test data |
| Network latency | Low | Add appropriate timeout values |
| Browser compatibility | Low | Test in multiple browsers |

---

## 10. Assumptions & Dependencies

### Assumptions:
- OrangeHRM application is deployed and accessible
- Admin credentials are valid and unchanged
- Test data directory exists with required files
- Browsers are installed and up-to-date
- JavaScript is enabled in browser

### Dependencies:
- Playwright 1.40+
- Node.js 18+
- TypeScript 5.0+
- test-data/resume.pdf file exists
- OrangeHRM database is populated with test data

---

## 11. Defect Reporting

### Defect Template

```
Title: [Component] - [Brief Description]
Priority: [Critical/High/Medium/Low]
Severity: [Blocker/Major/Minor/Trivial]

Environment:
- Browser: 
- OS: 
- Test ID: 

Steps to Reproduce:
1. 
2. 
3. 

Expected Result:
[What should happen]

Actual Result:
[What actually happened]

Screenshots/Videos:
[Attachment if available]

Test Script:
[Reference to test file and line number]
```

---

## 12. Sign-off & Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| QA Lead | [Name] | [Date] | [Sign] |
| Dev Lead | [Name] | [Date] | [Sign] |
| Product Owner | [Name] | [Date] | [Sign] |

---

## 13. Appendix

### A. Page Object Model Reference
- [RecruitmentPage.ts](pages/Recruitmentpages.ts) - Main page object
- [LoginPage.ts](pages/LoginPage.ts) - Authentication page object

### B. Test Data Files
- `tests/test-data/resume.pdf` - Sample resume for upload testing

### C. Reporting Tools
- Playwright HTML Reporter
- Allure Reports (if configured)
- Video recordings in `test-results/`

### D. Browser DevTools Commands

```javascript
// Inspect dropdown options
document.querySelectorAll('.oxd-select-dropdown li')

// Verify toast visibility
document.querySelector('.oxd-toast--success')

// Check form field values
document.querySelector('input[name="firstName"]').value
```

---

**Document Version:** 1.0  
**Last Updated:** March 24, 2026  
**Next Review Date:** [To be scheduled]
