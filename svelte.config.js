import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';

import accos from './src/lib/conf/accos.json' with { type: 'json' };
import translations from './src/lib/conf/translations.json' with { type: 'json' };
import settings from './src/lib/conf/settings.json' with { type: 'json' };

const baseEntries = ['/', '/imprint', '/terms'];
if (settings.SEPARATE_PAGE_FOR_ACCO) {
  baseEntries.push('/accomodations');
}

const langEntries = [];
translations.supportedLangs.forEach((sl) => {
  baseEntries.forEach((be) => {
    langEntries.push(`/${sl}/${be}`);
  });
});

const accoEntries = [];
if (settings.SEPARATE_PAGE_FOR_ACCO) {
  translations.supportedLangs.forEach((sl) => {
    accoEntries.push(...accos.map((a) => `/${sl}/${a.path}`));
  });
}
//accoEntries = ['/en/accomodations/dummy_entry'];

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.html'],

  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    prerender: {
      entries: [
        '*',
        '/robots.txt',
        '/sitemap.xml',
        ...langEntries,
        ...accoEntries,
      ],
    },
    paths: {
      relative: true,
    },
  },
};

export default config;
