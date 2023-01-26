import chaiJsonSchema from 'chai-json-schema'; 
chai.use(chaiJsonSchema);

import * as param from "../../fixtures/agent_service/get_performance_agent_historical.json"
import * as jsonSchemaFile from "../../fixtures/agent_service/schema/get_performance_agent_historical_schema.json"
import * as jsonSchemaBadRequest from "../../fixtures/agent_service/schema/bad_request_schema.json"

describe("Agent performance are ==> /v1/agent/performance/agent/historical", () => {
    context('Positive Case - Get performance agent historical', () => {
        it('Get performance agent historical use are marketing id', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: 'agent/v1/agent/performance/agent/historical',
              qs: param.withAreMarketingId
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.data[0].are_marketing_id).to.equal(param.withAreMarketingId.are_marketing_id)
              expect(response.body).to.be.jsonSchema(jsonSchemaFile);
            })
        })
        it('Get performance agent historical use agent marketing id', () => {
          cy.request({
            method: 'GET',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: 'agent/v1/agent/performance/agent/historical',
            qs: param.withAgentMarketingId
          }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data[0].data.average[0].agent_marketing_id).to.equal(param.withAgentMarketingId.agent_marketing_id)
            expect(response.body).to.be.jsonSchema(jsonSchemaFile);
          })
      })
    })
    context('Negative Case - Get performance agent historical', () => {
      it('Get performance agent historical use are marketing id not found', () => {
          cy.request({
            method: 'GET',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: 'agent/v1/agent/performance/agent/historical',
            qs: param.withAreMarketingIdNotFound
          }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data).to.be.empty
          })
      })
      it('Get performance agent historical use agent marketing id not found', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/agent/historical',
          qs: param.withAgentMarketingIdNotFound
        }).should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.data).to.be.empty
        })
      })
      it('Get performance agent historical without parameter month', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/agent/historical',
          failOnStatusCode: false,
          qs: param.withoutMonth
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.equal(`Required request parameter 'month' for method parameter type int is not present`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Get performance agent historical without parameter year', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/agent/historical',
          failOnStatusCode: false,
          qs: param.withYear
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.equal(`Required request parameter 'year' for method parameter type int is not present`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Get performance agent historical without parameter are and agent marketing id', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/agent/historical',
          failOnStatusCode: false,
          qs: param.withoutAreAndAgentMarketingId
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.equal(`Param can't be empty.`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
    })
})