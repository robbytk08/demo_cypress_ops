// LoginTest.js
import LoginPage from '../../object/loginPage.js';

describe('Login Tests', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it('should show an error with invalid credentials', () => {
    loginPage.fillUsername('invalid_username');
    loginPage.fillPassword('Password123');
    loginPage.submitLogin();
    loginPage.assertLoginError('Your username is invalid!');
  });
});