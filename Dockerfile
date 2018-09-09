FROM node:9-alpine as builder
RUN npm install -g pkg@4.3.1
ADD . /app
WORKDIR /app
RUN pkg --target node9-alpine index.js

FROM alpine:latest as final
RUN echo http://dl-cdn.alpinelinux.org/alpine/edge/testing >> /etc/apk/repositories
RUN apk add --update arp-scan libgcc libstdc++
COPY --from=builder /app/index /bin/scanner
RUN chmod +x /bin/scanner
RUN mkdir /lib64 && ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2
