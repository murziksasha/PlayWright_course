import { Page } from '@playwright/test';



export class MyAccountPage {
  private page: Page;


  constructor(page: Page) {
    this.page = page;


  }

  visit = async (): Promise<void> => {
    await this.page.goto('http://localhost:2221/login?redirect=/my-account');
    await this.page.waitForURL('**/my-account');
     
  };


}
