import { faker } from '@faker-js/faker';
import chaiJsonSchema from 'chai-json-schema'; 
chai.use(chaiJsonSchema);

const valueMonth = faker.datatype.number({"min" : 1,"max" : 12});
const valueYear = faker.datatype.number({"min" : 2022,"max" : 2023});
const valueFirstName =  faker.name.firstName();

import * as reqBody from "../../fixtures/agent_service/create_agent_target_are.json"
import * as jsonSchemaFile from "../../fixtures/agent_service/schema/create_agent_target_are_schema.json"
import * as jsonSchemaBadRequest from "../../fixtures/agent_service/schema/bad_request_schema.json"

describe("Create Agent Target Are ==> /v1/agent/target/are", () => {
    context('Positive Case - Create Agent Target Are', () => {
        it('Create Agent Target Are using valid data', () => {
            const reqMarketingId = valueFirstName+`Xqa`
            cy.request({
              method: 'POST',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: 'agent/v1/agent/target/are',
              body: {
                are_marketing_id: reqMarketingId,
                month: valueMonth,
                year: valueYear,
                derived_target: {
                  total_contract_value: 22000000,
                  total_contract: 0,
                  total_prospect: 2,
                  total_registered_agent: 2,
                  funding_rate: 1000000.00
                },
                main_target: {
                  ntf_target: 75000000,
                  ntf_achieved: 62026280,
                  bap: 83268286,
                  success_rate: 78415572.46456659,
                  prospect_agent: 27251735,
                  active_agent: 93778440
                }
              }
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.status).to.equal('SUCCESS')
              expect(response.body.required_data.are_marketing_id).to.equal(reqMarketingId)
              expect(response.body).to.be.jsonSchema(jsonSchemaFile);
            })
        })
    })
    context('Negative Case - Create Agent Target Are', () => {
        it('Create Agent Target Are without Are Marketing Id', () => {
          cy.request({
            method: 'POST',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: 'agent/v1/agent/target/are',
            failOnStatusCode: false,
            body: reqBody.withoutAreMarketingId
          }).should((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.error).to.equal('are_marketing_id cannot be empty')
            expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
          })
        })
        it('Create Agent Target Are without Are Target Month', () => {
            cy.request({
              method: 'POST',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: 'agent/v1/agent/target/are',
              failOnStatusCode: false,
              body: reqBody.withoutAreTargetMonth
            }).should((response) => {
              expect(response.status).to.eq(400)
              expect(response.body.error).to.equal('month cannot be empty')
              expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
            })
        })
        it('Create Agent Target Are with invalid format month', () => {
            cy.request({
              method: 'POST',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: 'agent/v1/agent/target/are',
              failOnStatusCode: false,
              body: reqBody.withInvalidFormatMonth
            }).should((response) => {
              expect(response.status).to.eq(400)
              expect(response.body.error).to.equal('Bad Request')
              expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
            })
        })
        it('Create Agent Target Are without Are Target Year', () => {
            cy.request({
              method: 'POST',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: 'agent/v1/agent/target/are',
              failOnStatusCode: false,
              body: reqBody.withoutAreTargetYear
            }).should((response) => {
              expect(response.status).to.eq(400)
              expect(response.body.error).to.equal('year cannot be empty')
              expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
            })
        })
        it('Create Agent Target Are with month not found', () => {
            cy.request({
              method: 'POST',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: 'agent/v1/agent/target/are',
              failOnStatusCode: false,
              body: reqBody.withMonthNotFound
            }).should((response) => {
              expect(response.status).to.eq(400)
              expect(response.body.error).to.equal('Bad Request')
              expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
            })
        })
    })
})