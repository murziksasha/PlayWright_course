import { Locator, Page } from '@playwright/test';
import { isDisplayMobile } from '../utils/isDisplayViewport';

// if (isDisplayMobile(this.page)) {
//   await this.burgerMenuMobile.waitFor();
//   await this.burgerMenuMobile.click();
// }

export class Navigation {
  private page: Page;
  private homeButton: Locator;
  private basketButton: Locator;
  private basketCounter: Locator;
  private checkoutLink: Locator;
  private burgerMenuMobile: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeButton = page.locator(`[data-qa="home-button"]`);
    this.basketButton = page.locator(`[data-qa="basket-button"]`);
    this.basketCounter = page.locator(
      `[data-qa="header-basket-count"]`
    );
    this.checkoutLink = page.getByRole('link', { name: 'Checkout' });
    this.burgerMenuMobile = page.locator(`[data-qa="burger-button"]`);
  }

  visit = async (): Promise<void> => {
    await this.page.goto('/');
  };

  getBasketCount = async (): Promise<number> => {
    await this.basketCounter.waitFor();
    return parseInt(await this.basketCounter.innerText());
  };

  goToHome = async (): Promise<void> => {
    await this.homeButton.waitFor();
    await this.homeButton.click();
  };

  goToBasket = async (): Promise<void> => {
    if (isDisplayMobile(this.page)) {
      await this.burgerMenuMobile.waitFor();
      await this.burgerMenuMobile.click();
    }
    await this.basketButton.waitFor();
    await this.basketButton.click();
  };

  goToCheckout = async (): Promise<void> => {
    if (isDisplayMobile(this.page)) {
      await this.burgerMenuMobile.waitFor();
      await this.burgerMenuMobile.click();
    }

    const checkoutLink = this.checkoutLink;
    await checkoutLink.waitFor();
    await checkoutLink.click();
    await this.page.waitForURL('/basket');
  };
}
