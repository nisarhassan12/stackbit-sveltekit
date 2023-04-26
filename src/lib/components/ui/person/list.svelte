<script lang="ts">
	import Compact from './compact.svelte';
	import Full from './full.svelte';
	import TextLess from './text-less.svelte';

	export let authors: any;
	export let compact: boolean = false;
	export let textLess: boolean = false;
	export let full: boolean = false;
</script>

{#if compact}
	<Compact {authors} />
{:else if textLess}
	<TextLess {authors} />
{:else if full}
	<Full {authors} />
{:else if authors.length > 2}
	<Compact {authors} />
{:else}
	<Full {authors} />
{/if}
