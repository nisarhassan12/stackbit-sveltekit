<script lang="ts">
	import Card from '../card/index.svelte';
	import type { CardProps } from '$lib/types/card.type';
	import { getIcon } from '$lib/utils';

	export let item: CardProps;
	export let idx: number;
</script>

<div class="parent flex flex-col sm:flex-row items-center relative">
	<div
		class="container flex {idx % 2 === 0
			? 'justify-start'
			: 'justify-end'} w-full mx-auto items-center"
	>
		<Card card={{ ...item, icon: '', variant: 'timeline' }} />
	</div>
	<div class="icon">
		<svelte:component this={getIcon(`${item.icon}`)} />
	</div>
</div>

<style lang="postcss">
	.icon {
		@apply rounded-full bg-divider-light border-orchid border-2 text-orchid p-2 w-10 h-10 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center;
	}

	@media (max-width: 900px) {
		.icon {
			@apply bottom-0 translate-y-16;
		}

		.container {
			@apply justify-center;
		}
	}
</style>
