<script lang="ts">
  import type { NavItem } from '$lib/types/nav';
  import ExtLinkSvg from './svg/ExtLinkSVG.svelte';
  import { getContext } from 'svelte';
  import { SiteState } from '$lib/state.svelte';

  const ss: SiteState = getContext('SITE_STATE');

  let {
    n,
    onclick,
  }: {
    n: NavItem;
    onclick?: () => void;
  } = $props();
</script>

<div class="wrapper" class:sub={n.sub}>
  {#if n.path}
    {#if n.external}
      <div class="ext-link-wrapper">
        <a href={n.path} target="_blank" rel="noreferrer noopener">
          {ss.translateFunc(n.key)}
        </a>
        <div class="link-icon-wrapper">
          <ExtLinkSvg size="2rem" />
        </div>
      </div>
    {:else}
      <a href={n.path} {onclick}>
        {ss.translateFunc(n.key)}
      </a>
    {/if}
  {:else}
    <span>{ss.translateFunc(n.key)}</span>
  {/if}
</div>

<style>
  .sub {
    font-size: 1.2rem;
    padding-left: 0.4rem;
  }

  a {
    text-decoration: underline;
    color: var(--nav-font-color);
  }

  .ext-link-wrapper {
    position: relative;
  }

  .link-icon-wrapper {
    position: absolute;
    left: -2.5rem;
    top: 0;
  }
</style>
