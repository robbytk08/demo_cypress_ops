describe("Verify error messages", () => {
    context('Asset Price APIs with empty values', () => {
        it('Verify error when call get pricing data without api-secret', () => {
            cy.request({
                method: 'GET',
                url: '/asset-pricing/v1/asset-pricing',
                failOnStatusCode: false,
                qs: {
                    area_pl_id: 12,
                    asset_code: 'MITSUBISHI.ALLNEWPAJEROSPORT.DAKARHIPOWER4X224AT',
                    manufacturing_year: 2021,
                    new_used: 'U',
                }
            }).should((response) => {
                expect(response.status).to.eql(401)
                expect(response.body.error).to.eql('Unauthorized')
            })
        })
        it('Verify error when call get pricing data API with empty values', () => {
            let obj = {
                area_pl_id: 12,
                asset_code: 'HONDACRV.TEST1.TEST2',
                manufacturing_year: 2019,
                new_used: 'U'
            }
            Object.keys(obj).forEach(key => {
                const tempJson = { ...obj }
                tempJson[key] = ' '
                cy.request({
                    method: 'GET',
                    headers: { 'api-secret': Cypress.env('api_secret') },
                    url: '/asset-pricing/v1/asset-pricing',
                    failOnStatusCode: false,
                    qs: tempJson
                }).should((response) => {
                    if (key === 'asset_code' || key === 'new_used') {
                        expect(response.status).to.eql(200)
                        expect(response.body.content).to.be.empty
                        expect(response.body.total_elements).to.eql(0)
                        expect(response.body.number_of_elements).to.eql(0)
                    } else if (key === 'area_pl_id') {
                        expect(response.status).to.eql(500)
                        expect(response.body.error).to.eql('Internal Server Error')
                        expect(response.body.message).to.eql('Must provide at least one of area_pl_id, branch_id, city_code, zip_code')
                    }
                    else {
                        expect(response.status).to.eql(400)
                        expect(response.body.error).to.eql('Bad Request')
                    }
                })
            });
        })
        it('Create new asset pricing data with empty values', () => {
            cy.fixture('./asset_price.json').then(dummy_pricing => {
                const { branch_id, product_id, zip_code, city_code, ...updatedHash } = dummy_pricing
                updatedHash.asset_code = 'HONDACRV.NEWEMPTY1.TEST2'
                Object.keys(updatedHash).forEach(key => {
                    const tempJson = { ...updatedHash, [key]: null }
                    cy.request({
                        method: 'POST',
                        headers: { 'api-secret': Cypress.env('api_secret') },
                        url: '/asset-pricing/v1/asset-pricing',
                        failOnStatusCode: false,
                        body: tempJson
                    }).should((response) => {
                        if (key === 'asset_code') {
                            expect(response.status).to.eql(500)
                            expect(response.body.error).to.eql('Internal Server Error')
                            expect(response.body.message).to.include('could not execute statement; SQL [n/a]; constraint [asset_code\" of relation \"asset_price]')
                        } else {
                            expect(response.status).to.eql(200)
                            if (key === 'price' || key === 'new_used') {
                                expect(response.body[key]).to.be.null
                            } else {
                                expect(response.body[key]).to.eql(0)
                            }
                        }
                    })
                });
            })
        })
    })
    context('Asset Price APIs with invalid data', () => {
        it('Verify error when call get pricing data with invalid asset_code', () => {
            cy.request({
                method: 'GET',
                url: '/asset-pricing/v1/asset-pricing',
                headers: { 'api-secret': Cypress.env('api_secret') },
                failOnStatusCode: false,
                qs: {
                    area_pl_id: 12,
                    asset_code: '%#$%$%$%',
                    manufacturing_year: 2021,
                    new_used: 'U'
                }
            }).should((response) => {
                expect(response.status).to.eql(200)
                expect(response.body.content).to.be.empty
                expect(response.body.total_elements).to.eql(0)
                expect(response.body.number_of_elements).to.eql(0)
            })
        })
        it('Verify error when call get pricing data with invalid area_pl_id', () => {
            cy.request({
                method: 'GET',
                url: '/asset-pricing/v1/asset-pricing',
                headers: { 'api-secret': Cypress.env('api_secret') },
                failOnStatusCode: false,
                qs: {
                    area_pl_id: '$@#$',
                    asset_code: 'MITSUBISHI.ALLNEWPAJEROSPORT.DAKARHIPOWER4X224AT',
                    manufacturing_year: 2021,
                    new_used: 'U'
                }
            }).should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eql('Bad Request')
            })
        })
        it('Verify error when call get pricing data with invalid manufacturing_year', () => {
            cy.request({
                method: 'GET',
                url: '/asset-pricing/v1/asset-pricing',
                headers: { 'api-secret': Cypress.env('api_secret') },
                failOnStatusCode: false,
                qs: {
                    area_pl_id: 12,
                    asset_code: 'MITSUBISHI.ALLNEWPAJEROSPORT.DAKARHIPOWER4X224AT',
                    manufacturing_year: '$@#$',
                    new_used: 'U'
                }
            }).should((response) => {
                cy.log(JSON.stringify(response))
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eql('Bad Request')
                cy.log(JSON.stringify(response.status + '-' + response.body.error))
            })
        })
        it('Verify error when call get pricing data with invalid new_used', () => {
            cy.request({
                method: 'GET',
                url: '/asset-pricing/v1/asset-pricing',
                headers: { 'api-secret': Cypress.env('api_secret') },
                failOnStatusCode: false,
                qs: {
                    area_pl_id: 12,
                    asset_code: 'MITSUBISHI.ALLNEWPAJEROSPORT.DAKARHIPOWER4X224AT',
                    manufacturing_year: 2019,
                    new_used: ' %$#^$%^&'
                }
            }).should((response) => {
                expect(response.status).to.eql(200)
                expect(response.body.content).to.be.empty
            })
        })
        it('Create new asset pricing data with invalid values', () => {
            cy.fixture('./asset_price.json').then(dummy_pricing => {
                const { branch_id, product_id, zip_code, city_code, ...updatedHash } = dummy_pricing
                updatedHash.asset_code = 'HONDACRV.NEWINVALID.TEST2'
                Object.keys(updatedHash).forEach(key => {
                    const tempJson = { ...updatedHash }
                    const specChars = '#$%$&%^*^%&*&'
                    tempJson[key] = specChars
                    cy.request({
                        method: 'POST',
                        headers: { 'api-secret': Cypress.env('api_secret') },
                        url: '/asset-pricing/v1/asset-pricing',
                        failOnStatusCode: false,
                        body: tempJson
                    }).should((response) => {
                        if (key === 'asset_code' || key === 'new_used') {
                            expect(response.status).to.eql(200)
                            expect(response.body[key]).to.be.eql(specChars)
                        } else {
                            expect(response.status).to.eql(400)
                            expect(response.body.error).to.eql('Bad Request')
                            const eStr = `(through reference chain: com.bfi.bravo.dto.AssetPriceCreateDto[\"${key}\"])`
                            expect(response.body.message).to.include(eStr)
                        }
                    })
                })
            })
        })
    })
})