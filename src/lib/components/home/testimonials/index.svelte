<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import Card from '$lib/components/ui/card/base.svelte';
	import GradientAvatar from '$lib/components/ui/gradient-avatar.svelte';
	import type { TestimonialProps } from '$lib/types/testimonial.type';

	export let testimonial: TestimonialProps;
	const { image, name, title, text, button } = testimonial;
</script>

<Card size="sm" class="!p-6 !max-w-none !min-w-[100%] md:!min-w-[auto]">
	<div class="testimonial">
		<figure class="mb-auto">
			<figcaption>
				<GradientAvatar src={image} alt={name} size="md" class="mr-3" />
				<div>
					<p class="font-semibold text-sub mb-0.5">
						{name}
					</p>
					<p class="text-sm">
						{title}
					</p>
				</div>
			</figcaption>
			<blockquote class="text-small mb-4">
				{@html text}
			</blockquote>
		</figure>
		{#if button}
			<Button button={{ ...button, variant: 'text' }} />
		{/if}
	</div>
</Card>

<style lang="postcss">
	.testimonial {
		@apply flex flex-col h-full items-start;

		figcaption {
			@apply flex items-center mb-6;
		}
	}
</style>
