import { Page, Locator } from '@playwright/test';

export class Checkout {
  private page: Page;
  private basketItemPrice: Locator;
  private basketItemCards: Locator;
  private basketRemoveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketItemCards = page.locator('[data-qa="basket-card"]');
    this.basketRemoveButton = page.locator('[data-qa="basket-card-remove-item"]');

  }

  visit = async (): Promise<void> => {
    await this.page.goto('/basket');
    await this.page.waitForURL('/basket');
  };

  removeCheapestProduct = async (): Promise<void> => {
    await this.basketItemCards.first().waitFor();
    await this.basketItemPrice.first().waitFor();
    const prices = await this.basketItemPrice.allTextContents();
    const priceClearWithoutSign = prices.map((price) => +price.replace('$', '').trim());
    const minPriceCardIndex = priceClearWithoutSign.indexOf(Math.min(...priceClearWithoutSign));
    await this.basketItemCards.nth(minPriceCardIndex).waitFor();


    await this.page.pause()
  }
}
