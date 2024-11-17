<script lang="ts">
  import type { SiteState } from '$lib/state.svelte';
  import { getContext } from 'svelte';

  const ss: SiteState = getContext('SITE_STATE');
</script>

<svelte:head>
  <title>{ss.translateFunc('imprint')}</title>
</svelte:head>

<div class="terms-wrapper">
  {@html ss.translateFunc('imprint_html')}
</div>

<style>
  .terms-wrapper {
    max-width: 100rem;
    margin-left: 2rem;
    margin-right: 2rem;
  }
</style>

