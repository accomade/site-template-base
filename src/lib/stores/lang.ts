import { i18n } from '$lib/conf/translations';
import { derived, get, writable } from 'svelte/store';
import { browser } from '$app/environment'
import Cookie from 'js-cookie'

import { cookieSelection } from "./cookies";

const langStore = writable<string>(i18n.defaultLang)

export const initLangStore = (lang: string) => {
  langStore.set(lang)
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
