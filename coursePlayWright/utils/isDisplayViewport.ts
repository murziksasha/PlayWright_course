import { Page } from 'playwright';


export function isDisplayMobile(page: Page): boolean {
  const size = page.viewportSize();
  return size ? size.width < 600 : false;
}