FROM node:alpine
RUN apk add --update --no-cache openssl
WORKDIR /Marketer
COPY package*.json .
COPY  . .
COPY ../config ./config
RUN npm i
EXPOSE 4321
CMD [ "node" ,"index.js" ]
