FROM node:18.12.1
#RUN apk add --update --no-cache openss11.1-compat
WORKDIR /Customer
COPY package*.json .
COPY . .
COPY ../config ./config
RUN npm install
EXPOSE 1234
CMD [ "yarn","start" ]
