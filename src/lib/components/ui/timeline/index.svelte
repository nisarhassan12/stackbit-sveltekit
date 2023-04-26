<script lang="ts">
	import HubspotForm from '$lib/components/hubspot-form.svelte';
	import type { CardProps } from '$lib/types/card.type';
	import GradientStroke from '../gradient-stroke.svelte';
	import Item from './item.svelte';

	export let items: CardProps[];
</script>

<div class="py-6 flex flex-col justify-center sm:py-12">
	<div class="py-3 sm:max-w-5xl sm:mx-auto w-full px-2 sm:px-0">
		<div class="relative">
			<div
				class="block -z-10 w-1 bg-gradient-to-b from-mz-charcoal to-orchid absolute h-full left-1/2 transform -translate-x-1/2"
			/>
			<div class="items-container">
				{#each items as item, idx}
					<Item {item} {idx} />
				{/each}
			</div>
			<GradientStroke class="rounded-lg max-w-xl mx-auto md:mt-28">
				<div class="card rounded-lg p-6 space-y-2">
					<h4 class="h4">What&apos;s Next?</h4>
					<p>Subscribe to keep up with product announcements from Materialize</p>
				</div>
			</GradientStroke>
		</div>
	</div>
</div>

<style lang="postcss">
	@media (max-width: 900px) {
		.items-container {
			@apply flex flex-col gap-20 mb-20;
		}
	}

	.card :global(input) {
		@apply bg-card;
	}

	.card :global(input[type='submit']) {
		@apply !mt-0;
	}
</style>
