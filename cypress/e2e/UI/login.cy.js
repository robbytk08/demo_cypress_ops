// LoginTest.js
import LoginPage from '../../object/loginPage.js';

describe('Login Tests', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it('should login successfully with valid credentials', () => {
    loginPage.fillUsername('student');
    loginPage.fillPassword('Password123');
    loginPage.submitLogin();
    loginPage.assertLoginSuccess();
  });
});