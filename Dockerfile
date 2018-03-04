FROM node

ENV PARSE_HOME /parse
RUN mkdir -p ${PARSE_HOME}
ENV PORT 1337

# ENV APP_ID someappid
# ENV MASTER_KEY somemasterkey
# ENV DATABASE_URI mongodb://mongo/test

ADD ./package.json ${PARSE_HOME}
ENV CLOUD_CODE_HOME ${PARSE_HOME}/cloud

# RUN mkdir -p ${CLOUD_CODE_HOME}

ADD ./cloud $CLOUD_CODE_HOME/

WORKDIR ${PARSE_HOME}
RUN npm install

ADD ./index.js ${PARSE_HOME}

VOLUME $CLOUD_CODE_HOME
ENV NODE_PATH .

CMD ["npm", "start"]