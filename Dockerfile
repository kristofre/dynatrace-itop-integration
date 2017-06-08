FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN NPM install

COPY . /urs/src/app

CMD [ "npm", "start" ]