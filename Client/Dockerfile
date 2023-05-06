FROM node:alpine
RUN apk add --update --no-cache openssl
WORKDIR /Customer
COPY package*.json .
COPY . .
COPY ../config ./config
RUN npm i -g prisma
RUN prisma generate
RUN npm i
EXPOSE 1234
CMD [ "node","index.js" ] 
