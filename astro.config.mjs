import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sonjunhyuck.github.io',
  integrations: [sitemap({
    filter: (page) => !new URL(page).pathname.startsWith('/highlights/'),
  })],
});
