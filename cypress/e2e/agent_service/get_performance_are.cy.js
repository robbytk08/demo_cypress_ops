import chaiJsonSchema from 'chai-json-schema'; 
chai.use(chaiJsonSchema);

import * as param from "../../fixtures/agent_service/get_performance_are.json"
import * as jsonSchemaFile from "../../fixtures/agent_service/schema/get_performance_are_schema.json"
import * as jsonSchemaBadRequest from "../../fixtures/agent_service/schema/bad_request_schema.json"

describe("Agent performance are ==> /v1/agent/performance/are", () => {
    context('Positive Case - Get performance are', () => {
        it('Get performance are use are id', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: 'agent/v1/agent/performance/are',
              qs: param.getPerformanceAreWithAreId
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.data[0].are_marketing_id).to.equal(param.getPerformanceAreWithAreId.are_id)
              expect(response.body).to.be.jsonSchema(jsonSchemaFile);
            })
        })
        it('Get performance are use supervisor id', () => {
          cy.request({
            method: 'GET',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: 'agent/v1/agent/performance/are',
            qs: param.getPerformanceAreWithSupervisorId
          }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data).to.exist
            expect(response.body).to.be.jsonSchema(jsonSchemaFile);
          })
      })
    })
    context('Negative Case - Get performance are', () => {
      it('Get agent target are use are id not found', () => {
          cy.request({
            method: 'GET',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: 'agent/v1/agent/performance/are',
            qs: param.getPerformanceAreWithAreIdNotFound
          }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data).to.be.empty
          })
      })
      it('Get agent target are use without Are and Supervisor Id', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/are',
          failOnStatusCode: false,
          qs: param.withoutAreAndSupervisorId
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.equal(`Param can't be empty.`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Get agent target are use without param month', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/are',
          failOnStatusCode: false,
          qs: param.withoutMonth
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.equal(`Required request parameter 'month' for method parameter type int is not present`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Get agent target are use without param year', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/are',
          failOnStatusCode: false,
          qs: param.withoutYear
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.equal(`Required request parameter 'year' for method parameter type int is not present`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Get agent target are use with invalid data month', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/are',
          failOnStatusCode: false,
          qs: param.withInvalidDataMonth
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.include(`Failed to convert value of type 'java.lang.String' to required type 'int'`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
      it('Get agent target are use with invalid data year', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/performance/are',
          failOnStatusCode: false,
          qs: param.withInvalidDataYear
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.include(`Failed to convert value of type 'java.lang.String' to required type 'int'`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest);
        })
      })
    })
})