ARG NODE_VERSION=18.15.0-alpine

FROM node:${NODE_VERSION}

LABEL name="mern-invoice"
LABEL license="MIT"
LABEL description="MERN invoice image"

ENV NODE_ENV=development

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

# adding a group with name "invoice"
# adding a user named "invoice" in the group "invoice"
RUN addgroup --system invoice \
    && adduser --system --ingroup invoice invoice

COPY package*.json ./

RUN npm install

COPY --chown=invoice:invoice . ${APP_HOME}

RUN chown invoice:invoice ${APP_HOME}

USER invoice

CMD [ "npm", "run", "dev" ]