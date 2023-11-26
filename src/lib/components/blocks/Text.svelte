<script lang="ts">
  import { currentLang } from '$lib/stores/lang';
  import { dictEntry } from '$lib/conf/translations';
  import { onDestroy, onMount } from 'svelte';
  import type { Unsubscriber } from 'svelte/motion';
  export let ref:string
  export let minHeight='100%'
  export let minFontSize='0.9rem'
  export let maxFontSize='4.5rem'
  export let hud=false

  let element:HTMLDivElement;
  let hiddenElement: HTMLDivElement;

  let hiddenArea:number;// = hiddenElement?.clientWidth * hiddenElement?.clientHeight;
  let containerArea:number;// = element?.clientWidth * element?.clientHeight;
  let ratio:number;// = containerArea / hiddenArea
  let fontSize:number;// = (Math.round( Math.max(0, (Math.log( ratio ))) * 100 ) / 100) + 0.8;
  
  const calcFontSize = ():string => {
    hiddenArea = hiddenElement?.clientWidth * hiddenElement?.clientHeight
    containerArea = element?.clientWidth * element?.clientHeight;
    ratio = containerArea / hiddenArea
    let fontSize = (Math.round( Math.max(0, (Math.log( ratio ))) * 100 ) / 100) + 0.8;
    if(fontSize == Infinity) {
      console.log('Calculated fontSize == Infinity')
      fontSize = 2;
    }
    if(!fontSize) {
      console.log('Calculated fontSize falsy');
      fontSize = 0.9;
    }

    return `clamp(${minFontSize ? minFontSize : '0.9rem'}, ${fontSize}rem, ${maxFontSize ? maxFontSize : '4.5rem'})`;
  }

  const resized = (n:UIEvent):any => {
    element.attributeStyleMap.set('font-size', minFontSize ? minFontSize : '0.9rem')
    const newFontSize = calcFontSize();
    element.attributeStyleMap.set('font-size', newFontSize)
  }

  let unsub:Unsubscriber
  onMount( () => {

    unsub = currentLang.subscribe( (lang) => {
      let content = dictEntry(lang, ref);
      hiddenElement.innerHTML = content;
      
      element.attributeStyleMap.set('font-size', minFontSize ? minFontSize : '0.9rem')
      element.innerHTML = content;

      const newFontSize = calcFontSize();
      element.attributeStyleMap.set('font-size', newFontSize)
    });
  })

  onDestroy( () => {
    if(unsub) unsub()
  })
</script>

<svelte:window on:resize={resized}/>

<div class="container">
  {#if hud}
    <div class="hud">
    containerArea: { containerArea }<br>
    hiddenArea: { hiddenArea }<br>
    r: { ratio }<br>
    log(r): { Math.log(ratio) }<br>
    fontSize: { fontSize }
    </div>
  {/if}

  <div 
  class="hidden"
  bind:this={hiddenElement}
  />

  <div 
      style="min-height: {minHeight};"
      class="content" 
      id="content"
      bind:this={element}
    />
</div>

<style>
  .content {
    width: 100%;
    height: 100%;

    text-align: left;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
  }

  .hidden {
    visibility: hidden;
    position: absolute;
    
    margin-left: 0.2rem;
    margin-right: 0.2rem;
  }

  .hud {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 1rem;
    font-size: 0.7rem;
    background-color:rgba(137, 43, 226, 0.8);
    color: white;
    border-radius: 0.5rem;
  }

  .container {
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>