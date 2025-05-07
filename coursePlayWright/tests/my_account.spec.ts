import { test} from '@playwright/test';
import { MyAccountPage } from '../pages/MyAccountPage';
import { getLoginToken } from '../api-calls/GetLoginToken';


test.only('My Account using cookie injection', async ({page}) => {
  const loginToken = await getLoginToken(page);
  console.log('Login token:', loginToken);

  const myAccountPage = new MyAccountPage(page);
  await myAccountPage.visit();

  console.log('Test is running...');
  await page.pause();
})