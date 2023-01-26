describe('Login Website E-Doc', () => {
    it('Go to Website E-Doc', () => {
        cy.visit('https://microservices.dev.bravo.bfi.co.id/keycloak/realms/bpm/protocol/openid-connect/auth?client_id=dms-edoc-login&redirect_uri=https%3A%2F%2Fdocument.dev.bravo.bfi.co.id%2Fsent-e-doc&state=b445f793-8585-45ef-81a1-b4a0d7488ff1&response_mode=fragment&response_type=code&scope=openid&nonce=aada1a76-4c40-4c3a-842f-156fdc7dff6e&code_challenge=DLefGXToJ0sM7RHFXPibzeChU3nFcH89tgCknFFgJ4o&code_challenge_method=S256');
        cy.get('title').invoke('text').should('equal', "Login - DMS Platform - BFI Finance");
    })
    it('Input credential login Website E-Doc', () => {
        cy.get('#txtPersonalId').type('096467') // element using id
        cy.get('#passwordField').type('secret***1') // element using id
        cy.contains('LOGIN').click() // element using contains
        cy.wait(9000)
        cy.get('title').invoke('text').should('equal', "BRAVO-DMS");
    })
  })