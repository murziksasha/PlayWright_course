import test, { expect } from '@playwright/test';

test.skip('Product Page Add To Basket', async ({ page }) => {
  await page.goto('/');

  const addToBasketButton = page
    .locator(
      '//*[@id="__next"]/div/div[2]/div/div[2]/div[1]/div[4]/div[2]/button'
    )
    .first();
  const basketCounter = page.locator(
    '[data-qa="header-basket-count"]'
  );

  await addToBasketButton.waitFor();
  await expect(addToBasketButton).toHaveText('Add to Basket');
  await expect(basketCounter).toHaveText('0');

  await addToBasketButton.click();

  await expect(addToBasketButton).toHaveText('Remove from Basket');
  await expect(basketCounter).toHaveText('1');

  const checkoutLink = page.locator('//*[@id="__next"]/div/div[1]/div[2]/div/div[3]/div/div[1]/p/a')
  await checkoutLink.waitFor()
  await checkoutLink.click()
  await page.waitForURL('/basket')

  // await page.pause();
});
