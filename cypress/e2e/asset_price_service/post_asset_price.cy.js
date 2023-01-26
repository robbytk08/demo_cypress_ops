import * as req from "../../fixtures/asset_price_data.json"

describe("Asset price", () => {
    context('Asset APIs - Post assets price', () => {
        it('Create asset price with valid data', () => {
            cy.request({
              method: 'POST',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: '/asset-pricing/v1/asset-pricing',
              body: req.bodyRequestValid
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.price).to.equal(req.bodyRequestValid.price)
              expect(response.body.manufacturing_year).to.equal(req.bodyRequestValid.manufacturing_year)
            })
        })
        it('Create asset price with update manufacturing year', () => {
          cy.request({
            method: 'POST',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: '/asset-pricing/v1/asset-pricing',
            body: req.updateManufactureYear
          }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.price).to.equal(req.updateManufactureYear.price)
            expect(response.body.manufacturing_year).to.equal(req.updateManufactureYear.manufacturing_year)
          })
          cy.request({
            method: 'GET',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: '/asset-pricing/v1/asset',
            qs: req.getVerifyUpdateManufactureYear
          }).should((responseAssInfo) => {
            expect(responseAssInfo.status).to.equal(200)
            expect(responseAssInfo.body.content[0].commercial_description).to.have.string(req.updateManufactureYear.manufacturing_year)
          })
      })
        it('Create asset price with price value string', () => {
          cy.request({
            method: 'POST',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: '/asset-pricing/v1/asset-pricing',
            failOnStatusCode: false,
            body: req.priceWithValueString
          }).should((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.error).to.equal('Bad Request')
          })
        })
        it('Create asset price with manufacturing year value string', () => {
          cy.request({
            method: 'POST',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: '/asset-pricing/v1/asset-pricing',
            failOnStatusCode: false,
            body: req.manufacturingYearWithValueString
          }).should((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.error).to.equal('Bad Request')
          })
        })
        it('Create asset price with area pl id value string', () => {
          cy.request({
            method: 'POST',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: '/asset-pricing/v1/asset-pricing',
            failOnStatusCode: false,
            body: req.areaPlIdWithValueString
          }).should((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.error).to.equal('Bad Request')
          })
        })
        it('Create asset price with asset code not found', () => {
          cy.request({
            method: 'POST',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: '/asset-pricing/v1/asset-pricing',
            failOnStatusCode: false,
            body: req.assetCodeNotFound
          }).should((response) => {
            expect(response.status).to.eq(500)
            expect(response.body.error).to.equal('Internal Server Error')
          })
        })
        it('Create asset price with invalid key', () => {
          cy.request({
            method: 'POST',
            headers: { 'api-secret': 'invalidKey' },
            url: '/asset-pricing/v1/asset-pricing',
            failOnStatusCode: false,
            body: req.bodyRequestValid
          }).should((response) => {
            expect(response.status).to.eq(401)
            expect(response.body.error).to.equal('Unauthorized')
          })
        })
    })
  })