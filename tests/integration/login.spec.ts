import { LoginUserModel } from '@_scr/models/user.model';
import { LoginPage } from '@_scr/pages/login.page';
import { WelcomePage } from '@_scr/pages/welcome.page';
import { testUser1 } from '@_scr/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('login with correct credentials @R02-01', async ({ page }) => {
    //Arrange
    const expectedWelcomeTitle = 'Welcome';
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);

    //Act
    await loginPage.goto();
    await loginPage.login(testUser1);
    await welcomePage.goto();
    const title = await welcomePage.getTitle();

    //Assert
    expect(title).toContain(expectedWelcomeTitle);
  });

  test('reject login with incorrect password @R02-01', async ({ page }) => {
    //Arrange
    const expectedLoginTitle = 'Login';
    const loginPage = new LoginPage(page);

    const LoginUserModelData: LoginUserModel = {
      userEmail: testUser1.userEmail,
      userPassword: 'incorrectPassword',
    };

    //Act
    loginPage.goto();
    loginPage.login(LoginUserModelData);
    const errorMessage = loginPage.loginError;

    //Assert
    await expect.soft(errorMessage).toHaveText('Invalid username or password');
    const title = await loginPage.getTitle();
    expect.soft(title).toContain(expectedLoginTitle);
  });
});
