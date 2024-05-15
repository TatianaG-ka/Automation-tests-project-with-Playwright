import { LoginPage } from '../src/pages/login.page';
import { WelcomPage } from '../src/pages/welcom.page';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('login with correct credentials @R02-01', async ({ page }) => {
    //Arrange
    const userEmail = 'Moses.Armstrong@Feest.ca';
    const userPassword = 'test1';
    const loginPage = new LoginPage(page);

    //Act
    await loginPage.goto();
    await loginPage.login(userEmail, userPassword);

    const welcomPage = new WelcomPage(page);
    const title = await welcomPage.title();

    //Assert
    expect(title).toContain('Welcom');
  });
});
