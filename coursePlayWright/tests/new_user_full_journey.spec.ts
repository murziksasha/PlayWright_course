import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { Navigation } from '../pages/Navigation';
import { Checkout } from '../pages/Checkout';
import { SignUp } from '../pages/SignUp';
import { v4 as uuid } from 'uuid';
import { SignIn } from '../pages/SignIn';
import { DeliveryDetails } from '../pages/DeliveryDetails';

test('New User Full Journey', async ({ page }) => {
  const productPage = new ProductPage(page);
  const navigation = new Navigation(page);
  const checkout = new Checkout(page);
  const signUp = new SignUp(page);
  const signIn = new SignIn(page);
  const deliveryDetails = new DeliveryDetails(page);

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

  await productPage.visit();
  await productPage.sortByCheapest();

  await productPage.productToBusket(0);
  await productPage.productToBusket(1);
  await productPage.productToBusket(2);

  await navigation.getBasketCount();
  expect(await navigation.getBasketCount()).toBe(3);

  await navigation.goToCheckout();
  await checkout.removeCheapestProduct();


  await checkout.continuToCheckout();
  await signIn.login(email, password);
  await page.waitForTimeout(1000);

  await page.pause();
  await deliveryDetails.fillAddressForm(
    'John',
    'Doe',
    '123 Main St',
    '12345',
    'New York',
    'Ukraine'
  );
  await page.pause();



});
