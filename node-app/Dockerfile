FROM node:16


ARG APP_HOME=/node-app
# Create app directory
WORKDIR ${APP_HOME}

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./node-app/package*.json ${APP_HOME}

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./node-app ${APP_HOME}

EXPOSE 4500
CMD [ "npm","run","dev" ]