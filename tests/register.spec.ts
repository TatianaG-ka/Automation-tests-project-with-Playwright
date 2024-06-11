import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { expect, test } from '@playwright/test';
import { WelcomePage } from '../src/pages/welcome.page';

test.describe('Verify register', () => {
  test('Register with correct data and login @R03-01 @R03-02 @R03-03', async ({
    page,
  }) => {
    //Array
    const firstName = 'Jan';
    const lastName = 'JanTest';
    const userEmail = `jan${new Date().getTime()}@test.test`;
    const userPassword = 'Test1234';
    const registerPage = new RegisterPage(page);

    //Act
    await registerPage.goto();
    await registerPage.register(firstName, lastName, userEmail, userPassword);

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
