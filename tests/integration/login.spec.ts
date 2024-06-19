import { LoginUserModel } from '@_src/models/user.model';
import { LoginPage } from '@_src/pages/login.page';
import { testUser1 } from '@_src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('login with correct credentials @R02-01', async ({ page }) => {
    //Arrange
    const expectedWelcomeTitle = 'Welcome';
    const loginPage = new LoginPage(page);

    //Act
    await loginPage.goto();
    const welcomePage = await loginPage.login(testUser1);
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
