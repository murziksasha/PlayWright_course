import { Page, Locator, FrameLocator, expect } from '@playwright/test';
import { IPaymentsDetails } from '../data/paymentDetails';

export class PaymentPage {
  private page: Page;
  private iFrame: FrameLocator;
  private discountCodeInput: Locator;
  private applyDiscountButton: Locator;
  private discountCode: Locator;
  private discountActivatedText: Locator;
  private totalPrice: Locator;
  private totalPriceWithDiscount: Locator;
  private cardOwnerInput: Locator;
  private cardNumberInput: Locator;
  private validUntilInput: Locator;
  private cvcInput: Locator;
  private payButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Use FrameLocator to work with iframe contents
    this.iFrame = this.page.frameLocator('iframe[data-qa="active-discount-container"]');

    this.discountCodeInput = this.page.getByRole('textbox', { name: 'Discount code' });
    this.applyDiscountButton = this.page.getByRole('button', { name: 'Submit discount' });

    this.discountCode = this.iFrame.locator('[data-qa="discount-code"]');
    this.discountActivatedText = this.page.locator(`[data-qa="discount-active-message"]`);
    this.totalPrice = this.page.locator(`[data-qa="total-value"]`);
    this.totalPriceWithDiscount = this.page.locator(`[data-qa="total-with-discount-value"]`);

  this.cardOwnerInput = this.page.getByRole('textbox', { name: 'Credit card owner' });
  this.cardNumberInput = this.page.getByRole('textbox', { name: 'Credit card number' });
    this.validUntilInput = this.page.getByRole('textbox', { name: 'Valid until' });
    this.cvcInput = this.page.getByRole('textbox', { name: 'CVC' });
    this.payButton = this.page.getByRole('button', { name: 'Pay' });

  }

  async applyDiscountCode(): Promise<void> {
    await this.discountCode.waitFor({ state: 'visible' });
    const codeText = await this.discountCode.textContent();

    await this.discountCodeInput.waitFor({ state: 'visible' });


    const trimmedCodeText = codeText?.trim() || '';
    await this.discountCodeInput.focus()
    await this.page.keyboard.type(trimmedCodeText, {delay: 500});

    expect(await this.totalPriceWithDiscount.isVisible()).toBeFalsy();

    await this.applyDiscountButton.click();
    this.page.waitForTimeout(1000);
    expect (await this.discountActivatedText.textContent()).toBe('Discount activated!');
    expect(await this.totalPriceWithDiscount.isVisible()).toBeTruthy();
    const totalPriceText = await this.totalPrice.textContent();
    const totalPrice = +(totalPriceText ? totalPriceText.replace('$', '') : 0);
    const totalPriceWithDiscountText = await this.totalPriceWithDiscount.textContent();
    const totalPriceWithDiscount = +(totalPriceWithDiscountText ? totalPriceWithDiscountText.replace('$', '') : 0);

    expect(totalPriceWithDiscount).toBeLessThan(totalPrice);
  }

  async fillPaymentForm({ creditCardOwner, creditCardNumber, validUntil, creditCardCVC }: IPaymentsDetails): Promise<void> {
    await this.cardOwnerInput.waitFor({ state: 'visible' });
    await this.cardNumberInput.waitFor({ state: 'visible' });
    await this.validUntilInput.waitFor({ state: 'visible' });
    await this.cvcInput.waitFor({ state: 'visible' });
  
    await this.cardOwnerInput.fill(creditCardOwner);
    await this.cardNumberInput.fill(creditCardNumber.toString());
    await this.validUntilInput.fill(validUntil);
    await this.cvcInput.fill(creditCardCVC.toString());
  
  }

  async completePayment(): Promise<void> {
    await this.payButton.waitFor({ state: 'visible' });
  
    // Better: wait for navigation triggered by click
    await Promise.all([
      this.page.waitForURL('**/thank-you', { timeout: 3000 }), // Waits until URL changes
      this.payButton.click(), // Click triggers navigation
    ]);
  
    // Optionally you can verify success text on the Thank You page
    await expect(this.page).toHaveURL(/thank-you/);
    await expect(this.page.locator('h1')).toHaveText('Thank you for shopping with us!');
  }

  

}
