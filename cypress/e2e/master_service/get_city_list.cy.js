import * as param from "../../fixtures/city_information.json"

describe("Adress City Information", () => {
    context('Address APIs - Get City information', () => {
        it('Get city information by page and limit', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: '/master/v1/address/city',
              qs: param.filterByPageAndLimit
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.size).to.equal(20)
            })
        })
        it('Get city information by province code', () => {
          cy.request({
            method: 'GET',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: '/master/v1/address/city',
            qs: param.filterByProvinceCode
          }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.size).to.equal(20)
            expect(response.body.content[0].province_code).to.equal(param.filterByProvinceCode.province_code)
          })
        })
        it('Get city information by city code', () => {
          cy.request({
            method: 'GET',
            headers: { 'api-secret': Cypress.env('api_secret') },
            url: '/master/v1/address/city',
            qs: param.filterByCityCode
          }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.size).to.equal(20)
            expect(response.body.content[0].code).to.equal(param.filterByCityCode.city_code)
          })
        })
    })
  })