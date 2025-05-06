import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { Navigation } from '../pages/Navigation';
import { Checkout } from '../pages/Checkout';
import { SignUp } from '../pages/SignUp';
import { v4 as uuid } from 'uuid';
import { SignIn } from '../pages/SignIn';
import { DeliveryDetails } from '../pages/DeliveryDetails';
import {userAddressData} from '../data/userAddressData';
import { PaymentPage } from '../pages/PaymentPage';
import { paymentsDetails } from '../data/paymentDetails';
import { isDisplayMobile } from '../utils/isDisplayViewport';



// if (isDisplayMobile(this.page)) {
//   await this.burgerMenuMobile.waitFor();
//   await this.burgerMenuMobile.click();
// } 

test('New User Full Journey', async ({ page }) => {
  const productPage = new ProductPage(page);
  const navigation = new Navigation(page);
  const checkout = new Checkout(page);
  const signUp = new SignUp(page);
  const signIn = new SignIn(page);
  const deliveryDetails = new DeliveryDetails(page);
  const payment = new PaymentPage(page);

  // await page.pause();

  await page.goto('/');
  await page.waitForTimeout(1000);

  await signUp.visitSignUp();

  let email =
    'some_email' + Math.floor(Math.random() * 1000) + '@example.com';
  let password = uuid();
  await signUp.signUpAsNewUser(
    (email),
    (password)
  );

  
  // await productPage.visit();
  
  await productPage.sortByCheapest();
  
  await productPage.productToBusket(0);
  await productPage.productToBusket(1);
  await productPage.productToBusket(2);
  
  if(!isDisplayMobile(page)) {
    await navigation.getBasketCount();
    expect(await navigation.getBasketCount()).toBe(3);
  }
  
  
  


  await navigation.goToCheckout();
  await checkout.removeCheapestProduct();

  await page.pause();



 

  await checkout.continuToCheckout();
  await page.waitForTimeout(1000);
  if(!isDisplayMobile(page)) {
  await signIn.login(email, password);
  await page.waitForTimeout(1000);
  }



  await deliveryDetails.fillAddressForm(userAddressData)
  await page.waitForTimeout(1000);
  await deliveryDetails.saveDetails();
  await deliveryDetails.continueToPayment();

  await payment.applyDiscountCode();

  await payment.fillPaymentForm(paymentsDetails);
  await payment.completePayment();
  await page.pause();





});
