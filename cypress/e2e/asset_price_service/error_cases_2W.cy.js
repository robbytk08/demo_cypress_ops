describe("Asset Price Service - 2 Wheelers", () => {
    beforeEach(() => {
        cy.fixture('asset_price_2W.json').as('asset_price_2W')
    })
    context('Asset Price APIs - Get pricing data for 2 wheelers with default product_id', () => {
        beforeEach(() => {
            cy.get('@asset_price_2W').then(hash => {
                hash.product_id = 1
                cy.wrap(hash).as('2W_def_prod_id')
            })
        })
        it('Get pricing data by location, asset, year', () => {
            cy.get('@asset_price_2W').then(hash => {
                const { product_id, branch_id, zip_code, city_code, ...updatedHash } = hash
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
            cy.get('@2W_def_prod_id').then(hash => {
                const { zip_code, city_code, price, area_pl_id, ...qs } = hash
                cy.request({
                    method: 'GET',
                    headers: { 'api-secret': Cypress.env('api_secret') },
                    url: '/asset-pricing/v1/asset-pricing',
                    qs: qs
                }).should((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body.content).to.be.empty
                })
            })
        })
        it('Get pricing data by city_code, asset, year', () => {
            cy.get('@2W_def_prod_id').then(hash => {
                const { branch_id, zip_code, price, area_pl_id, ...qs } = hash
                cy.request({
                    method: 'GET',
                    headers: { 'api-secret': Cypress.env('api_secret') },
                    url: '/asset-pricing/v1/asset-pricing',
                    qs: qs
                }).should((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body.content).to.be.empty
                })
            })
        })
        it('Get pricing data by zip_code, asset, year', () => {
            cy.get('@2W_def_prod_id').then(hash => {
                const { branch_id, city_code, price, area_pl_id, ...qs } = hash
                cy.request({
                    method: 'GET',
                    headers: { 'api-secret': Cypress.env('api_secret') },
                    url: '/asset-pricing/v1/asset-pricing',
                    qs: qs
                }).should((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body.content).to.be.empty
                })
            })
        })
    })
    context('Asset Price APIs - Get pricing data for 2 wheelers with invalid data', () => {
        it('Get pricing data with invalid location', () => {
            cy.get('@asset_price_2W').then(hash => {
                const { price, branch_id, zip_code, city_code, ...qs } = hash
                qs.area_pl_id = '000000'
                cy.request({
                    method: 'GET',
                    headers: { 'api-secret': Cypress.env('api_secret') },
                    url: '/asset-pricing/v1/asset-pricing',
                    qs: qs
                }).should((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body.content).to.be.empty
                })
            })
        })
        it('Get pricing data with invalid branch', () => {
            cy.get('@asset_price_2W').then(hash => {
                const { area_pl_id, price, branch_id, zip_code, city_code, ...qs } = hash
                qs.branch_id = '000000'
                cy.request({
                    failOnStatusCode: false,
                    method: 'GET',
                    headers: { 'api-secret': Cypress.env('api_secret') },
                    url: '/asset-pricing/v1/asset-pricing',
                    qs: qs
                }).should((response) => {
                    expect(response.status).to.eql(500)
                    expect(response.body.message).to.be.contain('[404 Not Found]')
                })
            })
        })
        it('Get pricing data with invalid city_code', () => {
            cy.get('@asset_price_2W').then(hash => {
                const { area_pl_id, price, branch_id, zip_code, ...qs } = hash
                qs.city_code = '000000'
                cy.request({
                    method: 'GET',
                    headers: { 'api-secret': Cypress.env('api_secret') },
                    url: '/asset-pricing/v1/asset-pricing',
                    qs: qs
                }).should((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body.content).to.be.empty
                })
            })
        })
        it('Get pricing data with invalid zip_code', () => {
            cy.get('@asset_price_2W').then(hash => {
                const { area_pl_id, price, branch_id, city_code, ...qs } = hash
                qs.zip_code = '000000'
                cy.request({
                    method: 'GET',
                    headers: { 'api-secret': Cypress.env('api_secret') },
                    url: '/asset-pricing/v1/asset-pricing',
                    qs: qs
                }).should((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body.content).to.be.empty
                })
            })
        })
    })
})