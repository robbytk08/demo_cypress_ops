const { defineConfig } = require("cypress");
const fs = require('fs-extra')
const path = require('path')

function getConfigurationFile(env) {
  const configFile = path.resolve('cypress/config', `${env}.json`)
  return fs.readJson(configFile);
}

module.exports = defineConfig({
  projectId: "2o4x3s",
  reporter: 'mochawesome',
  reporterOptions: {
    showHooks: 'always',
    reportDir: './cypress/reports',
    timestamp: "ddmmyyyy_HHMMss",
    reportFilename: "[name]",
    overwrite: false,
    html: true,
    json: false
  },
  e2e: {
    // specPattern: 'cypress/e2e/**/*.cy.js'
    supportFile: 'cypress/support/e2e.js',
    env: {
      ENVIRONMENT: 'sit',
      printLogsToConsole: 'always',//'onFail' // 'always' // 'never';
      printLogsToFile: 'never',//'onFail' // 'always' // 'never';
      logToFilesOnAfterRun: false,
      trashAssetsBeforeRuns: true
    },

    setupNodeEvents(on, config) {
      const options = {
        outputRoot: config.projectRoot + '/cypress/',
        specRoot: 'cypress/e2e',
        outputTarget: {
          'logs|txt': 'txt',
          // 'logs|json': 'json',
        }
      }
      const file = config.env.ENVIRONMENT || 'dev'

      options.printLogsToConsole = config.env.printLogsToConsole
      options.printLogsToFile = config.env.printLogsToFile
      require('cypress-terminal-report/src/installLogsPrinter')(on, options)

      return config && getConfigurationFile(file)
    },
  },
})
