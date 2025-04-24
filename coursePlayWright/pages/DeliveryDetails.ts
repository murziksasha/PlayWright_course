import { Page, Locator } from 'playwright';
import {IUserAddressData} from '../data/userAddressData';
import { expect } from '@playwright/test';


export class DeliveryDetails {
  private page: Page;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private streetInput: Locator;
  private postcodeInput: Locator;
  private cityInput: Locator;
  private countryInput: Locator;
  private saveAddressButton: Locator;
  private userAddressBlock: Locator;
  private continuePaymentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByRole('textbox', {
      name: 'First name',
    });
    this.lastNameInput = page.getByRole('textbox', {
      name: 'Last name',
    });
    this.streetInput = page.getByRole('textbox', { name: 'Street' });
    this.postcodeInput = page.getByRole('textbox', {
      name: 'Post code',
    });
    this.cityInput = page.getByRole('textbox', { name: 'City' });
    this.countryInput = page.locator('[data-qa="country-dropdown"]');
    this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' });
    this.userAddressBlock = page.locator('[data-qa="saved-address-container"]');
    this.continuePaymentButton = page.getByRole('button', { name: 'Continue to payment' })
  }


  fillAddressForm = async ({firstName, lastName, street, postcode, city, country}: IUserAddressData): Promise<void> => {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.waitFor({ state: 'visible' });
    await this.lastNameInput.fill(lastName);
    await this.streetInput.waitFor({ state: 'visible' });
    await this.streetInput.fill(street);
    await this.postcodeInput.waitFor({ state: 'visible' });
    await this.postcodeInput.fill(postcode);
    await this.cityInput.waitFor({ state: 'visible' });
    await this.cityInput.fill(city);
    await this.countryInput.waitFor({ state: 'visible' });
    await this.countryInput.selectOption(country);
  };



  saveDetails = async (): Promise<void> => {
    const addressCountBeforeSaving = await this.userAddressBlock.count();
    await this.saveAddressButton.waitFor({ state: 'visible' });
    await this.saveAddressButton.click();
    await expect(this.userAddressBlock).toHaveCount(addressCountBeforeSaving + 1);
  }

}
