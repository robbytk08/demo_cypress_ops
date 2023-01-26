describe("Asset Price Service - 2 Wheelers", () => {
  context('Asset Price APIs - Get pricing data', () => {
    beforeEach(() => {
      cy.fixture('asset_price_2W.json').as('asset_price_2W')
    })
    it('Get pricing data by location, asset, year', () => {
      cy.get('@asset_price_2W').then(hash => {
        const { branch_id, zip_code, city_code, ...updatedHash } = hash
        const { price, ...qs } = updatedHash
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: '/asset-pricing/v1/asset-pricing',
          qs: qs
        }).should((response) => {
          delete updatedHash.product_id
          expect(response.status).to.eql(200)
          expect(response.body.content[0]).to.deep.equal(updatedHash)
        })
      })
    })
    it('Get pricing data by branch_id, asset, year', () => {
      cy.get('@asset_price_2W').then(hash => {
        const { zip_code, city_code, ...updatedHash } = hash
        const { price, area_pl_id, ...qs } = updatedHash
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: '/asset-pricing/v1/asset-pricing',
          qs: qs
        }).should((response) => {
          const { branch_id, product_id, ...eHash } = updatedHash
          expect(response.status).to.eql(200)
          expect(response.body.content[0]).to.deep.equal(eHash)
        })
      })
    })
    it('Get pricing data by city_code, asset, year', () => {
      cy.get('@asset_price_2W').then(hash => {
        const { branch_id, zip_code, ...updatedHash } = hash
        const { price, area_pl_id, ...qs } = updatedHash
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: '/asset-pricing/v1/asset-pricing',
          qs: qs
        }).should((response) => {
          const { city_code, product_id, ...eHash } = updatedHash
          expect(response.status).to.eql(200)
          expect(response.body.content[0]).to.deep.equal(eHash)
        })
      })
    })
    it('Get pricing data by zip_code, asset, year', () => {
      cy.get('@asset_price_2W').then(hash => {
        const { branch_id, city_code, ...updatedHash } = hash
        const { price, area_pl_id, ...qs } = updatedHash
        cy.request({
          method: 'GET',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: '/asset-pricing/v1/asset-pricing',
          qs: qs
        }).should((response) => {
          const { zip_code, product_id, ...eHash } = updatedHash
          expect(response.status).to.eql(200)
          expect(response.body.content[0]).to.deep.equal(eHash)
        })
      })
    })
    it('Create new asset pricing data for 2 wheelers', () => {
      cy.get('@asset_price_2W').then((hash) => {
        const { branch_id, product_id, zip_code, city_code, ...updatedHash } = hash
        updatedHash.asset_code = 'MOTOR.NEW.TEST'
        updatedHash.price = 123456789
        cy.request({
          method: 'POST',
          headers: { 'api-secret': Cypress.env('api_secret') },
          url: '/asset-pricing/v1/asset-pricing',
          body: updatedHash
        }).should((response) => {
          expect(response.status).to.eql(200)
          expect(response.body).to.deep.equal(updatedHash)
        })
      })
    })
  })
})