import { i18n } from '$lib/conf/translations';
const defaultLang = i18n.defaultLang ?? 'en'
// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
export const handle: Handle = async ({ event, resolve }) => {
  
  //prefer cookie lang
  let lang = event.cookies.get('lang');  
  //console.log(`Lang Cookie Hook: ${lang}`) 
  if(lang) {
    event.locals.lang = lang;
    return resolve(event, {
      transformPageChunk: ({ html, done }) => {
        return html.replace('%lang%', lang ?? 'en');
      }
    });
  }
  
  //if enabled prefer browser lang
  if(i18n.preferBrowserLang) {
    const browserLang = event.request.headers.get('accept-language')
    const langCode = browserLang ? browserLang.slice(0,2) : null
  
    event.locals.lang = lang;

    return resolve(event, {
      transformPageChunk: ({ html, done }) => {
        return html.replace('%lang%', lang ?? 'en');
      }
    });
  }

  // else use default lang
  event.locals.lang = defaultLang;
  return resolve(event, {
    transformPageChunk: ({ html, done }) => {
      return html.replace('%lang%', lang ?? 'en');
    }
  });
  
  
};