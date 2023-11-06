import * as param from "../../fixtures/asset_information.json"

describe("Asset Information", () => {
    context('Asset APIs - Get assets information', () => {
        it('Get asset information by Level 1 and Asset Type Id MOBIL', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: '/asset-pricing/v1/asset',
              qs: param.filterByLevelOneMobil
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.content[0].level).to.deep.equal(param.filterByLevelOneMobil.level)
              expect(response.body.content[0].asset_type_id).to.deep.equal(param.filterByLevelOneMobil.asset_type_id)
            })
        })
        it('Get asset information by Level 2 and Asset Type Id MOBIL', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: '/asset-pricing/v1/asset',
              qs: param.filterByLevelTwoMobil
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.content[0].level).to.deep.equal(param.filterByLevelTwoMobil.level)
              expect(response.body.content[0].asset_type_id).to.deep.equal(param.filterByLevelTwoMobil.asset_type_id)
              expect(response.body.content[0].commercial_description).to.have.string('20')
            })
        })
        it('Get asset information by Level 3 and Asset Type Id MOBIL', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: '/asset-pricing/v1/asset',
              qs: param.filterByLevelThreeMobil
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.content[0].level).to.deep.equal(param.filterByLevelThreeMobil.level)
              expect(response.body.content[0].asset_type_id).to.deep.equal(param.filterByLevelThreeMobil.asset_type_id)
            })
        })
        it('Get asset information by Level 1 and Asset Type Id MOTOR', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: '/asset-pricing/v1/asset',
              qs: param.filterByLevelOneMotor
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.content[0].level).to.deep.equal(param.filterByLevelOneMotor.level)
              expect(response.body.content[0].asset_type_id).to.deep.equal(param.filterByLevelOneMotor.asset_type_id)
            })
        })
        it('Get asset information by Level 2 and Asset Type Id MOTOR', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: '/asset-pricing/v1/asset',
              qs: param.filterByLevelTwoMotor
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.content[0].level).to.deep.equal(param.filterByLevelTwoMotor.level)
              expect(response.body.content[0].asset_type_id).to.deep.equal(param.filterByLevelTwoMotor.asset_type_id)
            })
        })
        it('Get asset information by Level 3 and Asset Type Id MOTOR', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: '/asset-pricing/v1/asset',
              qs: param.filterByLevelThreeMotor
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.content[0].level).to.deep.equal(param.filterByLevelThreeMotor.level)
              expect(response.body.content[0].asset_type_id).to.deep.equal(param.filterByLevelThreeMotor.asset_type_id)
            })
        })
        it('Get asset information by Level 1 and Asset Type Id MACHINE', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: '/asset-pricing/v1/asset',
              qs: param.filterByLevelOneMachine
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.content[0].level).to.deep.equal(param.filterByLevelOneMachine.level)
              expect(response.body.content[0].asset_type_id).to.deep.equal(param.filterByLevelOneMachine.asset_type_id)
            })
        })
        it('Get asset information by Level 2 and Asset Type Id MACHINE', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: '/asset-pricing/v1/asset',
              qs: param.filterByLevelTwoMachine
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.content[0].level).to.deep.equal(param.filterByLevelTwoMachine.level)
              expect(response.body.content[0].asset_type_id).to.deep.equal(param.filterByLevelTwoMachine.asset_type_id)
            })
        })
        it('Get asset information by Level 3 and Asset Type Id MACHINE', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: '/asset-pricing/v1/asset',
              qs: param.filterByLevelThreeMachine
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.content[0].level).to.deep.equal(param.filterByLevelThreeMachine.level)
              expect(response.body.content[0].asset_type_id).to.deep.equal(param.filterByLevelThreeMachine.asset_type_id)
            })
        })
        it('Get asset information filter page two', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: '/asset-pricing/v1/asset',
              qs: param.filterPageTwo
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.pageable.page_number).to.equal(1)
            })
        })
        it('Get asset information filter page two and ten limit', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: '/asset-pricing/v1/asset',
              qs: param.filterPageTwoWithLimitPage
            }).should((response) => {
              let resContent = response.body.content
              let sizeContent = resContent.length
              expect(response.status).to.eq(200)
              expect(response.body.pageable.page_number).to.equal(1)
              expect(response.body.pageable.page_size).to.equal(sizeContent)
            })
        })
        it('Get asset information with limit content greaten Than Twenty', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: '/asset-pricing/v1/asset',
              qs: param.filterWithLimitPageGreatenThanTwenty
            }).should((response) => {
              let resContent = response.body.content
              let sizeContent = resContent.length
              expect(response.status).to.eq(200)
              expect(response.body.pageable.page_size).to.equal(sizeContent)
            })
        })
        it('Get asset information sorting by code', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: '/asset-pricing/v1/asset',
              qs: param.sortByCode
            }).should((response) => {
              let resContent = response.body.content
              let sizeContent = resContent.length
              expect(response.status).to.eq(200)
              expect(response.body.pageable.page_size).to.equal(sizeContent)
            })
        })
        it('Get asset information by Level not available', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: '/asset-pricing/v1/asset',
              qs: param.filterByLevelNotAvailable
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.content).to.be.empty
            })
        })
        it('Get asset information by Asset Type Id not available', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: '/asset-pricing/v1/asset',
              qs: param.filterByAssetTypeIdNotAvailable
            }).should((response) => {
              expect(response.status).to.eq(200)
              expect(response.body.content).to.be.empty
            })
        })
        it('Get asset information by Level with string value', () => {
            cy.request({
              method: 'GET',
              headers: { 'api-secret': Cypress.env('api_secret') },
              url: '/asset-pricing/v1/asset',
              failOnStatusCode: false,
              qs: param.filterByLevelString
            }).should((response) => {
              expect(response.status).to.eq(400)
              // expect(response.body.error).to.eql('Bad Request')
            })
        })
        it('Get asset information by Level 2 and Asset Type Id MOBIL', () => {
          cy.request({
            method: 'GET',
            headers: { 'api-secret': 'InvalidKey' },
            url: '/asset-pricing/v1/asset',
            failOnStatusCode: false,
            qs: param.filterByLevelTwoMobil
          }).should((response) => {
            expect(response.status).to.eq(401)
            expect(response.body.error).to.equal('Unauthorized')
          })
      })
    })
  })