<script lang="ts">
	import { fade } from 'svelte/transition';
	
  import { currentLang, setLang } from '$lib/stores/lang';
	import { i18n, dictEntry } from '$lib/conf/translations';

  
	import type { Nav } from '$lib/types/nav';
	import { isMenuOpen } from '$lib/stores/menu';
	import NavItem from './NavItem.svelte';
  
	export let nav:Nav

	
	let allTranslations = i18n.supportedLangs;
	
	const close = () => {
		isMenuOpen.set(false)
	}

	const selected = (e:Event) => {
		if(e.currentTarget) {
			const element = e.currentTarget as HTMLInputElement
			setLang(element.value as string);
		}
	}

</script>

<button class="not-nav" on:click={close} transition:fade|global></button>

<nav class="main-nav" class:open={$isMenuOpen} transition:fade|global>
	<ul>
		{#each nav.main as n}
		<li>
			<NavItem {n} on:click={close}/>
		</li>
		{/each}

		{#if allTranslations.length > 1}
		<li>
			<fieldset>
				<legend>{ dictEntry($currentLang, 'lang') }</legend>
		
				{#each allTranslations as langKey}
				<div class="radio-wrapper">
					<input 
							on:change={selected}
							type="radio"
							name="language"
							id="{langKey}"
							value="{langKey}"
							checked={langKey === $currentLang}>
					<label for="{langKey}">{ dictEntry($currentLang, langKey) }</label>
				</div>
				{/each}
			</fieldset>
		</li>
		{/if}
	</ul>
</nav>

<style>
	fieldset {
		padding-left: 1rem;
	}

	nav {
		z-index: 998;
		position: fixed;
    padding-right: 1rem;
    top: 0;
    right: 0;
    padding-top: 3rem;
    background-color: var(--nav-bg-color);
    color: var(--nav-font-color);
    height: 100vh;
		font-family: var(--nav-font-family);
		font-variant: var(--nav-font-variant);
    font-size: 1.6rem;
    font-weight: bold;

		overflow-y: auto;
		overflow-x: hidden;
	}

	.not-nav {
		border: none;
		position: fixed;
    top: 0;
    right: 0;
		bottom: 0;
		left: 0;
    background-color: rgba(0, 0, 0, 0.1);
		overflow-y: hidden;
		overflow-x: hidden;
		
	}

	li {
		list-style: none;
		margin-bottom: 1rem;
	}

	.radio-wrapper {
		font-family: var(--nav-font-family);
		font-variant: var(--nav-font-variant);
    font-size: 1.6rem;
		font-weight: bold;
		line-height: 1.1;
		display: grid;
		grid-template-columns: 1em auto;
		gap: 0.5em;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	ul {
		padding-left: 3rem;
		margin: 0;
	}
	
</style>