import * as param from "../../fixtures/province_information.json"

describe("Adress Province Information", () => {
    context('Address APIs - Get Province information', () => {
        it('Get province information by page and limit', () => {
            cy.request({
              method: 'GET',
              url: '/master/v1/address/province',
              qs: param.filterByPageAndLimit
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.size).to.equal(20)
            })
        })
        it('Get city information by province code', () => {
          cy.request({
            method: 'GET',
            url: '/master/v1/address/province',
            qs: param.filterByProvinceCode
          }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.size).to.equal(20)
            expect(response.body.content[0].code).to.equal(param.filterByProvinceCode.province_code)
          })
      })
    })
  })