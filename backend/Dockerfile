FROM node:12.13-alpine

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

ENV PORT 8080
ENV URL DOCKER
ENV REDIS_URL redis

EXPOSE $PORT

RUN npx typeorm migration:run
#RUN npm run migrate
CMD [ "npm", "run", "local" ]