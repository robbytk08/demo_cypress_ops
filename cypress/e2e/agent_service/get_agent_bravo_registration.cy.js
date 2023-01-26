import chaiJsonSchema from 'chai-json-schema'; 
chai.use(chaiJsonSchema);

import * as param from "../../fixtures/agent_service/get_agent_bravo_registration.json"
import * as jsonSchemaFile from "../../fixtures/agent_service/schema/get_agent_bravo_registration_schema.json"
import * as jsonSchemaBadRequest from "../../fixtures/agent_service/schema/bad_request_schema.json"

describe("Get agent bravo registration information ==> /v1/agent/registration/info", () => {
    context('Positive Case - Get agent bravo registration information', () => {
        it('Get agent bravo registration information complete', () => {
            cy.request({
                method: 'GET',
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent/registration/info',
                qs: param.registrationInformationComplete
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.id_number).to.equal(param.registrationInformationComplete.id_number)
                expect(response.body.id_type).to.equal(param.registrationInformationComplete.id_type)
                expect(response.body.phone_number).to.equal(param.registrationInformationComplete.phone_no)
                expect(response.body.status).to.equal('REGISTRATION_INFORMATION_COMPLETE')
                expect(response.body).to.be.jsonSchema(jsonSchemaFile);
            })
        })
        it('Get agent bravo registration information not complete', () => {
            cy.request({
                method: 'GET',
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent/registration/info',
                qs: param.registrationNotComplete
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.id_number).to.equal(param.registrationNotComplete.id_number)
                expect(response.body.id_type).to.equal(param.registrationNotComplete.id_type)
                expect(response.body.phone_number).to.equal(param.registrationNotComplete.phone_no)
                expect(response.body.status).to.equal('REGISTRATION_INFORMATION_NOT_COMPLETE')
                expect(response.body).to.be.jsonSchema(jsonSchemaFile);
              })
        })
    })
    context('Negative Case - Get agent bravo registration information', () => {
        it('Get agent bravo registration information without id type', () => {
            cy.request({
                method: 'GET',
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent/registration/info',
                failOnStatusCode: false,
                qs: param.withoutIdType
            }).should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.equal(`ID number and ID type can't be empty.`)
            })
        })
        it('Get agent bravo registration information without id number', () => {
            cy.request({
                method: 'GET',
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'agent/v1/agent/registration/info',
                failOnStatusCode: false,
                qs: param.withoutIdNumber
            }).should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.equal(`ID number and ID type can't be empty.`)
            })
        })
    })
})