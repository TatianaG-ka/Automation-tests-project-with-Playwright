import { prepareRandomUser } from '@_src/factories/user.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { RegisterUserModel } from '@_src/models/user.model';

test.describe('Verify register', () => {
  let registerUserData: RegisterUserModel;

  test.beforeEach(async () => {
    registerUserData = prepareRandomUser();
  });

  test('Register with correct data and login @R03-01 @R03-02 @R03-03', async ({
    registerPage,
  }) => {
    //Array
    const expectedAlertPopup = 'User created';
    const expectedLoginTitle = 'Login';
    const expectedWelcomeTitle = 'Welcome';

    //Act
    const loginPage = await registerPage.register(registerUserData);

    //Assert
    await expect(registerPage.alertPopup).toHaveText(expectedAlertPopup);

    await loginPage.waitForPageToLoadUrl();
    const titleLogin = await loginPage.getTitle();
    expect.soft(titleLogin).toContain(expectedLoginTitle);

    //Assert test login
    const welcomePage = await loginPage.login({
      userEmail: registerUserData.userEmail,
      userPassword: registerUserData.userPassword,
    });
    const titleWelcome = await welcomePage.getTitle();
    expect(titleWelcome).toContain(expectedWelcomeTitle);
  });

  test('No register with incorrect data - non valid email @R03-04', async ({
    registerPage,
  }) => {
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

  test('No register with incorrect data - email not provided @R03-04', async ({
    registerPage,
  }) => {
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
