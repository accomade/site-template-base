<script lang="ts">
  
  import { currentLang } from '$lib/stores/lang';
  import { dictEntry } from '$lib/conf/translations';

  import type { Amneties } from "$lib/types/accos";
  import AmnetyNucleus from '$lib/components/blocks/AmnetyNucleus.svelte';
  
  interface Props {
    amneties: Amneties;
  }

  let { amneties }: Props = $props();
</script>

<div class="amneties-wrapper">
  {#if amneties}
    <div class="base-wrapper">
      {#if amneties.descriptions }
        {#each amneties.descriptions as ad}
          <AmnetyNucleus label="{ad.label}" value="{ad.desc}" kind="longDesc"/>
        {/each}
      {/if}
    </div>
    {#if amneties.sections}
      {#each amneties.sections as sec}
      {#if sec.hr}<hr>{/if}
      {#if sec.header}<h3>{sec.header}</h3>{/if}
      <div class="section-wrapper">
        {#if sec.specs}
        <dl>
          {#each sec.specs as sp}
          <AmnetyNucleus 
            kind={sp.kind} 
            label={sp.label} 
            value={sp.value}
            desc={sp.desc}
            />
          {/each}
        </dl>
        {/if}
      </div>
      {/each}
    {/if}
    {#if amneties.rooms}
      <div class="rooms-wrapper">
        <h3>{dictEntry($currentLang, "roomsHeader")}</h3>
        <div class="rooms-container">
          {#each amneties.rooms as r}
            <div class="room-wrapper"> 
              <h4 class="rooms-header">{dictEntry($currentLang, r.header)}</h4>
              {#if r.specs}
                <dl>
                  {#each r.specs as sp}
                  <AmnetyNucleus 
                    kind={sp.kind} 
                    label={sp.label} 
                    value={sp.value}
                    desc={sp.desc}
                    />
                  {/each}
                </dl>
                {#if r.desc}
                <div class="room-desc">
                  { dictEntry($currentLang, r.desc)}
                </div>
                {/if}
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/if}
    {#if amneties.outdoors}
    <div class="rooms-wrapper">
      <h3>{dictEntry($currentLang, "outdoorsHeader")}</h3>
      <div class="outdoors-container">
        {#each amneties.outdoors as r}
        <div 
          class:outdoor-wrapper={amneties.outdoors.length > 1}
          class:outdoor-wrapper-single={amneties.outdoors.length == 1}
        > 
          <h4 class="room-header">{ dictEntry($currentLang, r.header)}</h4>
          {#if r.specs}
            <dl>
              {#each r.specs as sp}
              <AmnetyNucleus 
                kind={sp.kind} 
                label={sp.label} 
                value={sp.value}
                desc={sp.desc}
                />
              {/each}
            </dl>
            {#if r.desc}
            <div class="room-desc">
              { dictEntry($currentLang, r.desc )}
            </div>
            {/if}
          {/if}
        </div>
      {/each}
      </div>
    </div>  
    {/if}
  {/if}
</div>

<style>

  h4 {
    background-color: var(--table-header-bg-color);
    color: var(--table-header-font-color);
    padding: 0.3rem;
  }

  .base-wrapper {
    display: flex;
    gap: 2rem;
    align-items: baseline;
    flex-wrap: wrap;
    margin-left: 2rem;
    margin-right: 2rem;
  }

  dl {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

  }

  .rooms-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1%;
    justify-content: center;
    padding-left: 1%;
  }

  .outdoors-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1%;
    justify-content: center;
    padding-left: 1%;
  }

  .outdoor-wrapper-single {
    max-width: 98%
  }

  .outdoor-wrapper {
    max-width: 48%;
  }

  .room-wrapper {
    max-width: 32%;
  }
  
  @media(min-width: 500px) and (max-width: 800px) {
    .room-wrapper {
      max-width: 48%;
    }

    .outdoor-wrapper {
      max-width: 98%;
    }
  }

  @media(max-width: 500px) {
    .room-wrapper {
      max-width: 98%;
    }

    .outdoor-wrapper {
      max-width: 98%;
    }
  }

</style>
