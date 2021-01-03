FROM node:latest

WORKDIR /usr/src/app

COPY . .

# Set inProduction flag to `true`
RUN echo "export const inProduction = true" > ./src/env/in-production.ts

RUN npm i

EXPOSE 3000

CMD ["npm", "start"]