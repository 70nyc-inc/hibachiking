# Hibachi King

Static website for [hibachikingusa.com](https://www.hibachikingusa.com) — private hibachi catering at home.

## Build

```bash
node build.mjs
```

Page copy lives in `build.mjs`. Re-run the build after editing it. `style.css`, `script.js`, and `media/` are not generated.

## Deploy (Cloudflare)

```bash
npx wrangler deploy
```

Attach the custom domain `www.hibachikingusa.com` in the Cloudflare dashboard after the first deploy.

## Contents

Pre-built HTML, CSS, JS, `_redirects`, `sitemap.xml`, and `llms.txt`.
