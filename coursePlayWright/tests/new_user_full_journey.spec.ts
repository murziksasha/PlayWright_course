import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { Navigation } from '../pages/Navigation';
import { Checkout } from '../pages/Checkout';
import { SignUp } from '../pages/SignUp';
import { RegisterPage } from '../pages/RegisterPage';
import { v4 as uuid } from 'uuid';

test('New User Full Journey', async ({ page }) => {
  const productPage = new ProductPage(page);
  const navigation = new Navigation(page);
  const checkout = new Checkout(page);
  const login = new SignUp(page);
  const register = new RegisterPage(page);

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

  await login.visitSignUp();

  let email =
    'some email' + Math.floor(Math.random() * 1000) + '@example.com';
  let password = uuid();
  await register.signUpAsNewUser(
    (email),
    (password)
  );
  await page.pause();
});
