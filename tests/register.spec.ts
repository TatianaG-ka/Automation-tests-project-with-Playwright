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
    const userFirstName = faker.person.firstName();
    const userLastName = faker.person.lastName();
    const userEmail = faker.internet.email({
      firstName: userFirstName,
      lastName: userLastName,
    });
    const userPassword = faker.internet.password();
    const registerPage = new RegisterPage(page);

    //Act
    await registerPage.goto();
    await registerPage.register(
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
    );

    const expectedAlertPopup = 'User created';

    //Assert
    await expect(registerPage.alertPopup).toHaveText(expectedAlertPopup);

    const loginPage = new LoginPage(page);
    await loginPage.waitForPageToLoadUrl();
    const titleLogin = await loginPage.title();
    expect(titleLogin).toContain('Login');

    //Assert
    await loginPage.login(userEmail, userPassword);

    const welcomePage = new WelcomePage(page);
    const titleWelcome = await welcomePage.title();
    expect(titleWelcome).toContain('Welcome');
  });
});
