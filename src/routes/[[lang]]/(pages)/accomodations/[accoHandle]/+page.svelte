<script lang="ts">
  import { page } from '$app/stores';
  import { getContext } from 'svelte';
  import accos from '$lib/conf/accos.json' with { type: 'json' };
  import { Section, type SectionI } from 'accomadesc';
  import type { SiteState } from '$lib/state.svelte';

  const ss: SiteState = getContext('SITE_STATE');

  let acco = $derived(
    accos.find((a) => {
      return $page.url.pathname.includes(a.path);
    }),
  );
</script>

<svelte:head>
  {#if acco && acco.displayName}
    <title>{acco.displayName ? acco.displayName : 'Unnamed Acco'}</title>
  {/if}
</svelte:head>

{#if acco}
  {#if acco.displayName}
    <h1>{acco.displayName}</h1>
  {/if}
  {#if acco.siteContent}
    {#each acco.siteContent as s}
      <div class="section-wrapper">
        <Section {...s as SectionI} {...ss} />
      </div>
    {/each}
  {/if}
{/if}

<style>
  .section-wrapper {
    margin-bottom: 2rem;
    width: 100%;
    overflow-y: clip;
    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
  }

  h1 {
    margin-bottom: 0;
    margin-top: 1rem;
  }
</style>
