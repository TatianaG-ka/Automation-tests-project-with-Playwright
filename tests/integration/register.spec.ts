import { prepareRandomUser } from '@_scr/factories/user.factory';
import { RegisterUserModel } from '@_scr/models/user.model';
import { LoginPage } from '@_scr/pages/login.page';
import { RegisterPage } from '@_scr/pages/register.page';
import { WelcomePage } from '@_scr/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  let registerPage: RegisterPage;
  let registerUserData: RegisterUserModel;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    registerUserData = prepareRandomUser();

    await registerPage.goto();
  });

  test('Register with correct data and login @R03-01 @R03-02 @R03-03', async ({
    page,
  }) => {
    //Array
    const expectedAlertPopup = 'User created';

    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);

    //Act
    await registerPage.register(registerUserData);

    //Assert
    await expect(registerPage.alertPopup).toHaveText(expectedAlertPopup);

    const expectedLoginTitle = 'Login';
    await loginPage.waitForPageToLoadUrl();
    const titleLogin = await loginPage.getTitle();
    expect.soft(titleLogin).toContain(expectedLoginTitle);

    //Assert test login
    const expectedWelcomeTitle = 'Welcome';
    await loginPage.login({
      userEmail: registerUserData.userEmail,
      userPassword: registerUserData.userPassword,
    });
    const titleWelcome = await welcomePage.getTitle();
    expect(titleWelcome).toContain(expectedWelcomeTitle);
  });

  test('No register with incorrect data - non valid email @R03-04', async ({}) => {
    //Array
    const expectedEmailErrorText = 'Please provide a valid email address';

    registerUserData.userEmail = '$2#';

    //Act
    await registerPage.register(registerUserData);

    //Assert
    await expect(registerPage.emailErrorText).toHaveText(
      expectedEmailErrorText,
    );
  });

  test('No register with incorrect data - email not provided @R03-04', async ({}) => {
    //Array
    const expectedEmailError = 'This field is required';

    //Act
    await registerPage.firstNameInput.fill(registerUserData.userFirstName);
    await registerPage.lastNameInput.fill(registerUserData.userLastName);
    await registerPage.passwordInput.fill(registerUserData.userPassword);
    await registerPage.registerButton.click();

    //Assert
    await expect(registerPage.emailErrorText).toHaveText(expectedEmailError);
  });
});
