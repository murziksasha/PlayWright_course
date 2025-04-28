export interface IPaymentsDetails {
  creditCardOwner: string;
  creditCardNumber: number;
  validUntil: string;
  creditCardCVC: number;
}

export const paymentsDetails: IPaymentsDetails = {
  creditCardOwner: 'Sasha Testovich',
  creditCardNumber: 12345678901234567,
  validUntil: '03/40',
  creditCardCVC: 123
};
