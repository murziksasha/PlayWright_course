import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { Navigation } from './Navigation';

export class ProductPage {
  private page: Page;
  private addToCartButtons: Locator;
  private sortDropdown: Locator;
  private productTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtons = page.locator(
      `[data-qa="product-button"]`
    );
    this.sortDropdown = page.locator(`[data-qa="sort-dropdown"]`);
    this.productTitle = page.locator(`[data-qa="product-title"]`);
  }

  visit = async (): Promise<void> => {
    await this.page.goto('/');
  };

  productToBusket = async (index: number): Promise<void> => {
    const navigation = new Navigation(this.page);
    const addToCartButton = this.addToCartButtons.nth(index);
    await addToCartButton.waitFor();
    await expect(addToCartButton).toHaveText('Add to Basket');
    const basketCountBeforeAdding = await navigation.getBasketCount();
    await addToCartButton.click();
    await expect(addToCartButton).toHaveText('Remove from Basket');
    const basketCountAfterAdding = await navigation.getBasketCount();
    expect(basketCountAfterAdding).toBeGreaterThan(
      basketCountBeforeAdding
    );
  };

  sortByCheapest = async (): Promise<void> => {
    await this.sortDropdown.waitFor();
    //get order of products before sorting
    const productTitlesBeforeSorting = await this.productTitle.allTextContents();
    await this.sortDropdown.selectOption("price-asc");
    //get order of products after sorting
    const productTitlesAfterSorting = await this.productTitle.allTextContents();
    expect(productTitlesBeforeSorting).not.toEqual(productTitlesAfterSorting);
  };


}
