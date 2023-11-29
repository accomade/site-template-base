<script lang="ts">
  import type { NavItem } from "$lib/types/nav";
  import ExtLinkSvg  from "./svg/ExtLinkSVG.svelte";
  import { currentLang } from '$lib/stores/lang';  
  
  import { dictEntry } from '$lib/conf/translations';
  export let n:NavItem

</script>

  <div class="wrapper" class:sub={n.sub}>
  {#if n.path}
    {#if n.external}
    <div class="ext-link-wrapper">
      <a 
        href="{n.path}" 
        target="_blank"
        on:click
        rel="noreferrer noopener">
          { dictEntry($currentLang, n.key) }
      </a>
      <div class="link-icon-wrapper">
        <ExtLinkSvg size="2rem"/>
      </div>
    </div>
    {:else}
      <a href="{n.path}" on:click>
          { dictEntry($currentLang, n.key) }
      </a>
    {/if}
  {:else}
      <span>{ dictEntry($currentLang, n.key) }</span>
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