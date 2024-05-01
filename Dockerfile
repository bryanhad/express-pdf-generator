FROM node:18.13-alpine

WORKDIR /my-node-app

COPY . /my-node-app

RUN npm ci

EXPOSE 5000

CMD ["node", "main.js"] 