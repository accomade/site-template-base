import translations from '$lib/conf/translations.json';
import type { SupportedLang } from '$lib/state.svelte';
const defaultLang = translations.defaultLang ?? 'en';
// src/hooks.server.ts
import type { Handle, HandleServerError } from '@sveltejs/kit';
import { transformScale } from 'dinero.js';

export const handle: Handle = async ({ event, resolve }) => {
  //prefer cookie lang
  let cookieLang = event.cookies.get('lang');
  //console.log(`Lang Cookie Hook: ${lang}`)
  if (!!cookieLang) {
    event.locals.lang = cookieLang;
    return resolve(event, {
      transformPageChunk: ({ html, done }) => {
        return html.replace('%lang%', cookieLang ?? defaultLang);
      },
    });
  }

  const browserLang = event.request.headers.get('accept-language');
  const langCode: SupportedLang | null = browserLang
    ? (browserLang.slice(0, 2) as SupportedLang)
    : null;

  if (langCode && translations.supportedLangs.includes(langCode)) {
    event.locals.lang = langCode ?? defaultLang;

    return resolve(event, {
      transformPageChunk: ({ html, done }) => {
        return html.replace('%lang%', langCode ?? defaultLang);
      },
    });
  }

  event.locals.lang = defaultLang;
  return resolve(event, {
    transformPageChunk: ({ html, done }) => {
      return html.replace('%lang%', defaultLang ?? defaultLang);
    },
  });
};

export const handleError: HandleServerError = (event) => {
  console.error(JSON.stringify(event));
};
