<script lang="ts">
	import type { HeadingType } from '$lib/types';
	import FancyHeading from './fancy-heading.svelte';

	export let type: HeadingType;
	let className = 'h2';
	export { className as class };
	export let text: string = '';
	let isFancy: boolean = text.includes('{') || text.includes('}');
	export let breakLines: boolean = false;
</script>

<svelte:element this={type} class={className || type}>
	{#if isFancy}
		<FancyHeading {text} {breakLines} />
	{:else}
		{text}
	{/if}
</svelte:element>
