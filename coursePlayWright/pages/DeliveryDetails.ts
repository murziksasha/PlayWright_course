import { Page, Locator } from 'playwright';
import {IUserAddressData} from '../data/userAddressData';


export class DeliveryDetails {
  private page: Page;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private streetInput: Locator;
  private postcodeInput: Locator;
  private cityInput: Locator;
  private countryInput: Locator;

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
  }

  fillAddressForm = async ({firstName, lastName, street, postcode, city, country}: IUserAddressData): Promise<void> => {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.streetInput.fill(street);
    await this.postcodeInput.fill(postcode);
    await this.cityInput.fill(city);
    await this.countryInput.selectOption(country);
  };
}
