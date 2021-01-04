```diff
- Project is in alpha - doesn't work yet.
```
# HTML scrape app

![CI master api](https://github.com/Kexplx/scrape-app/workflows/CI%20master%20api/badge.svg)
![CI master ui](https://github.com/Kexplx/scrape-app/workflows/CI%20master%20ui/badge.svg)

An app for scheduling jobs which periodically scrape the content of a web page and expose the results through a REST API.

## Installation

1. Install Docker and Docker Compose
2. Clone the project
3. Run `docker-compose up` inside the project root

## Available endpoints after `docker-compose up`

<ul>
  <li><b>UI</b>: http://localhost:5000</li>
  <li><b>API</b>: http://localhost:3000/jobs</li>
  <li><b>MongoDB</b>: mongodb://scrape-app__mongodb:27017</li>
</ul>

## Contribute

Run `npm run format` before each commit to apply prettier style guidelines and make linter pass.
