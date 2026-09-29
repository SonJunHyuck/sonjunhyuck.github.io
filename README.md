# SonnySmile Portfolio & Development Blog

Astro 기반 GitHub Pages 사이트입니다.

## Local development

```bash
npm install
npm run dev
```

## GitHub Pages deployment

The workflow at `.github/workflows/deploy.yml` builds and deploys every push to `main`.
In GitHub, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.

The configured URL is `https://sonjunhyuck.github.io/SonnySmile.github.io/` because this is a project Pages repository. If the repository is renamed to `SonJunHyuck.github.io` or a custom domain is attached, update `site` and `base` in `astro.config.mjs` before deploying.
