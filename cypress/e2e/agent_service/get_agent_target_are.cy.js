import chaiJsonSchema from 'chai-json-schema'; 
chai.use(chaiJsonSchema);

import * as param from "../../fixtures/agent_service/get_agent_target_are.json"
import * as jsonSchemaFile from "../../fixtures/agent_service/schema/get_agent_target_are_schema.json"
import * as jsonSchemaBadRequest from "../../fixtures/agent_service/schema/bad_request_schema.json"

describe("Agent target are ==> /v1/agent/target/are", () => {
    context('Positive Case - Get agent target are', () => {
        it('Get agent target are use are id', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: 'agent/v1/agent/target/are',
              qs: param.getAgentTargetAreUseAreId
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.data[0].are_marketing_id).to.equal(param.getAgentTargetAreUseAreId.are_id)
              expect(response.body.data[0].month).to.equal(param.getAgentTargetAreUseAreId.month)
              expect(response.body.data[0].year).to.equal(param.getAgentTargetAreUseAreId.year)
              expect(response.body).to.be.jsonSchema(jsonSchemaFile);
            })
        })
        it('Get agent target are use supervisor id', () => {
          cy.request({
            method: 'GET',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: 'agent/v1/agent/target/are',
            qs: param.getAgentTargetAreUseSpvId
          }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data[0].month).to.equal(param.getAgentTargetAreUseSpvId.month)
            expect(response.body.data[0].year).to.equal(param.getAgentTargetAreUseSpvId.year)
            expect(response.body).to.be.jsonSchema(jsonSchemaFile);
          })
      })
    })
    context('Negative Case - Get agent target are', () => {
      it('Get agent target are use are id not found', () => {
          cy.request({
            method: 'GET',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: 'agent/v1/agent/target/are',
            qs: param.getAgentTargetAreUseAreIdNotFound
          }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data).to.be.empty
          })
      })
      it('Get agent target are use supervisor id not found', () => {
          cy.request({
            method: 'GET',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: 'agent/v1/agent/target/are',
            qs: param.getAgentTargetAreUseSpvIdNotFound
          }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data).to.be.empty
          })
      })
      it('Get agent target are without are id and spv id', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/target/are',
          failOnStatusCode: false,
          qs: {
                month: 10,
                year: 2022
              }
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.equal(`Param can't be empty.`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest)
        })
      })
      it('Get agent target are without param month', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/target/are',
          failOnStatusCode: false,
          qs: {
                year: 2022,
                are_id: "meike528"
              }
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.equal(`Required request parameter 'month' for method parameter type int is not present`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest)
        })
      })
      it('Get agent target are without param year', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/target/are',
          failOnStatusCode: false,
          qs: {
                month: 10,
                are_id: "meike528"
              }
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.equal(`Required request parameter 'year' for method parameter type int is not present`)
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest)
        })
      })
      it('Get agent target are with invalid type param month', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/target/are',
          failOnStatusCode: false,
          qs: {
                month: "Sepuluh",
                year : 2022,
                are_id: "meike528"
              }
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.include('Failed to convert value of type')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest)
        })
      })
      it('Get agent target are with invalid type param year', () => {
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: 'agent/v1/agent/target/are',
          failOnStatusCode: false,
          qs: {
                month: 10,
                year : "dua ribu sepuluh",
                are_id: "meike528"
              }
        }).should((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.include('Failed to convert value of type')
          expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest)
        })
      })
    })
})