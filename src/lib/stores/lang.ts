import { i18n } from '$lib/conf/translations';
import { derived, get, writable } from 'svelte/store';
import { browser } from '$app/environment'
import Cookie from 'js-cookie'

import { cookieSelection } from "./cookies";

const langStore = writable<string>(i18n.defaultLang)

export const initLangStore = () => {
  let defaultLang = i18n.defaultLang;
  if(browser) {
    if( i18n?.preferBrowserLang ) {
      const browserLang = navigator.language;
      const shortCode = browserLang.slice(0,2)
      //console.log("Discoverd browser lang: ", shortCode)

      if( !!i18n.translations[shortCode] ) {
        defaultLang = shortCode;
      }
    }
  }

  const langCookie = Cookie.get('lang')
  if (langCookie && !!i18n.translations[langCookie] ) {
    defaultLang = langCookie
  }
}


const handleCookie = () => {
  const cs = get(cookieSelection)
  if(cs.preferences) {
    
    const expires = new Date()
    expires.setDate(expires.getDate() + 365)
    const cl = get(langStore)

    Cookie.set('lang', cl, {
      sameSite: 'strict',
      path: '/',
      expires 
    })
  } else {
    Cookie.remove('lang')
  }
}

langStore.subscribe( ( val ) => {
  if( browser && document && 
      document.documentElement && 
      document.documentElement.lang) {

    document.documentElement.lang = val
  }
  handleCookie()
})


cookieSelection.subscribe( () => {
  handleCookie()
})


export const currentLang = derived(langStore, (s) => s)
export const setLang = (lang: string) => {
  langStore.set(lang)
}
