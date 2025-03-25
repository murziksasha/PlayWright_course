import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';

export class ProductPage {
  private page: Page;
  private addToCartButtons: Locator;
  private basketCounter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtons = page.locator(
      `[data-qa="product-button"]`
    );
    this.basketCounter = page.locator(
      `[data-qa="header-basket-count"]`
    );
  }

  visit = async (): Promise<void> => {
    await this.page.goto('/');
  };

  productToBusket = async (index: number): Promise<void> => {
    const addToCartButton = this.addToCartButtons.nth(index);

    await addToCartButton.waitFor();
    await expect(addToCartButton).toHaveText('Add to Basket');
    const basketCountBeforeAdding = await this.getBasketCount();
    await addToCartButton.click();
    await expect(addToCartButton).toHaveText('Remove from Basket');
    const basketCountAfterAdding = await this.getBasketCount();
    expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
  };

  getBasketCount = async (): Promise<number> => {
    await this.basketCounter.waitFor();
    return parseInt(await this.basketCounter.innerText());
  };

}
