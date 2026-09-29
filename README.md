# Son Junhyuck — Game Development Portfolio

Astro 기반 GitHub Pages 사이트입니다.

## Local development

```bash
pnpm install
pnpm dev
```

## GitHub Pages deployment

The workflow at `.github/workflows/deploy.yml` builds and deploys every push to `main`.
In GitHub, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.

This is the root Pages repository and is configured for `https://sonjunhyuck.github.io/`.

## Content

- About content: `src/pages/index.astro`
- Projects: add a Markdown file to `src/content/projects/`
- DevLog cards: add a Markdown file to `src/content/devlog/` with its public Notion URL

See `docs/CONTENT_GUIDE.md` for the fields and publishing flow. Items currently marked `isExample: true` are clearly labelled example content and should be replaced when verified material is available.
