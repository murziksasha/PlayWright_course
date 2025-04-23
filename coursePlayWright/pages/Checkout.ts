import { Page, Locator, expect } from '@playwright/test';

export class Checkout {
  private page: Page;
  private basketItemPrice: Locator;
  private basketItemCards: Locator;
  private basketRemoveButton: Locator;
  private checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketItemCards = page.locator('[data-qa="basket-card"]');
    this.basketRemoveButton = page.locator('[data-qa="basket-card-remove-item"]');
    this.checkoutButton = page.locator('[data-qa="continue-to-checkout"]');

  }

  visit = async (): Promise<void> => {
    await this.page.goto('/basket');
    await this.page.waitForURL('/basket');
  };

  removeCheapestProduct = async (): Promise<void> => {
    await this.basketItemCards.first().waitFor();
    const itemsBeforeRemove = await this.basketItemCards.count();

    console.log('Items before remove: ', itemsBeforeRemove);

    const prices = await this.basketItemPrice.allTextContents();
    const priceClearWithoutSign = prices.map((price) => +price.replace('$', '').trim());
    const minPriceCardIndex = priceClearWithoutSign.indexOf(Math.min(...priceClearWithoutSign));
    const specificRemoveButton = this.basketRemoveButton.nth(minPriceCardIndex);
    await specificRemoveButton.waitFor();
    await specificRemoveButton.click();
    await this.page.waitForTimeout(1000);
    const itemsAfterRemove = await this.basketItemCards.count();

    console.log('Items after remove: ', itemsAfterRemove);

    expect(itemsAfterRemove).toBeLessThan(itemsBeforeRemove);
    expect(itemsAfterRemove).toEqual(itemsBeforeRemove - 1);

  }

  continuToCheckout = async (): Promise<void> => {
    await this.checkoutButton.waitFor();
    await this.checkoutButton.click();
  }

}
