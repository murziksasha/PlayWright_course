import { Page, Locator, expect } from '@playwright/test';

export class SignUp {
  private page: Page;
  private signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = this.page.locator('[data-qa="go-to-signup-button"]'); 

  }

  visitSignUp = async (): Promise<void> => {
    await this.page.goto('/signup');
    await this.page.waitForURL(/\/signup/);
  };

  moveToSignUp = async (): Promise<void> => {
    await this.signUpButton.waitFor({ state: 'visible' });
    await this.signUpButton.click();
    await this.page.waitForURL(/\/signup/, { timeout: 3000 });
  }

 

}
