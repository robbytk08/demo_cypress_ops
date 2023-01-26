import chaiJsonSchema from 'chai-json-schema'; 
chai.use(chaiJsonSchema);

import * as param from "../../fixtures/agent_service/get_performance_are_historical.json"
import * as jsonSchemaFile from "../../fixtures/agent_service/schema/get_performance_are_historical_schema.json"
import * as jsonSchemaBadRequest from "../../fixtures/agent_service/schema/bad_request_schema.json"

describe("Agent performance are historical ==> /v1/agent/performance/are/historical", () => {
    context('Positive Case - Get performance are historical', () => {
        it('Get performance are historical use are id', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: 'agent/v1/agent/performance/are/historical',
              qs: param.getPerformanceAreHistorical
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.data[0].data.average[0].are_marketing_id).to.equal(param.getPerformanceAreHistorical.are_id)
              expect(response.body).to.be.jsonSchema(jsonSchemaFile);
            })
        })
    })
    context('Negative Case - Get performance are historical', () => {
      it('Get agent target are historical use are id not found', () => {
          cy.request({
            method: 'GET',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: 'agent/v1/agent/performance/are/historical',
            qs: param.getPerformanceAreHistoricalAreIdNotFound
          }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data).to.be.empty
          })
      })
      it('Get agent target are historical without average duration', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/are/historical',
          failOnStatusCode: false,
          qs: param.withoutAverageDuration
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.equal(`Required request parameter 'average_duration' for method parameter type int is not present`)
        })
      })
      it('Get agent target are historical without are id and supervisor id', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/are/historical',
          failOnStatusCode: false,
          qs: param.withoutAreIdAndSupervisorId
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.equal(`Param can't be empty.`)
        })
      })
    })
})