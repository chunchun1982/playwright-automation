import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.username    = page.getByRole('textbox', { name: /username/i });
    this.password    = page.getByRole('textbox', { name: /password/i });
    this.loginButton = page.getByRole('button',  { name: /login/i });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Fills credentials and submits the login form.
   * Waits for network to idle — handles both success (URL changes) and
   * failure (URL stays at /) cases without hard waits.
   */
  async login(user: string, pass: string): Promise<void> {
    await this.username.fill('');
    await this.username.fill(user);
    await this.password.fill('');
    await this.password.fill(pass);
    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      this.loginButton.click(),
    ]);
  }

  /**
   * Returns the locator for the "Invalid credentials" alert banner.
   * OrangeHRM renders this as a role="alert" element.
   */
  getAlertMessage(): Locator {
    return this.page.getByRole('alert');
  }

  /**
   * Returns the "Required" validation message locator for the given field.
   * Anchors to the field's oxd-form-row ancestor, then targets the
   * .oxd-text--span validation span within it.
   *
   * @param field - 'username' or 'password'
   */
  getValidationMessage(field: 'username' | 'password'): Locator {
    const inputLocator = field === 'username' ? this.username : this.password;
    return inputLocator
      .locator('xpath=ancestor::div[contains(@class,"oxd-form-row")]')
      .locator('.oxd-text--span');
  }

  /**
   * Alias for getAlertMessage() — backward compatibility.
   */
  getErrorMessage(): Locator {
    return this.getAlertMessage();
  }
}
