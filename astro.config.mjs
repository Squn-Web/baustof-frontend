// @ts-check
import { defineConfig } from 'astro/config';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  integrations: [
    sanity({
      projectId: 'goiccr2j',
      dataset: 'production',
      useCdn: false,
    }),
    react(),
  ],
  image: {
    domains: ['cdn.sanity.io']
  }
});
