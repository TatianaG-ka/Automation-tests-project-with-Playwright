import { LoginUser } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('login with correct credentials @R02-01', async ({ page }) => {
    //Arrange
    const loginPage = new LoginPage(page);

    //Act
    await loginPage.goto();
    await loginPage.login(testUser1);

    const welcomePage = new WelcomePage(page);
    const title = await welcomePage.title();

    //Assert
    expect(title).toContain('Welcome');
  });

  test('reject login with incorrect password @R02-01', async ({ page }) => {
    //Arrange
    const loginUserData: LoginUser = {
      userEmail: testUser1.userEmail,
      userPassword: 'incorrectPassword',
    };

    const loginPage = new LoginPage(page);

    //Act
    loginPage.goto();
    loginPage.login(loginUserData);
    const errorMessage = loginPage.loginError;

    //Assert
    await expect.soft(errorMessage).toHaveText('Invalid username or password');
    const title = await loginPage.title();
    expect.soft(title).toContain('Login');
  });

});