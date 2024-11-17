<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import translations from '$lib/conf/translations.json';

  import { setContext, type Snippet } from 'svelte';
  import { Banner, type CookieType } from 'gdpr-cooco-banner';
  import '$lib/loadFonts';
  import cookies from '$lib/conf/cookies.json';
  import { SiteState, type SupportedLang } from '$lib/state.svelte';
  import { browser } from '$app/environment';
  import { redirect } from '@sveltejs/kit';

  let {
    children,
  }: {
    children?: Snippet;
  } = $props();

  let pathLang = $page.params['lang'];
  if (!pathLang) pathLang = translations.defaultLang;
  if (!translations.supportedLangs.includes(pathLang))
    pathLang = translations.defaultLang;

  /*{
    const path = `/${translations.defaultLang}`;
    if (browser) {
      goto(path);
    } else {
      redirect(307, path);
    }
  }*/

  const ss = new SiteState(pathLang as SupportedLang);
  setContext('SITE_STATE', ss);

  $effect(() => {
    let langParam = $page.params['lang'];
    if (!langParam) langParam = translations.defaultLang;
    if (!translations.supportedLangs.includes(langParam))
      langParam = translations.defaultLang;

    ss.currentLang = langParam as SupportedLang;

    if (document) {
      document.documentElement.lang = ss.currentLang;
    }
  });

  const analyticsCookies = (e: CustomEvent) => {
    ss.cookieSelection.analytics = e.detail.enabled;
  };
  const preferenceCookies = (e: CustomEvent) => {
    ss.cookieSelection = e.detail.enabled;
  };
  const marketingCookies = (e: CustomEvent) => {
    ss.cookieSelection.marketing = e.detail.enabled;
  };
</script>

<svelte:head>
  <meta
    name="description"
    content="ACCOMADE powered website to present holiday accomodations."
  />
</svelte:head>

{@render children?.()}

<Banner
  on:analytics={analyticsCookies}
  on:preferences={preferenceCookies}
  on:marketing={marketingCookies}
  showEditIcon={cookies.showIcon}
  translation={ss.cookiesTranslation}
  choices={cookies.types as CookieType[]}
/>

<style>
  :global(body, html) {
    padding: 0;
    margin: 0;
    background-color: var(--main-bg-color, 'white');
    color: var(--main-font-color, 'black');
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
</style>
