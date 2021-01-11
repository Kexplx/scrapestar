FROM node:latest

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

# Install package for serving static files
# https://www.npmjs.com/package/serve
RUN npm install serve

COPY . .

# Build application for production
# Store build output in `dist/ui`
RUN npm run build:prod

CMD echo "Serving UI from http://localhost:5005"; npx serve -l 5005 dist/ui -s > /dev/null
