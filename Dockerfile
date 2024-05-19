#get image cypress included
FROM cypress/included:12.8.1
#create directory
RUN mkdir /cypress-docker
#put working directory
WORKDIR /cypress-docker
#copy file package until folder cypress to docker image
COPY ./package.json .
COPY ./cypress.config.js .
COPY ./cypress ./cypress
#install 
RUN npm install
#running cypress
# RUN ["npx", "cypress", "run"]
ENTRYPOINT ["npm", "run"]