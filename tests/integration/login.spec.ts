import { expect, test } from '@_src/fixtures/merge.fixture';
import { LoginUserModel } from '@_src/models/user.model';
import { testUser1 } from '@_src/test-data/user.data';

test.describe('Verify login', () => {
  test('login with correct credentials @R02-01', async ({ loginPage }) => {
    //Arrange
    const expectedWelcomeTitle = 'Welcome';

    //Act
    const welcomePage = await loginPage.login(testUser1);
    await welcomePage.goto();
    const title = await welcomePage.getTitle();

    //Assert
    expect(title).toContain(expectedWelcomeTitle);
  });

  test('reject login with incorrect password @R02-01', async ({
    loginPage,
  }) => {
    //Arrange
    const expectedLoginTitle = 'Login';

    const LoginUserModelData: LoginUserModel = {
      userEmail: testUser1.userEmail,
      userPassword: 'incorrectPassword',
    };

    //Act
    loginPage.login(LoginUserModelData);
    const errorMessage = loginPage.loginError;

    //Assert
    await expect.soft(errorMessage).toHaveText('Invalid username or password');
    const title = await loginPage.getTitle();
    expect.soft(title).toContain(expectedLoginTitle);
  });
});
