<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import HamburgerMenuButton from '$lib/components/HamburgerMenuButton.svelte';
  import MainNav from '$lib/components/MainNav.svelte';

  import { nav } from '$lib/conf';
  import { getContext, type Snippet } from 'svelte';
  import type { SiteState } from '$lib/state.svelte';

  const ss: SiteState = getContext('SITE_STATE');

  let { children }: { children?: Snippet } = $props();
</script>

<div class="layout-wrapper">
  <Header />

  <main>
    {@render children?.()}
  </main>

  <Footer {nav} />
</div>

{#if ss.isMenuOpen}
  <MainNav {nav} />
{/if}

<div class="ham-wrapper">
  <HamburgerMenuButton />
</div>

<style>
  .layout-wrapper {
    display: flex;
    height: 100vh;
    flex-direction: column;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    flex: 2;
  }

  .ham-wrapper {
    position: fixed;
    right: 1rem;
    top: 1rem;
    width: 3rem;
    height: 3rem;
    z-index: 999;
  }
</style>

