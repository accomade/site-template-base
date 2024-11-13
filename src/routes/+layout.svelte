<script lang="ts">
  import type { LayoutData } from './$types';
  import { setContext, type Snippet } from 'svelte';
  import { Banner, type CookieType } from 'gdpr-cooco-banner';

  import '$lib/loadFonts';
  import cookies from '$lib/conf/cookies.json';

  import { installTwicPics } from '@twicpics/components/sveltekit';
  import '@twicpics/components/style.css';

  import { SiteState, type SupportedLang } from '$lib/state.svelte';
  import { browser } from '$app/environment';

  let {
    data,
    children,
  }: {
    data: LayoutData;
    children?: Snippet;
  } = $props();

  const ss = new SiteState(data.lang as SupportedLang);

  $effect(() => {
    if (browser && document) {
      document.documentElement.lang = ss.currentLang;
    }
  });

  setContext('SITE_STATE', ss);
  installTwicPics({
    domain: `https://accomade.twic.pics`,
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
