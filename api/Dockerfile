FROM alpine:3.5

MAINTAINER Vinicius <viniciusgued@gmail.com>

RUN apk --no-cache add nodejs

RUN mkdir -p /home/sossego-drones-api
WORKDIR /home/sossego-drones-api

COPY src/ ./src
COPY .env package.json server.js ./

RUN npm install

EXPOSE 3001
CMD ["npm","run","start"]