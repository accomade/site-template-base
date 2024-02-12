import type { I18n, Translation } from '$lib/types/i18n'

import formats from './formats.json'

import translations from './translations.json'

const mappedTranslations:I18n = {
  defaultLang: translations.defaultLang,
  supportedLangs: translations.supportedLangs,
  preferBrowserLang: true,
  translations: {}
}

for ( const tEntry of Object.entries(translations.translations)) {
  const [lang , jsonT] = tEntry;
  const t:Translation = {
    site: jsonT.site,
    cookies: jsonT.cookies,
    calendar: {
      weekdayLabels: jsonT.calendar.weekdayLabels,
      monthLabels: jsonT.calendar.monthLabels,
      weekendLabel: jsonT.calendar.weekendLabel,
      typeNames: {
        defaultOccupationTypeName: jsonT.calendar.typeNames.defaultOccupationTypeName
      },
      monthHeaderFormat: formats[lang as keyof typeof formats].monthHeader
    }
  }

  if(!mappedTranslations.translations) {
    mappedTranslations.translations = {}
  }
  mappedTranslations.translations[lang] = t
}

export const dictEntry = (lang:string, key:string|undefined):string => {
  let res = undefined;
  if(!key) return ""

  if(mappedTranslations.translations) {
    const t = mappedTranslations.translations[lang]
    if(t) {
      const dict = t.site
      if(dict) {
        res = dict[key]
        if (res) return res
      }
    }
  }
  return ""
}

export const i18n = mappedTranslations;