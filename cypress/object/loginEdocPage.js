// LoginPage.js

class LoginPage {
    visit() {
      cy.visit('https://document.uat.bravo.bfi.co.id');
      cy.viewport(1920, 1080);
    }
  
    fillUsername(username) {
      cy.get('#username').type(username);
    }
  
    fillPassword(password) {
      cy.get('#password').type(password);
    }
  
    submitLogin() {
      cy.get('#kc-login').click();
    }
  
    assertLoginSuccess() {
      cy.url().should('include', '/dashboard'); // Adjust the URL accordingly
    }
  
    assertLoginError(expectedMessage) {
      cy.get('#error').should('be.visible').and('contain.text',expectedMessage);
    }
  }
  
  export default LoginPage;