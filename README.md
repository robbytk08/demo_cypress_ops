# explore for demo
 Project contains test scripts for :
 
 Restful APIs :
 
    - Master Address Service
    -- API Get Provinve
    -- API Get City

 UI Automation :
    
    Login website demo https://practicetestautomation.com/practice-test-login/


## 1. Project Installation
### 1.1 Tools
- NodeJS
- Visual Studio Code / IntelliJ
- Docker desktop

### 1.2 Set up
- Clone source code at: https://github.com/robbytk08/demo_cypress_ops.git
- Open terminal at `root` level
- Run `npm install` to insall all libraries defined in `package.json`

## 2. Install new library
- `npm install` **package_name**

## 3. Project configuration
Defined in `cypress.config.js`:

- ***projectId***: projectId to integrate with Cypress Dashboard
- ***reporterOptions***: report configuration in HTLM/JSON
- ***e2e***: configuration for `e2e` test

## 4. Running

- ***For running in your local machine in dashboard Cypress*** : please use command `npx cypress open`
- ***For running in your local machine use specific test*** : please use command `npx cypress run --spec "cypress/e2e/master_service/get_province_list.cy.js"`
- ***For running in Docker with single browser*** : please use command `docker-compose run e2e-chrome`
- ***For running in Docker parallel with different browser*** : please use command `docker-compose up`