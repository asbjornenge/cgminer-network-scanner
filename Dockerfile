FROM node:9 as builder
RUN npm install -g pkg@4.3.1
ADD . /app
WORKDIR /app
RUN pkg --target node9-linux index.mjs
