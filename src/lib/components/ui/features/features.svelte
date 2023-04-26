<script lang="ts">
	import type { FeatureProps } from '$lib/types/feature.type';
	import Feature from './index.svelte';

	export let features: FeatureProps[];
	let className = '';
	export { className as class };
	export let layout: 'vertical' | 'lined' | '';
	export let alternating: boolean = false;
</script>

<div
	class="
		{className}
		{layout === 'vertical' ? 'flex flex-col lg:flex-row items-start justify-center' : 'space-y-32'}
	"
	class:alternating
>
	{#each features as feature}
		<Feature feature={{ ...feature, layout }} />
	{/each}
</div>

<style lang="postcss">
	.alternating {
		& > :global(*:nth-child(odd)) {
			@apply lg:flex-row-reverse;
		}

		& > :global(*:nth-child(even)) {
			:global(.img-container) {
				@apply !justify-start;
			}
		}
	}
</style>
