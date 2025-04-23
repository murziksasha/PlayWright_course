import { Page, Locator, expect } from '@playwright/test';

export class SignUp {
  private page: Page;
  private signUpButton: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = this.page.locator('[data-qa="go-to-signup-button"]'); 
    this.emailInput = this.page.getByRole('textbox', { name: 'E-Mail' });
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
    this.registerButton = this.page.getByRole('button', { name: 'Register' });

  }

  visitSignUp = async (): Promise<void> => {
    await this.page.goto('/signup');
    await this.page.waitForURL(/\/signup/, { timeout: 1000 });
    await this.page.waitForTimeout(1000);
  };

  moveToSignUp = async (): Promise<void> => {
    await this.signUpButton.waitFor({ state: 'visible' });
    await this.signUpButton.click();
    await this.page.waitForURL(/\/signup/, { timeout: 3000 });
  }

  signUpAsNewUser = async (email: string, password: string): Promise<void> => {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email)
    await this.passwordInput.waitFor({ state: 'visible' }); 
    await this.passwordInput.fill(password)
    await this.registerButton.click();
  }

 

}
