import chaiJsonSchema from 'chai-json-schema'; 
chai.use(chaiJsonSchema);

import * as param from "../../fixtures/agent_service/get_performance_agent.json"
import * as jsonSchemaFile from "../../fixtures/agent_service/schema/get_performance_agent_schema.json"
import * as jsonSchemaBadRequest from "../../fixtures/agent_service/schema/bad_request_schema.json"

describe("Agent performance are ==> /v1/agent/performance/agent", () => {
    context('Positive Case - Get performance agent', () => {
        it('Get performance agent use agent marketing id', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: 'agent/v1/agent/performance/agent',
              qs: param.getPerformanceAgentWithMarketingId
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body[0].data.performance[0].agent_marketing_id).to.equal(param.getPerformanceAgentWithMarketingId.agent_marketing_id)
              expect(response.body).to.be.jsonSchema(jsonSchemaFile);
            })
        })
        it('Get performance agent use are marketing id', () => {
          cy.request({
            method: 'GET',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: 'agent/v1/agent/performance/agent',
            qs: param.getPerformanceAgentWithAreMarketingId
          }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body[0].are_marketing_id).to.equal(param.getPerformanceAgentWithAreMarketingId.are_marketing_id)
            expect(response.body).to.be.jsonSchema(jsonSchemaFile);
          })
        })
        it('Get performance agent use are marketing id and limit One', () => {
          cy.request({
            method: 'GET',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: 'agent/v1/agent/performance/agent',
            qs: param.withLimitOne
          }).should((response) => {
            let resContent = response.body[0].data.performance
            let sizeLimit = resContent.length
            expect(response.status).to.eq(200)
            expect(sizeLimit).to.equal(1)
            expect(response.body[0].are_marketing_id).to.equal(param.withLimitOne.are_marketing_id)
            expect(response.body).to.be.jsonSchema(jsonSchemaFile);
          })
        })
    })
    context('Negative Case - Get performance agent', () => {
      it('Get performance agent use agent marketing id not found', () => {
          cy.request({
            method: 'GET',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: 'agent/v1/agent/performance/agent',
            qs: param.getPerformanceAgentNotFound
          }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.empty
          })
      })
      it('Get performance agent without parameter month', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/agent',
          failOnStatusCode: false,
          qs: param.withoutMonth
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.equal(`Required request parameter 'month' for method parameter type int is not present`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest)
        })
      })
      it('Get performance agent without parameter month', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/agent',
          failOnStatusCode: false,
          qs: param.withoutYear
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.equal(`Required request parameter 'year' for method parameter type int is not present`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest)
        })
      }),
      it('Get performance agent without parameter are and agent marketing id', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/agent',
          failOnStatusCode: false,
          qs: param.withoutAreAndAgentMarketingId
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.equal(`Param can't be empty.`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest)
        })
      })
      it('Get performance agent invalid month', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/agent',
          qs: param.withInvalidMonth
        }).should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.be.empty
        })
      })
      it('Get performance agent invalid type data month', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/agent',
          failOnStatusCode: false,
          qs: param.withInvalidTypeDataMonth
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('Bad Request')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest)
        })
      })
      it('Get performance agent invalid type data year', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/agent',
          failOnStatusCode: false,
          qs: param.withInvalidTypeDataYear
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal('Bad Request')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest)
        })
      })
    })
})