FROM cypress/base:18.15.0

WORKDIR /tests

COPY ./package.json .
COPY ./cypress.config.js .
COPY ./cypress ./cypress

RUN npm install

CMD ["npx", "cypress", "run"]