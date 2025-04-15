import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
  private page: Page;
  private emailInput: Locator;
  private passwordInput: Locator;
  private registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = this.page.getByRole('textbox', { name: 'E-Mail' });
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
    this.registerButton = this.page.getByRole('button', { name: 'Register' });

  }

  signUpAsNewUser = async (): Promise<void> => {
    await this.page.pause();
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill('fishka')
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill('12345678');
    await this.registerButton.click();
    await this.page.pause();
    
  }
 

}
