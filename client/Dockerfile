FROM alpine:3.5

MAINTAINER Vinicius <viniciusgued@gmail.com>

RUN apk --no-cache add nodejs
RUN npm install -g serve

RUN mkdir -p /home/sossego-drones-client
WORKDIR /home/sossego-drones-client

COPY build/ ./

EXPOSE 3000
CMD ["serve","-s","-p", "3000"]