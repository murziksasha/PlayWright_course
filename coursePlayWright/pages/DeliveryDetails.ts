import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { Navigation } from './Navigation';

export class DeliveryDetails {
  private page: Page;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private streetInput: Locator;
  private postcodeInput: Locator;
  private cityInput: Locator;
  private countryInput: Locator;
  private saveAddressButton: Locator;
  private continueToPaymentSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByRole('textbox', { name: 'First name' })
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
    this.streetInput = page.getByRole('textbox', { name: 'Street' })
    this.postcodeInput = page.getByRole('textbox', { name: 'Post code' });
    this.cityInput = page.getByRole('textbox', { name: 'City' });
    this.countryInput = page.getByRole('combobox', { name: 'Country' });
    this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' });
    this.continueToPaymentSelect = page.getByRole('button', { name: 'Continue to payment' });
  }

  fillAddressForm = async (firstName: string, lastName: string, street: string, postcode: string, city: string, country: string): Promise<void> => {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.streetInput.fill(street);
    await this.postcodeInput.fill(postcode);
    await this.cityInput.fill(city);
    await this.countryInput.selectOption({ label: country });
  }

  saveAddress = async (): Promise<void> => {
    await this.saveAddressButton.click();
    const navigation = new Navigation(this.page);
    const basketCountBeforeAdding = await navigation.getBasketCount();
    await this.continueToPaymentSelect.click();
    const basketCountAfterAdding = await navigation.getBasketCount();
    expect(basketCountAfterAdding).toBeGreaterThan(
      basketCountBeforeAdding
    );
  }

    continueToPayment = async (): Promise<void> => {
      await this.continueToPaymentSelect.click();
    }

}
