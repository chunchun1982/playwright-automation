/**
 * Test data for OrangeHRM login automation suite.
 * All credentials and expected outcomes are centralised here.
 * Spec files must import from this file and must NOT hard-code
 * username or password strings inline (Requirement 10.2).
 */

export interface ExpectedResult {
  outcome: 'success' | 'failure';
  expectedMessage: string;
}

export interface LoginScenario {
  description: string;
  username: string;
  password: string;
  expectedResult: ExpectedResult;
}

/**
 * Exactly 5 scenarios covering Requirements 10.1 and 10.3:
 * 1. Valid credentials  → success
 * 2. Invalid username   → failure ("Invalid credentials")
 * 3. Invalid password   → failure ("Invalid credentials")
 * 4. Empty username     → failure ("Required")
 * 5. Empty password     → failure ("Required")
 */
export const loginScenarios: LoginScenario[] = [
  {
    description: 'Valid credentials',
    username: 'Admin',
    password: 'admin123',
    expectedResult: {
      outcome: 'success',
      expectedMessage: 'Dashboard',
    },
  },
  {
    description: 'Invalid username',
    username: 'NonExistentUser99',
    password: 'admin123',
    expectedResult: {
      outcome: 'failure',
      expectedMessage: 'Invalid credentials',
    },
  },
  {
    description: 'Invalid password',
    username: 'Admin',
    password: 'wrongpassword',
    expectedResult: {
      outcome: 'failure',
      expectedMessage: 'Invalid credentials',
    },
  },
  {
    description: 'Empty username',
    username: '',
    password: 'admin123',
    expectedResult: {
      outcome: 'failure',
      expectedMessage: 'Required',
    },
  },
  {
    description: 'Empty password',
    username: 'Admin',
    password: '',
    expectedResult: {
      outcome: 'failure',
      expectedMessage: 'Required',
    },
  },
];
