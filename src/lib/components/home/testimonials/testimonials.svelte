<script lang="ts">
	import OverflowClip from '$lib/components/ui/overflow-clip.svelte';
	import type { TestimonialProps } from '$lib/types/testimonial.type';
	import Testimonial from './index.svelte';

	export let testimonials: TestimonialProps[];
	export let className: string = '';
	export { className as class };
</script>

<OverflowClip class={className} closeButtonText="Ok, Got it!">
	<div class="testimonials">
		{#each testimonials as testimonial}
			<Testimonial {testimonial} />
		{/each}
	</div>
</OverflowClip>

<style lang="postcss">
	.testimonials {
		@apply flex flex-wrap justify-center gap-6 max-w-xl md:max-w-full mx-auto;

		& > :global(*) {
			flex: 0 0 calc(33% - 16px);

			@media (max-width: 1140px) {
				flex: 0 0 calc(50% - 24px);
			}
		}
	}
</style>
