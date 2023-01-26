# bravo-dms-automation
 Project contains test scripts for Restful APIs in
 
    - Master Service
    - Agent Service
    - Product Service
    - Asset Pricing Service
    - Branch Service
    - Document Service

## 1. Project Installation
### 1.1 Tools
- NodeJS
- Visual Studio Code / IntelliJ

### 1.2 Set up
- Clone source code at: https://github.com/bfi-finance/bravo-dms-automation
- Open terminal at `root` level
- Run `npm install` to insall all libraries defined in `package.json`

## 2. Install new library
- `npm install` **package_name**

## 3. Project configuration
Defined in `cypress.config.js`:

- ***projectId***: projectId to integrate with Cypress Dashboard
- ***reporterOptions***: report configuration in HTLM/JSON
- ***e2e***: configuration for `e2e` test
