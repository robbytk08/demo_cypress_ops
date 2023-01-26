import chaiJsonSchema from 'chai-json-schema'; 
chai.use(chaiJsonSchema);

import * as reqBody from "../../fixtures/agent_service/create_agent_bravo_simplified.json"
import * as jsonSchemaFile from "../../fixtures/agent_service/schema/create_agent_bravo_simplified_schema.json"
import * as jsonSchemaBadRequest from "../../fixtures/agent_service/schema/bad_request_schema.json"

describe("Create Agent Bravo simplified ==> /v1/agent/simplified", () => {
    context('Positive Case - Create Agent Bravo simplified', () => {
        it('Create Agent Bravo simplified using agent existing', () => {
            cy.request({
              method: 'POST',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: 'agent/v1/agent/simplified',
              body: reqBody.agentExisting
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.status).to.equal('EXISTING')
              expect(response.body).to.be.jsonSchema(jsonSchemaFile.schemaExisting);
            })
        })
        it('Create Agent Bravo simplified using agent mutation', () => {
          cy.request({
            method: 'POST',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: 'agent/v1/agent/simplified',
            body: reqBody.agentMutation
          }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.status).to.equal('MUTATION')
            expect(response.body).to.be.jsonSchema(jsonSchemaFile.schemaExisting);
          })
      })
    })
    context('Negative Case - Create Agent Bravo simplified', () => {
      it('Create Agent Bravo simplified use agent Precondition Failed', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/simplified',
          failOnStatusCode: false,
          body: reqBody.agentPreconditionFailed
        }).should((response) => {
          expect(response.status).to.eq(412)
          expect(response.body.message).to.equal('REGISTRATION_INFORMATION_NOT_COMPLETE')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo simplified use agent not found', () => {
          cy.request({
            method: 'POST',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: 'agent/v1/agent/simplified',
            failOnStatusCode: false,
            body: reqBody.agentNotFound
          }).should((response) => {
            expect(response.status).to.eq(404)
            expect(response.body.message).to.equal('Agent document not found')
            expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
          })
      })
      it('Create Agent Bravo simplified without supervisor id', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/simplified',
          failOnStatusCode: false,
          body: reqBody.withoutSupervisorId
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('supervisor_id cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo simplified without mobile phone', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/simplified',
          failOnStatusCode: false,
          body: reqBody.withoutMobilePhone
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('mobile_phone cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo simplified without id number', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/simplified',
          failOnStatusCode: false,
          body: reqBody.withoutIdNumber
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('id_number cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo simplified without document type', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/simplified',
          failOnStatusCode: false,
          body: reqBody.withoutDocumentType
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('document_type cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo simplified without object agent', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/simplified',
          failOnStatusCode: false,
          body: reqBody.withoutObjectAgent
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('agent cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo simplified with phone number special character', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/simplified',
          failOnStatusCode: false,
          body: reqBody.withPhoneNumberSpecialCharacter
        }).should((response) => {
          expect(response.status).to.eq(404)
          expect(response.body.message).to.equal('Agent document not found')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
    })
})