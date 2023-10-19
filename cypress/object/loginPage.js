// LoginPage.js

class LoginPage {
    visit() {
      cy.visit('https://practicetestautomation.com/practice-test-login/');
    }
  
    fillUsername(username) {
      cy.get('#username').type(username);
    }
  
    fillPassword(password) {
      cy.get('#password').type(password);
    }
  
    submitLogin() {
      cy.get('#submit').click();
    }
  
    assertLoginSuccess() {
      cy.url().should('include', '/logged-in-successfully/'); // Adjust the URL accordingly
    }
  
    assertLoginError(expectedMessage) {
      cy.get('#error').should('be.visible').and('contain.text',expectedMessage);
    }
  }
  
  export default LoginPage;