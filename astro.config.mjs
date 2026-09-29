import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sonjunhyuck.github.io',
  base: '/SonnySmile.github.io',
  integrations: [sitemap()],
});
