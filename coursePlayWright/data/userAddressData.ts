export interface IUserAddressData {
  firstName: string;
  lastName: string;
  street: string;
  postcode: string;
  city: string;
  country: string;
}

export const userAddressData: IUserAddressData = {
  firstName: 'Sasha',
  // First name of the user
  lastName: 'Grygoriev',
  // Last name of the user
  street: 'Vitaliya Shuma',
  // Street address of the user
  postcode: '38002',
  // Postal code of the user
  city: 'Odessa',
  // City of the user
  country: 'Ukraine',
  // Country of the user
};
