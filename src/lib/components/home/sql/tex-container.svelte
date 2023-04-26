<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import Heading from '$lib/components/ui/heading.svelte';
	import Text from '$lib/components/ui/text.svelte';

	export let heading: string;
	export let text: string;
	export let link: { label: string; url: string };
</script>

<div class="mb-8">
	<Heading text={heading} type="h3" class="h3" />
	<Text class="mt-3 mb-6" size="small">
		{text}
	</Text>
	<Button button={{ ...link, variant: 'ghost' }} />
</div>

<style lang="postcss">
	div {
		@apply max-w-sm;

		@media (max-width: 1370px) {
			@apply max-w-full w-full text-center;

			:global(p) {
				@apply max-w-md mx-auto;
			}
		}
	}
</style>
