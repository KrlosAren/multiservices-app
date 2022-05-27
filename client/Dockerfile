FROM node:16


ARG APP_HOME=/client
# Create app directory
WORKDIR ${APP_HOME}

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./client/package*.json ${APP_HOME}

RUN npm install --silent
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./client ${APP_HOME}

EXPOSE 3000
CMD [ "npm","run","dev" ]