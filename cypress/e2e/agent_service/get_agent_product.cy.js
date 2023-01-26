import chaiJsonSchema from 'chai-json-schema'; 
chai.use(chaiJsonSchema);

import * as param from "../../fixtures/agent_service/get_agent_product.json"
import * as jsonSchemaFile from "../../fixtures/agent_service/schema/get_agent_product_schema.json"
import * as jsonSchemaBadRequest from "../../fixtures/agent_service/schema/bad_request_schema.json"

describe("Agent Product ==> /v1/agent", () =>{
    context("Positive Case - Get Agent Product", () => {
        it("Get Agent product use single valid agent id", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent',
                qs: param.getAgentProduct
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body[0].agent.agent_id).to.equal(param.getAgentProduct['agent-ids'])
                expect(response.body).to.be.jsonSchema(jsonSchemaFile);
            })
        })
        it("Get Agent product use agent id without product id", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent',
                qs: param.getAgentProductWithoutProductId
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body[0].agent.agent_id).to.equal(param.getAgentProductWithoutProductId['agent-ids'])
                expect(response.body).to.be.jsonSchema(jsonSchemaFile);
            })
        })
        it("Get Agent product use agent id without param is active", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent',
                qs: param.getAgentWithoutParamIsActive
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body[0].agent.agent_id).to.equal(param.getAgentWithoutParamIsActive['agent-ids'])
                expect(response.body).to.be.jsonSchema(jsonSchemaFile);
            })
        })
        it("Get Agent product use valid agent id is active false", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent',
                qs: param.getAgentIdIsActiveFalse
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body[0].agent.agent_id).to.equal(param.getAgentIdIsActiveFalse['agent-ids'])
                expect(response.body).to.be.jsonSchema(jsonSchemaFile);
            })
        })
        it("Get Agent product use valid agent id and product id 2", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent',
                qs: param.getAgentIdAndProductIdTwo
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body[0].agent.agent_id).to.equal(param.getAgentIdAndProductIdTwo['agent-ids'])
                // expect(response.body).to.be.jsonSchema(jsonSchemaFile);
            })
        })
    })
    context("Negative Case - Get Agent Product", () => {
        it("Get Agent product use are id not found", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent',
                failOnStatusCode: false,
                qs: param.getAgentProductNotFound
            }).should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Bad Request')
            })
        })
        it("Get Agent product without are id", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent',
                failOnStatusCode: false,
                qs: {
                    "product_id" : 1,
                    "is_active" : true
                }
            }).should((response) => {
                expect(response.status).to.eq(404)
                expect(response.body.error).to.eq('Not Found')
            })
        })
        it("Get Agent product with product id not found", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent',
                failOnStatusCode: false,
                qs: {
                    "agent-ids" : "19ae1c92-527f-4a12-a87f-a08e27ebdfd9",
                    "product_id" : 10,
                    "is_active" : true
                }
            }).should((response) => {
                expect(response.status).to.eq(404)
                expect(response.body.error).to.eq('Not Found')
            })
        })
        it("Get Agent product with product id string value", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent',
                failOnStatusCode: false,
                qs: {
                    "agent-ids" : "19ae1c92-527f-4a12-a87f-a08e27ebdfd9",
                    "product_id" : "NDF2W",
                    "is_active" : true
                }
            }).should((response) => {
                expect(response.status).to.eq(404)
                expect(response.body.error).to.eq('Not Found')
            })
        })
        it("Get Agent product with param is active string value", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent',
                failOnStatusCode: false,
                qs: {
                    "agent-ids" : "19ae1c92-527f-4a12-a87f-a08e27ebdfd9",
                    "product_id" : 1,
                    "is_active" : "active"
                }
            }).should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Bad Request')
            })
        })
        it("Get Agent product with param is active integer value", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent',
                failOnStatusCode: false,
                qs: {
                    "agent-ids" : "19ae1c92-527f-4a12-a87f-a08e27ebdfd9",
                    "product_id" : 1,
                    "is_active" : 2
                }
            }).should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Bad Request')
            })
        })
    })
})