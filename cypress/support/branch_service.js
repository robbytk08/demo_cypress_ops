export class BranchService {
    getClustersByBranchId(id) {
        return this.#getClusterData('branch_id', id)
    }
    async #getClusterData(key, value) {
        const { parse } = require('fast-csv');
        const clusters = []

        const str = await cy.readFile('cypress/fixtures/clusters.csv', 'utf-8')
        const stream = parse({ headers: true })
            .validate(data => data[key] == value)
            .on('error', error => { console.log(`Error while parsing csv: ${error}`); })
            .on('data', row => clusters.push(row))
            .on('data-invalid', (row, rowNumber) => { })
            .on('end', rowCount => console.log(`rowCount: ${rowCount}`))
        stream.write(str)
        stream.end()
        return clusters
    }
}       
