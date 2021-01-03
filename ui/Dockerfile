FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install --silent

# Install package for serving static files
# https://www.npmjs.com/package/serve
RUN npm install serve --silent

# Build application for production
# Store build output in `dist/ui`
RUN npm run build:prod

CMD echo "Serving UI from http://localhost:5000"; npx serve dist/ui > /dev/null
