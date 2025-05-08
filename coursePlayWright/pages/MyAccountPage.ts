import { Page, Locator } from '@playwright/test';



export class MyAccountPage {
  private page: Page;
  private pageHeading: Locator;


  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.getByRole('heading', { name: 'My Account' });

  }

  visit = async (): Promise<void> => {
    await this.page.goto('http://localhost:2221/my-account');
  };

  waitForPageHeading = async (): Promise<void> => {
    await this.pageHeading.waitFor({ state: 'visible' });
  }


}
