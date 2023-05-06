FROM node:18
#RUN apk add --update --no-cache openssll.1-compat
WORKDIR /marketer
COPY  package*.json .
COPY  . .
COPY ../config ./config
RUN npm i
EXPOSE 4321
CMD [ "yarn" , "start" ]

