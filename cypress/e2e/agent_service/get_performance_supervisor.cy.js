import chaiJsonSchema from 'chai-json-schema'; 
chai.use(chaiJsonSchema);

import * as param from "../../fixtures/agent_service/get_performance_supervisor.json"
import * as jsonSchemaFile from "../../fixtures/agent_service/schema/get_performance_supervisor_schema.json"
import * as jsonSchemaBadRequest from "../../fixtures/agent_service/schema/bad_request_schema.json"

describe("Agent performance supervisor ==> /v1/agent/performance/supervisor", () => {
    context('Positive Case - Get performance supervisor', () => {
        it('Get performance supervisor use supervisor id', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: 'agent/v1/agent/performance/supervisor',
              qs: param.getPerformanceSupervisorWithSupervisorId
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.data[0].supervisor_id).to.equal(param.getPerformanceSupervisorWithSupervisorId.supervisor_id)
              expect(response.body).to.be.jsonSchema(jsonSchemaFile);
            })
        })
    })
    context('Negative Case - Get performance supervisor', () => {
      it('Get performance supervisor use agent supervisor id not found', () => {
          cy.request({
            method: 'GET',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: 'agent/v1/agent/performance/supervisor',
            qs: param.getPerformanceSupervisorWithSupervisorIdNotFound
          }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data).to.be.empty
          })
      })
      it('Get performance supervisor without parameter supervisor id', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/supervisor',
          failOnStatusCode: false,
          qs: param.withoutSupervisorId
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.equal(`Required request parameter 'supervisor_id' for method parameter type List is not present`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Get performance supervisor without parameter month', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/supervisor',
          failOnStatusCode: false,
          qs: param.withoutMonth
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.equal(`Required request parameter 'month' for method parameter type int is not present`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Get performance supervisor without parameter year', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/supervisor',
          failOnStatusCode: false,
          qs: param.withoutYear
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.equal(`Required request parameter 'year' for method parameter type int is not present`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Get performance supervisor with invalid type data month', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/supervisor',
          failOnStatusCode: false,
          qs: param.invalidTypeDataMonth
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.include(`Failed to convert value of type 'java.lang.String' to required type 'int'`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Get performance supervisor with invalid type data year', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/supervisor',
          failOnStatusCode: false,
          qs: param.invalidTypeDataYear
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.include(`Failed to convert value of type 'java.lang.String' to required type 'int'`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
    })
})