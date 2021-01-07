```diff
- Project is in alpha - doesn't work yet.
```

![CI master api](https://github.com/Kexplx/scrape-app/workflows/CI%20master%20api/badge.svg)
![CI master ui](https://github.com/Kexplx/scrape-app/workflows/CI%20master%20ui/badge.svg)

# HTML scrape app

An app for scheduling jobs which periodically scrape the content of a web page and expose the results through a REST API.

## Prerequisities

In order to run the project you'll need docker and docker compose installed.

- [Windows](https://docs.docker.com/windows/started)
- [OS X](https://docs.docker.com/mac/started/)
- [Linux](https://docs.docker.com/linux/started/)

### Usage

#### Run the application

```shell
docker-compose up
```

Afterwards, the following endpoints should be available.

<ul>
  <li><b>UI</b>: http://localhost:5000</li>
  <li><b>API</b>: http://localhost:3000/jobs</li>
  <li><b>MongoDB</b>: mongodb://scrape-app__mongodb:27017</li>
</ul>

## Contribute

Run `npm run format` inside `/ui` or `/api` before pushing to apply our style guidelines and make the linter pass.
