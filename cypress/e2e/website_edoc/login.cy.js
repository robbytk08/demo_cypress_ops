// LoginTest.js
import LoginPage from '../../object/loginEdocPage';

describe('Login Tests', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it('should login successfully with valid credentials', () => {
    loginPage.fillUsername('096467');
    loginPage.fillPassword('Indones1@.3');
    loginPage.submitLogin();
    loginPage.assertLoginSuccess();
  });
});