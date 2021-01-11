![CI master api](https://github.com/Kexplx/scrapestar/workflows/CI%20master%20api/badge.svg)
![CI master ui](https://github.com/Kexplx/scrapestar/workflows/CI%20master%20ui/badge.svg)

# ⭐ Scrapestar ⭐

HTML scraping made easy. Setup jobs, and retrieve the results through a REST API.

<a href="https://www.youtube.com/embed/V1UMi-HkJvI" target="_blank">Demo</a>

## Prerequisities

In order to run the project you'll need docker and docker compose installed.

### Usage

#### Run the application

```shell
docker-compose up
```

Afterwards, the following endpoints should be available.

<ul>
  <li><b>UI</b>: http://localhost:5005</li>
  <li><b>API</b>: http://localhost:3000/jobs</li>
</ul>

## Contribute

Run `npm run format` inside `/ui` or `/api` before pushing to apply our style guidelines and make the linter pass.
