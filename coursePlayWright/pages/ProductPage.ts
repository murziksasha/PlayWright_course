
import { Page, Locator} from 'playwright';
import { expect } from '@playwright/test'; 

export class ProductPage {
  private page: Page;
  private addToCartButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtons = page.locator(`[data-qa="product-button"]`);
  }

  visit = async (): Promise<void> => {
    await this.page.goto('/');
  };

  productToBusket = async (index: number): Promise<void> => {

    await this.addToCartButtons.nth(index).waitFor();
    await expect(this.addToCartButtons)
    await this.addToCartButtons.nth(index).click();

  };
}
