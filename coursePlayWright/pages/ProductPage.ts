import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';

export class ProductPage {
  private page: Page;
  private addToCartButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtons = page.locator(
      `[data-qa="product-button"]`
    );
  }

  visit = async (): Promise<void> => {
    await this.page.goto('/');
  };

  productToBusket = async (index: number): Promise<void> => {
    const addToCartButton = this.addToCartButtons.nth(index);

    await addToCartButton.waitFor();
    await expect(addToCartButton).toHaveText(
      'Add to Basket'
    );
    await addToCartButton.click();
    await expect(addToCartButton).toHaveText(
      'Remove from Basket'
    );
  };
}
