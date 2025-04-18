import { Page, Locator, expect } from '@playwright/test';
import {v4 as uuid} from 'uuid';

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

  signUpAsNewUser = async (email: string, password: string): Promise<void> => {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email)
    await this.passwordInput.waitFor({ state: 'visible' }); 
    await this.passwordInput.fill(password)
    await this.registerButton.click();
  }
 

}
