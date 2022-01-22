FROM node:16-alpine

WORKDIR /web
RUN apk add g++ make python2
RUN npm install -g @vue/cli
COPY ./package.json .
RUN npm install