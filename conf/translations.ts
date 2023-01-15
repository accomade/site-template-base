import type { I18n } from "$lib/types/i18n"

const i18n:I18n = {
  defaultLang: "de",
  preferBrowserLang: true,
  translations: {
    en: {
      title: "Welcome to your holidays",
      nav: {
        home: "Home",
        location: "Location",
        accomodations: "Apartments",
        lang: "Language",
        imprint: "Imprint",
        terms: "Terms",
      
      }
    },
    de: {
      title: "Willkommen in Ihrem Urlaub",
      nav: {
        home: "Startseite",
        location: "Der Ort",
        accomodations: "Ferienwohnungen",
        lang: "Sprache",
        imprint: "Impressum",
        terms: "AGB",
      }
    }
  }
}

export default i18n;