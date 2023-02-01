import chaiJsonSchema from 'chai-json-schema'; 
chai.use(chaiJsonSchema);

import * as param from "../../fixtures/edoc_service/get_document_config.json"
import * as jsonSchemaFile from "../../fixtures/edoc_service/schema/get_document_config_schema.json"

describe("Get Document Config ==> /edoc/v1/config", () =>{
    context("Positive Case - Document config", () => {
        it("Get document config product NDF Car", () => {
            cy.request({
                method: "GET",
                url: 'edoc/v1/config',
                qs: param.getDocumentConfigNDFCar
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body[0].document_type).to.equal('KIK')
                expect(response.body).to.be.jsonSchema(jsonSchemaFile);
            })
        })
    })
    context("Negative Case - Document config", () => {
        it("Get document config with product not found", () => {
            cy.request({
                method: "GET",
                headers: { 'api-secret': Cypress.env('api_secret') },
                url: 'edoc/v1/config',
                qs: param.getDocumentConfigProductNotFound
            }).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.empty
            })
        })
    })
})