import { i18n } from '$lib/conf/translations';
const defaultLang = i18n.defaultLang ?? 'en'
// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  
  //prefer cookie lang
  let cookieLang = event.cookies.get('lang');  
  //console.log(`Lang Cookie Hook: ${lang}`) 
  if(!!cookieLang) {
    event.locals.lang = cookieLang;
    return resolve(event, {
      transformPageChunk: ({ html, done }) => {
        return html.replace('%lang%', cookieLang ?? defaultLang);
      }
    });
  }
  
  //if enabled prefer browser lang
  if(i18n.preferBrowserLang) {
    const browserLang = event.request.headers.get('accept-language')
    const langCode = browserLang ? browserLang.slice(0,2) : null
  
    event.locals.lang = langCode ?? defaultLang;

    return resolve(event, {
      transformPageChunk: ({ html, done }) => {
        return html.replace('%lang%', langCode ?? defaultLang);
      }
    });
  }

  // else use default lang
  event.locals.lang = defaultLang;
  return resolve(event, {
    transformPageChunk: ({ html, done }) => {
      return html.replace('%lang%', defaultLang ?? defaultLang);
    }
  });
  
  
};


export const handleError = ({ event, error}) => {
  console.error(error)
}
