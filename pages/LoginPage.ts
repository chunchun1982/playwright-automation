import { Page ,Locator } from '@playwright/test';

export class LoginPage {

  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByRole('textbox', { name: /username/i });
    this.password = page.getByRole('textbox', { name: /password/i });
    this.loginButton = page.getByRole('button', { name: /login/i });
    
  }

  // Methods
  async goto() {
    await this.page.goto('/');
  }

  async login(user: string, pass: string) {
// testing
    //await this.username.waitFor({ state: 'visible' });
    await this.username.fill('');   // clear first
    await this.username.fill(user);
    await this.password.fill('');
    await this.password.fill(pass);
    await this.loginButton.click();
    
  }

  get errorMessage() {
    return this.page.locator('.error-message');
  }


}