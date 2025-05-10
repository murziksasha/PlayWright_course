import { test } from '@playwright/test';
import { MyAccountPage } from '../pages/MyAccountPage';
import { getLoginToken } from '../api-calls/getLoginToken';
import { adminUserData, IUserAdminUserData } from '../data/userLoginData';


test.only('My Account using cookie injection', async ({page}) => {
  const loginToken = await getLoginToken(page, adminUserData);
  console.log('Login token:', loginToken);

  const myAccountPage = new MyAccountPage(page);
  await myAccountPage.visit();
  await page.evaluate((loginTokenInsideBrowser) => {
    document.cookie = `token=${loginTokenInsideBrowser}; path=/; domain=localhost`;
  }, [loginToken]);
  await myAccountPage.visit();
  await myAccountPage.waitForPageHeading();

  await page.pause();
})