import chaiJsonSchema from 'chai-json-schema'; 
chai.use(chaiJsonSchema);

import * as param from "../../fixtures/agent_service/get_profile_agent.json"
import * as jsonSchemaFile from "../../fixtures/agent_service/schema/get_profile_agent_schema.json"
import * as jsonSchemaBadRequest from "../../fixtures/agent_service/schema/bad_request_schema.json"

describe("Profile Agent ==> /v1/agent/profile/agent", () =>{
    context("Positive Case - Get Profile Agent detail", () => {
        it("Get Profile Agent use valid are id", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent/profile/agent',
                qs: param.getProfileAgent
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.data[0].are_id).to.equal(param.getProfileAgent.are_id)
                expect(response.body).to.be.jsonSchema(jsonSchemaFile);
            })
        })
    })
    context("Negative Case - Get Profile Agent detail", () => {
        it("Get Profile Agent use are id not found", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent/profile/agent',
                qs: param.getProfileAgentNotFound
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.empty
            })
        })
        it("Get Profile Agent without are id", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent/profile/agent',
                failOnStatusCode: false,
                qs: {
                    month: 10,
                    year: 2022
                  }
            }).should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.include(`Param can't be empty.`)
                expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest)
            })
        })
        it("Get Profile Agent without param month", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent/profile/agent',
                failOnStatusCode: false,
                qs: {
                    are_id : "abdul2578",
                    year: 2022
                  }
            }).should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.include(`'month' for method parameter type int is not present`)
                expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest)
            })
        })
        it("Get Profile Agent without param year", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent/profile/agent',
                failOnStatusCode: false,
                qs: {
                    are_id : "abdul2578",
                    month : 8,
                  }
            }).should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.include(`'year' for method parameter type int is not present`)
                expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest)
            })
        })
        it("Get Profile Agent with invalid month", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent/profile/agent',
                failOnStatusCode: false,
                qs: {
                    are_id : "abdul2578",
                    month : "delapan",
                    year : 2022
                  }
            }).should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.include(`Failed to convert value of type 'java.lang.String'`)
                expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest)
            })
        })
        it("Get Profile Agent with invalid year", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent/profile/agent',
                failOnStatusCode: false,
                qs: {
                    are_id : "abdul2578",
                    month : 8,
                    year : "dua ribu dua dua"
                  }
            }).should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.include(`Failed to convert value of type 'java.lang.String'`)
                expect(response.body).to.be.jsonSchema(jsonSchemaBadRequest)
            })
        })
    })
})