<script lang="ts">
  import { run } from 'svelte/legacy';

  import type { Block } from '$lib/types/blocks'
  import BlockBlock from '$lib/components/blocks/Block.svelte'
  import { dictEntry } from '$lib/conf/translations';
  import { currentLang } from '$lib/stores/lang';
  
  interface Props {
    header?: string | undefined;
    columnCount?: number;
    padding?: string;
    blocks?: Block[];
  }

  let {
    header = undefined,
    columnCount = 2,
    padding = $bindable("10vw"),
    blocks = []
  }: Props = $props();
  
  let gridTemplateColumns = $state("1fr");
  run(() => {
    if(!!columnCount && columnCount > 1) {
      gridTemplateColumns = `repeat(${columnCount}, 1fr)`
    }
  });

  let clientWidth = $state(Number.MAX_SAFE_INTEGER);
  run(() => {
    if(clientWidth  < 500) {
      gridTemplateColumns = "1fr"
      padding = "0"
    }
    else if (
      clientWidth < 800 && clientWidth >= 500 &&
      !!columnCount && columnCount > 2
    )  {
      gridTemplateColumns = "1fr 1fr"
    }
    else {
      if(!!columnCount && columnCount > 1) {
        gridTemplateColumns = `repeat(${columnCount}, 1fr)`
      }
    }
  });
  
</script>

<svelte:window bind:innerWidth={clientWidth}/>

<section style="padding-left: {padding}; padding-right: {padding};">
  {#if header} 
  <h2>{ dictEntry($currentLang, header) } </h2>
  {/if}
  <div 
    class="content"
    style="grid-template-columns: {gridTemplateColumns}"
    >
    {#each blocks as b}
      <div class="block-container">
        <BlockBlock spec={b}/>
      </div>
    {/each}
  </div>
</section>

<style>
  .block-container {
    position: relative;
  }

  section {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .content {
    display: grid;
    width: 100%;
    gap: 1rem;
    grid-auto-flow: dense;
  }

  h2 {
    padding-left: 0.5rem;
    font-weight: bolder;
    font-size: 2.2rem;
    font-variant: small-caps;
    margin-bottom: 0.8rem;
  }

</style>