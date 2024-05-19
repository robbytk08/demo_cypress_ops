// LoginTest.js
import LoginPage from '../../object/loginPage.js';

describe('Login Tests', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it('should show an error with invalid password credentials', () => {
    loginPage.fillUsername('student');
    loginPage.fillPassword('incorrectPassword');
    loginPage.submitLogin();
    loginPage.assertLoginError('Your password is invalid!');
  });
});