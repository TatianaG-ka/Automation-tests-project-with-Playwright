import { HomePage } from '../src/homePage.spec';
import { expect, test } from '@playwright/test';

test('new home page title', async ({ page }) => {
  //Arrange
  const homePage = new HomePage(page);
  //Act
  await homePage.goto();
  // await this.page.waitForLoadState();
  const title = await homePage.title();
  expect(title).toContain('Todoist');
});
