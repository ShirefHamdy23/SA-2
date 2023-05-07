FROM node:alpine
RUN apk add --update --no-cache openssl
WORKDIR /Client
COPY package*.json .
COPY . .
COPY ../config ./config
RUN npm i
RUN npm i -g prisma
RUN npx prisma generate
EXPOSE 1234
CMD [ "node","index.js" ] 
