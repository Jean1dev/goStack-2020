FROM node:12.13-alpine

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

ENV URL DOCKER
EXPOSE 3000
CMD [ "npm", "start" ]