import { faker } from '@faker-js/faker';
import chaiJsonSchema from 'chai-json-schema'; 
chai.use(chaiJsonSchema);

const valueNumber = faker.random.numeric(5);
const valueLastName =  faker.name.lastName();

import * as reqBody from "../../fixtures/agent_service/create_agent_bravo.json"
import * as jsonSchemaFile from "../../fixtures/agent_service/schema/create_agent_bravo_schema.json"
import * as jsonSchemaBadRequest from "../../fixtures/agent_service/schema/bad_request_schema.json"

describe("Create Agent Bravo ==> /v1/agent", () => {
    context('Positive Case - Create Agent Bravo', () => {
        it('Create Agent Bravo using valid data', () => {
            const reqName = `Qa Test `+valueLastName
            cy.request({
              method: 'POST',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: 'agent/v1/agent',
              body: {
                      agent: {
                          address: "street qa test",
                          birth_date: "01-01-1998",
                          birth_place: "Tangerang",
                          city_code: "36.03",
                          email: "dmsqa@tmail.com",
                          kecamatan_code: "36.03.04",
                          kelurahan_code: "36.03.04.2003",
                          marital_status_id: "1",
                          mobile_phone: `086214598`+valueNumber,
                          name: reqName,
                          rt: "02",
                          rw: "09",
                          zip_code: "15720"
                        },
                      document: {
                          document_type: "KTP",
                          id_number: `891120000000`+valueNumber,
                          document_id: "1"
                        },
                      product_id: "1",
                      supervisor_id: "adamk465"
                    }
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.agent.name).to.equal(reqName)
              expect(response.body.status).to.equal('PENDING_REGISTER')
              expect(response.body).to.be.jsonSchema(jsonSchemaFile);
            })
        })
        it('Create Agent Bravo with agent existing', () => {
          const reqName = `Qa Test `+valueLastName
          cy.request({
            method: 'POST',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: 'agent/v1/agent',
            body: reqBody.agentExisting
          }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.status).to.equal('EXISTING')
            expect(response.body).to.be.jsonSchema(jsonSchemaFile);
          })
      })
    })
    context('Negative Case - Create Agent Bravo', () => {
      it('Create Agent Bravo use supervisor id not found', () => {
          cy.request({
            method: 'POST',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: 'agent/v1/agent',
            failOnStatusCode: false,
            body: reqBody.supervisorIdNotFound
          }).should((response) => {
            expect(response.status).to.eq(404)
            expect(response.body.message).to.equal('ARE not found')
            expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
          })
      })
      it('Create Agent Bravo id without supervisor id', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent',
          failOnStatusCode: false,
          body: reqBody.withoutSupervisorId
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('supervisor_id cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo without product id', () => {
          cy.request({
            method: 'POST',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: 'agent/v1/agent',
            failOnStatusCode: false,
            body: reqBody.supervisorWithoutProductId
          }).should((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.error).to.equal('product_id cannot be empty')
            expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
          })
      })
      it('Create Agent Bravo without document type', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent',
          failOnStatusCode: false,
          body: reqBody.withoutDocumentType
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('document_type cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo without id number', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent',
          failOnStatusCode: false,
          body: reqBody.withoutIdNumber
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('id_number cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo without zip code', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent',
          failOnStatusCode: false,
          body: reqBody.withoutZipCode
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('zip_code cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo without address RW', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent',
          failOnStatusCode: false,
          body: reqBody.withoutAddressRW
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('rw cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo without address RT', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent',
          failOnStatusCode: false,
          body: reqBody.withoutAddressRT
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('rt cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo without agent name', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent',
          failOnStatusCode: false,
          body: reqBody.withoutAgentName
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('name cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo without agent mobile phone', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent',
          failOnStatusCode: false,
          body: reqBody.withoutAgentMobilePhone
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('mobile_phone cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo without agent marital status', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent',
          failOnStatusCode: false,
          body: reqBody.withoutAgentMaritalStatus
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('marital_status_id cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo without agent email', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent',
          failOnStatusCode: false,
          body: reqBody.withoutAgentEmail
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('email cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo without agent email', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent',
          failOnStatusCode: false,
          body: reqBody.withoutAgentEmail
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('email cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo without agent birth place', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent',
          failOnStatusCode: false,
          body: reqBody.withoutAgentBirthPlace
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('birth_place cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo without agent address', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent',
          failOnStatusCode: false,
          body: reqBody.withoutAgentAddress
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('address cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo without agent birth date', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent',
          failOnStatusCode: false,
          body: reqBody.withoutAgentBirthDate
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('birth_date cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo without agent city code', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent',
          failOnStatusCode: false,
          body: reqBody.withoutAgentCityCode
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('city_code cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo without agent kecamatan code', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent',
          failOnStatusCode: false,
          body: reqBody.withoutAgentKecamatanCode
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('kecamatan_code cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Create Agent Bravo without agent kelurahan code', () => {
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent',
          failOnStatusCode: false,
          body: reqBody.withoutAgentKelurahanCode
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('kelurahan_code cannot be empty')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
    })
})