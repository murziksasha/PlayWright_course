import { Page } from 'playwright';

export class ProductPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  visit = async (): Promise<void> => {
    await this.page.goto('/');
  }
}
