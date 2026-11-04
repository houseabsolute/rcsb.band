# rcsb.band

The website for Rainbow County School Board.

**Want to change something on the site? See [EDITING.md](EDITING.md).**

## How it works

This is a static site built with [Eleventy](https://www.11ty.dev/).

- `content/` holds everything an editor would touch: YAML data files, the bio in Markdown, and
  photos.
- `site/` holds the page template, styles, and favicon.
- `eleventy.config.js` wires them together and checks the content for common mistakes.
- `render.yaml` tells [Render](https://render.com/) how to build and host the site.

## Running it locally

```sh
mise install
npm install
npm run dev
```

Then open http://localhost:8080. The page reloads when you save a file.

## Hosting on Render

1. Push this repo to GitHub.
2. In the Render dashboard, choose **New**, then **Blueprint**, and pick this repo. Render reads
   `render.yaml` and creates a static site.
3. Point DNS for `rcsb.band` and `www.rcsb.band` at Render. The dashboard shows the records to add
   under the site's **Custom Domains** settings.

Every push to the default branch rebuilds and deploys the site.
