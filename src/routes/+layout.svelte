<script lang="ts">
  import type { LayoutData } from './$types';
  import { setContext, type Snippet } from 'svelte'; 
  import { Banner } from 'gdpr-cooco-banner';
  
  import '$lib/loadFonts';
  import { cookieSettings } from '$lib/conf'
  // Here is an example of +layout.svelte file
  import { installTwicPics } from "@twicpics/components/sveltekit";
  import "@twicpics/components/style.css";
 
  import { SiteState } from '$lib/state.svelte';
  
  let { data, children }: Props = $props();
  const ss = new SiteState(data.lang, document);
  setContext("SITE_STATE", ss)
    interface Props {
    data: LayoutData;
    children?: Snippet;
  }

  installTwicPics( {
      "domain": `https://accomade.twic.pics`,
  } );
  
  const analyticsCookies = ( e:CustomEvent ) => {
    ss.cookieSelection.analytics = e.detail.enabled
  }
  const preferenceCookies = ( e:CustomEvent ) => {
    ss.cookieSelection = e.detail.enabled
  }
  const marketingCookies = ( e:CustomEvent ) => {
    ss.cookieSelection.marketing = e.detail.enabled
  }

  
</script>

<svelte:head>
  <meta name="description" content="ACCOMADE powered website to present holiday accomodations.">
</svelte:head>


{@render children?.()}

<Banner 
  on:analytics={ analyticsCookies }
  on:preferences={ preferenceCookies }
  on:marketing={ marketingCookies }
  showEditIcon={cookieSettings.showIcon}
  translation={ss.cookies} 
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
