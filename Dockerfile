FROM node:18-alpine

# add time zone as default asia/jakarta
RUN apk update && apk add --no-cache tzdata
ENV TZ="Asia/Jakarta"

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

USER node

RUN npm install && npm cache clean --force --loglevel=error

COPY --chown=node:node . .

CMD [ "node", "dist/app"]
