<script lang="ts">
  import { getContext } from 'svelte';
  import { blur } from 'svelte/transition';

  import HamburgerSVG from './svg/HamburgerSVG.svelte';
  import XSVG from './svg/XSVG.svelte';
  import type { SiteState } from '$lib/state.svelte';

  let { closeOnly = false }: { closeOnly?: boolean } = $props();

  const ss: SiteState = getContext('SITE_STATE');

  const toggleIsMenuOpen = () => {
    ss.isMenuOpen = !ss.isMenuOpen;
  };
</script>

<button
  transition:blur
  onclick={toggleIsMenuOpen}
  aria-pressed={ss.isMenuOpen}
  aria-label="menu button"
  tabindex={ss.isMenuOpen || !closeOnly ? 0 : -1}
>
  {#if ss.isMenuOpen}
    <XSVG />
  {:else}
    <HamburgerSVG />
  {/if}
</button>

<style>
  button {
    background-color: transparent;
    border: 0;
    width: 3rem;
    height: 3rem;
  }
</style>
