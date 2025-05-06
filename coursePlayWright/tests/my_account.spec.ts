import { test} from '@playwright/test';
import { MyAccountPage } from '../pages/MyAccountPage';
import { getLoginToken } from '../api-calls/getLoginToken.js';


test.only('My Account using cookie injection', async ({page}) => {
  const loginToken = await getLoginToken();
  console.log('Login token:', loginToken);

  const myAccountPage = new MyAccountPage(page);
  await myAccountPage.visit();

  console.log('Test is running...');
  await page.pause();
})