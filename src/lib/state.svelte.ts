import Cookie from 'js-cookie';
import type { I18nFacade } from 'accomadesc';
import { dinero, toDecimal, type Dinero, type DineroSnapshot } from 'dinero.js';
import type { DateTime } from 'luxon';
import { type I18n as CalI18n } from 'occuplan';

import type { Translation as CookieTranslation } from 'gdpr-cooco-banner';

import formats from './conf/formats.json';
import translations from './conf/translations.json';
import type { TemplateFunction } from 'squirrelly/dist/types/compile';
import * as Sqrl from 'squirrelly';

export type SupportedLang = 'en' | 'pl' | 'de' | 'es' | 'fr'; //(typeof translations.supportedLangs)[number];

export interface CookieSelection {
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  necessary: boolean;
}

export interface Translation {
  site: Record<string, string>;
  cookies: CookieTranslation;
  calendar: CalI18n;
}

export interface I18n {
  defaultLang: SupportedLang;
  supportedLangs: SupportedLang[];
  preferBrowserLang: boolean;
  translations: Partial<Record<SupportedLang, Translation>>;
}

export class SiteState implements I18nFacade {
  i18n = $state(mapTranslations());
  fTemplates = $state(mapFormats());
  supportedLangs: SupportedLang[];
  isMenuOpen = $state(false);
  cookieSelection: CookieSelection = $state({
    analytics: false,
    marketing: false,
    preferences: false,
    necessary: true,
  });
  currentLang: SupportedLang = $state('en'); //= $state((translations.defaultLang ?? 'en') as SupportedLang);
  calendarTranslation: CalI18n = $derived(
    translations.translations[this.currentLang].calendar,
  );
  //
  cookiesTranslation: CookieTranslation = $derived(
    translations.translations[this.currentLang].cookies,
  );

  constructor(lang: SupportedLang) {
    this.currentLang = lang;
    //register reactivity?! TODO test it
    if (this.cookieSelection) {
      this.handleCookie();
    }
    this.supportedLangs = translations.supportedLangs as SupportedLang[];
  }

  handleCookie = () => {
    if (this.cookieSelection.preferences) {
      const expires = new Date();
      expires.setDate(expires.getDate() + 365);

      Cookie.set('lang', this.currentLang, {
        sameSite: 'strict',
        path: '/',
        expires,
      });
    } else {
      Cookie.remove('lang');
    }
  };

  translateFunc = (ref: string): string => {
    //console.log(ref, this.currentLang);
    let res = '';
    if (!ref) return res;

    if (this.i18n) {
      const t = this.i18n.translations[this.currentLang];
      if (!t) {
        console.log(`No translations found for lang: ${this.currentLang}`);
        return '';
      }
      const dict = t.site;
      if (!dict) {
        console.log(
          `Translation for: ${ref} not found in lang: ${this.currentLang}`,
        );
        return '';
      }

      res = dict[ref];
    }

    return res;
  };
  formatFunc = (formatter: string, props: Record<string, any>): string => {
    console.log(formatter, this.currentLang);
    if (this.currentLang) {
      const fullTemplateName = `${this.currentLang}_${formatter}`;
      const templFun = this.fTemplates[fullTemplateName];
      if (!templFun) {
        console.log(
          `FormatFunc not found for ${formatter} and lang ${this.currentLang}`,
        );
        return '';
      }
      return templFun(props, Sqrl.defaultConfig);
    }
    return '';
  };

  formatMoneyFunc = (d: Dinero<number> | DineroSnapshot<number>): string => {
    const locale = formats[this.currentLang as SupportedLang].locale;
    if (!isDinero(d)) d = dinero(d);

    return toDecimal<number, string>(d, ({ value, currency }) => {
      let f = parseFloat(value);
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency.code,
      }).format(f);
    });
  };
  formatDateFunc = (d: DateTime | string): string => {
    return '';
  };
}

const mapTranslations = (): I18n => {
  const mappedTranslations: I18n = {
    defaultLang: translations.defaultLang as SupportedLang,
    supportedLangs: translations.supportedLangs as SupportedLang[],
    preferBrowserLang: true,
    translations: {},
  };

  for (const tEntry of Object.entries(translations.translations)) {
    const [lang, jsonT] = tEntry;
    const t: Translation = {
      site: jsonT.site,
      cookies: jsonT.cookies,
      calendar: {
        weekdayLabels: jsonT.calendar.weekdayLabels,
        monthLabels: jsonT.calendar.monthLabels,
        weekendLabel: jsonT.calendar.weekendLabel,
        typeNames: {
          defaultOccupationTypeName:
            jsonT.calendar.typeNames.defaultOccupationTypeName,
        },
        monthHeaderFormat: formats[lang as keyof typeof formats].monthHeader,
      },
    };

    if (!mappedTranslations.translations) {
      mappedTranslations.translations = {};
    }
    mappedTranslations.translations[lang as SupportedLang] = t;
  }
  return mappedTranslations;
};

const mapFormats = (): Record<string, TemplateFunction> => {
  const result: Record<string, TemplateFunction> = {};
  for (const entry of Object.entries(formats)) {
    const [lang, format] = entry;
    if (lang !== 'default') {
      for (const fEntry of Object.entries(format)) {
        const [templateName, formatTemplate] = fEntry;
        const fullTemplateName = `${lang}_${templateName}`;
        result[fullTemplateName] = Sqrl.compile(formatTemplate, {
          useWith: true,
        });
      }
    }
  }
  return result;
};

export const isDinero = (
  d: Dinero<number> | DineroSnapshot<number>,
): d is Dinero<number> => {
  if ('calculator' in d) {
    return true;
  } else {
    return false;
  }
};
