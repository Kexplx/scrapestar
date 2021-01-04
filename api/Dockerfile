FROM node:latest

WORKDIR /usr/src/app

COPY . .

ENV NODE_ENV=production

RUN npm i

EXPOSE 3000

CMD ["npm", "start"]