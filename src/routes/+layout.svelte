<script lang="ts">
  import '$lib/loadFonts';

  import { i18n } from '$lib/conf/translations';
  import { Banner } from 'gdpr-cooco-banner';
  
  import { cookieSettings } from '$lib/conf'
  import { currentLang, initLangStore } from '$lib/stores/lang';

  import { cookieSelection } from '$lib/stores/cookies';

  // Here is an example of +layout.svelte file
  import { installTwicPics } from "@twicpics/components/sveltekit";
  import "@twicpics/components/style.css";
  import type { LayoutData } from './$types';
  
  export let data: LayoutData;
  
  initLangStore(data?.lang)

  installTwicPics( {
      "domain": `https://accomade.twic.pics`,
  } );
  
  $: currentTranslation = i18n.translations[$currentLang]
  
  const analyticsCookies = ( e:CustomEvent ) => {
    const currentSelection = $cookieSelection
    currentSelection.analytics = e.detail.enabled
    cookieSelection.set(currentSelection)
  }
  const preferenceCookies = ( e:CustomEvent ) => {
    const currentSelection = $cookieSelection
    currentSelection.preferences = e.detail.enabled
    cookieSelection.set(currentSelection)
  }
  const marketingCookies = ( e:CustomEvent ) => {
    const currentSelection = $cookieSelection
    currentSelection.marketing = e.detail.enabled
    cookieSelection.set(currentSelection)
  }

  
</script>

<svelte:head>
  <meta name="description" content="ACCOMADE powered website to present holiday accomodations.">
</svelte:head>


<slot></slot>

<Banner 
  on:analytics={ analyticsCookies }
  on:preferences={ preferenceCookies }
  on:marketing={ marketingCookies }
  showEditIcon={cookieSettings.showIcon}
  translation={currentTranslation.cookies} 
  choices={cookieSettings.types}/>

<style>
  :global( body, html ) {
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