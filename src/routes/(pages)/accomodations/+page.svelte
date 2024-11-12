<script lang="ts">
  import { AccoCard, type AccoCardContent, type AccoI } from 'accomadesc';
  import accos from '$lib/conf/accos.json';
  import type { SiteState } from '$lib/state.svelte';
  import { getContext } from 'svelte';

  const ss: SiteState = getContext('SITE_STATE');

  let { maxWidth = '100rem' }: { maxWidth?: string } = $props();
</script>

<svelte:head>
  <title>{ss.translateFunc('accomodations')}</title>
</svelte:head>

<h1>{ss.translateFunc('accomodations')}</h1>

<main style="max-width: {maxWidth};">
  {#each accos as a}
    {#if a.cardContent && a.displayName}
      <AccoCard {...a.cardContent as AccoCardContent} {...ss} />
    {/if}
  {/each}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h1 {
    margin-top: 1rem;
    margin-bottom: 0;
  }
</style>
