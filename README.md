![CI master api](https://github.com/Kexplx/scrapestar/workflows/CI%20master%20api/badge.svg)
![CI master ui](https://github.com/Kexplx/scrapestar/workflows/CI%20master%20ui/badge.svg)

# ⭐ Scrapestar ⭐

HTML scraping made easy. Schedule recurring jobs and fetch their results from a simple REST API.

See the <a href="https://www.youtube.com/watch?v=V1UMi-HkJvI" target="_blank">Demo</a> on YouTube.

## Prerequisites

In order to run the project you'll need <strong>docker</strong> and <strong>docker-compose</strong> installed.

Because of a modern `docker-compose.yml` format, you need a docker-compose version >= 1.6.

### Usage

#### Run the application

```shell
docker-compose up
```

The following endpoints should be available:

<ul>
  <li><b>UI</b> at http://localhost:5005</li>
  <li><b>API</b> at http://localhost:3000/jobs</li>
</ul>

## Contribute

Run `npm run format` inside `/ui` or `/api` before pushing to apply our style guidelines and make the linter pass 👍.
