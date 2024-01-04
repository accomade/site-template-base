<script lang="ts">
  import { goto } from '$app/navigation';
  import Section from '$lib/components/blocks/Section.svelte';
  import { accos } from '$lib/conf';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  
  export let data: App.PageData & Record<string, any>;
  $: acco = accos.find( (a) => {
      return a.path === $page.url.pathname || `${a.path}/` === $page.url.pathname 
    })

  onMount( () => {
    if( !acco ) {
      goto('/accomodations')
    }
  })
</script>

<svelte:head>
  {#if acco && acco.displayName }
  <title>{acco.displayName ? acco.displayName : data.accoHandle}</title>
  {/if}
</svelte:head>


{#if acco}
  {#key acco.displayName}
    {#if acco.displayName }
    <h1>{acco.displayName}</h1>
    {/if}
    {#if acco.siteContent}
      {#each acco.siteContent as s}
      <div class="section-wrapper">
      <Section {...s}/>
      </div>
      {/each}
    {/if}
  {/key}
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
