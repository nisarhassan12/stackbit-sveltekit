<script lang="ts">
	import type { HeadingType } from '$lib/types';
	import type { CardProps } from '$lib/types/card.type';
	import Card from '../card/index.svelte';
	export let cards: CardProps[];
	export let layout: 'lined' | 'vertical' | '';
	export let headingType: HeadingType;
	let className = '';
	export { className as class };
	let size: 'sm' | 'md' | 'lg' = cards.length === 2 ? 'md' : layout === 'lined' ? 'lg' : 'sm';
</script>

<div class={`${layout} ${className} ${cards.length === 2 && 'two-columns'}`}>
	{#each cards as card}
		<Card
			card={{ ...card, headingType, variant: layout === 'lined' ? 'lined' : 'default', size }}
		/>
	{/each}
</div>

<style lang="postcss">
	div {
		@apply flex flex-wrap justify-center gap-6;

		&.lined {
			@apply relative gap-[1px] mx-auto max-w-md md:max-w-none;

			& > :global(*) {
				@media (min-width: 768px) {
					flex: 0 0 calc(50% - 0.5px);
				}
			}
		}

		&.two-columns {
			@apply grid md:grid-cols-2;
		}
	}
</style>
