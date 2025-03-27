import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { Navigation } from '../pages/Navigation';

test('New User Full Journey', async ({ page }) => {
  const productPage = new ProductPage(page);
  const navigation = new Navigation(page);

  await productPage.visit();

  await productPage.productToBusket(0);
  await productPage.productToBusket(1);
  await productPage.productToBusket(2);

  await page.pause();

  await navigation.getBasketCount();
  expect(await navigation.getBasketCount()).toBe(3);
});

// test('Basket counter', async ({ page }) => {
//   const productPage = new ProductPage(page);
//   await productPage.getBasketCount();
//   expect(await productPage.getBasketCount()).toBe(3);
// });
