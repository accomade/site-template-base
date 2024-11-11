<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { Nav } from '$lib/types/nav';
  import NavItem from './NavItem.svelte';
  import type { SiteState, SupportedLang } from '$lib/state.svelte';
  import { getContext } from 'svelte';

  let { nav }: { nav: Nav } = $props();

  let ss: SiteState = getContext('SITE_STATE');

  let allTranslations = ss.supportedLangs;
  const close = () => {
    ss.isMenuOpen = false;
  };

  const selected = (e: Event) => {
    if (e.currentTarget) {
      const element = e.currentTarget as HTMLInputElement;
      ss.currentLang = element.value as SupportedLang;
    }
  };
</script>

<button
  class="not-nav"
  onclick={close}
  aria-label="close"
  transition:fade|global
></button>

<nav class="main-nav" class:open={ss.isMenuOpen} transition:fade|global>
  <ul>
    {#each nav.main as n}
      <li>
        <NavItem {n} onclick={close} />
      </li>
    {/each}

    {#if allTranslations.length > 1}
      <li>
        <fieldset>
          <legend>{ss.translateFunc('lang')}</legend>

          {#each allTranslations as langKey}
            <div class="radio-wrapper">
              <input
                onchange={selected}
                type="radio"
                name="language"
                id={langKey}
                value={langKey}
                checked={langKey === ss.currentLang}
              />
              <label for={langKey}>{ss.translateFunc(langKey)}</label>
            </div>
          {/each}
        </fieldset>
      </li>
    {/if}
  </ul>
</nav>

<style>
  fieldset {
    padding-left: 1rem;
  }

  nav {
    z-index: 998;
    position: fixed;
    padding-right: 1rem;
    top: 0;
    right: 0;
    padding-top: 3rem;
    background-color: var(--nav-bg-color);
    color: var(--nav-font-color);
    height: 100vh;
    font-family: var(--nav-font-family);
    font-variant: var(--nav-font-variant);
    font-size: 1.6rem;
    font-weight: bold;

    overflow-y: auto;
    overflow-x: hidden;
  }

  .not-nav {
    border: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
    overflow-y: hidden;
    overflow-x: hidden;
  }

  li {
    list-style: none;
    margin-bottom: 1rem;
  }

  .radio-wrapper {
    font-family: var(--nav-font-family);
    font-variant: var(--nav-font-variant);
    font-size: 1.6rem;
    font-weight: bold;
    line-height: 1.1;
    display: grid;
    grid-template-columns: 1em auto;
    gap: 0.5em;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  ul {
    padding-left: 3rem;
    margin: 0;
  }
</style>

