
import { test } from '@playwright/test';
import { MyAccountPage } from '../pages/MyAccountPage';
import { getLoginToken } from '../api-calls/getLoginToken';
import { adminUserData, IUserAdminUserData } from '../data/userLoginData';


test.only('My Account using cookie injection and mocking network request', async ({page}) => {
  const loginToken = await getLoginToken(page, adminUserData);

  await page.route('**/api/user**', async (route, request) => {
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Playwright error from mocking',
      }), 
    })

  })

  const myAccountPage = new MyAccountPage(page);
  await myAccountPage.visit();

  await page.pause();


  await page.evaluate((loginTokenInsideBrowser) => {
    document.cookie = `token=${loginTokenInsideBrowser}; path=/; domain=localhost`;
  }, [loginToken]);
  await myAccountPage.visit();
  await myAccountPage.waitForPageHeading();
  await myAccountPage.waitForErrorMessage();

  
  await page.pause();
})