import {test, expect} from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test.only('New User Full Journey', async ({page}) => {

  const productPage = new ProductPage(page);
  await productPage.visit();

  


  // await page.pause();


  // await page.goto('/');
  // const loginButton = page.locator('[data-qa="header-login-button"]');
  // await loginButton.click();
  // await page.waitForURL('/login');

  // const emailInput = page.locator('[data-qa="login-email-input"]');

});