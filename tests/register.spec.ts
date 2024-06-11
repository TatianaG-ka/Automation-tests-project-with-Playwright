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
});
