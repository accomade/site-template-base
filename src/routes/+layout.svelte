<script lang="ts">
  import { type Snippet } from 'svelte';

  import '$lib/loadFonts';

  import { installTwicPics } from '@twicpics/components/sveltekit';
  import '@twicpics/components/style.css';

  let {
    children,
  }: {
    children?: Snippet;
  } = $props();

  installTwicPics({
    domain: `https://accomade.twic.pics`,
  });
</script>

<svelte:head>
  <meta
    name="description"
    content="ACCOMADE powered website to present holiday accomodations."
  />
</svelte:head>

{@render children?.()}

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
