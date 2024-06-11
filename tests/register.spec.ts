import { RegisterUser } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  test('Register with correct data and login @R03-01 @R03-02 @R03-03', async ({
    page,
  }) => {
    //Array
    const registerUserData: RegisterUser = {
      userFirstName: faker.person.firstName().replace(/[^A-Za-z]g/, ''),
      userLastName: faker.person.lastName().replace(/[^A-Za-z]g/, ''),
      userEmail: '',
      userPassword: faker.internet.password(),
    };

    registerUserData.userEmail = faker.internet.email({
      firstName: registerUserData.userFirstName,
      lastName: registerUserData.userLastName,
    });

    const registerPage = new RegisterPage(page);

    //Act
    await registerPage.goto();
    await registerPage.register(registerUserData);

    const expectedAlertPopup = 'User created';

    //Assert
    await expect(registerPage.alertPopup).toHaveText(expectedAlertPopup);

    const loginPage = new LoginPage(page);
    await loginPage.waitForPageToLoadUrl();
    const titleLogin = await loginPage.title();
    expect(titleLogin).toContain('Login');

    //Assert
    await loginPage.login({
      userEmail: registerUserData.userEmail,
      userPassword: registerUserData.userPassword,
    });

    const welcomePage = new WelcomePage(page);
    const titleWelcome = await welcomePage.title();
    expect(titleWelcome).toContain('Welcome');
  });

  test('No register with incorrect data - non valid email @R03-04', async ({
    page,
  }) => {
    //Array
    const expectedEmailErrorText = 'Please provide a valid email address';

    const registerUserData: RegisterUser = {
      userFirstName: faker.person.firstName().replace(/[^A-Za-z]g/, ''),
      userLastName: faker.person.lastName().replace(/[^A-Za-z]g/, ''),
      userEmail: '@34123',
      userPassword: faker.internet.password(),
    };

    const registerPage = new RegisterPage(page);

    //Act
    await registerPage.goto();
    await registerPage.register(registerUserData);

    //Assert
    await expect(registerPage.emailErrorText).toHaveText(
      expectedEmailErrorText,
    );
  });

  test('No register with incorrect data - email not provided @R03-04', async ({
    page,
  }) => {
    //Array
    const expectedEmailError = 'This field is required';

    //Act
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.firstNameInput.fill(
      faker.person.firstName().replace(/[^A-Za-z]g/, ''),
    );
    await registerPage.lastNameInput.fill(
      faker.person.lastName().replace(/[^A-Za-z]g/, ''),
    );
    await registerPage.passwordInput.fill(faker.internet.password());
    await registerPage.registerButton.click();

    //Assert
    await expect(registerPage.emailErrorText).toHaveText(expectedEmailError);
  });
});
