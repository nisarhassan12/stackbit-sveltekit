<script lang="ts">
	import type { StepProps } from '$lib/types/step.type';
	import Eyebrow from '../eyebrow.svelte';
	import Heading from '../heading.svelte';
	import Text from '../text.svelte';

	export let step: StepProps;
	const { eyebrow, heading, text, links, image, idx } = step;
</script>

<div class="step">
	<div class="gradient-list-container">
		<div class="marker">{idx + 1}</div>
		<Eyebrow text={eyebrow} class="gradient-text text-xl" />
		<Heading text={heading} type="h3" class="h3 my-5" />
		<Text>{text}</Text>
		<ul>
			{#each links as link, i}
				{@const { text, url } = link}
				<li>
					<a href={url}>{text}</a>
				</li>
			{/each}
		</ul>
	</div>
	<div>
		<img src={image} alt={heading} />
	</div>
</div>

<style lang="postcss">
	.step {
		@apply flex items-center justify-between relative gap-16 min-h-[300px] pt-10 xl:p-0;

		@media (max-width: 900px) {
			@apply flex-col;
		}

		div {
			@apply max-w-[600px];
		}

		img {
			@apply w-full sm:w-auto max-w-[400px] xl:max-w-[500px] max-h-[500px];
		}

		.marker {
			@apply absolute flex items-center justify-center text-3xl sm:text-5xl xl:text-5xl top-0 transform -translate-y-full translate-x-1 sm:-translate-x-4 lg:-translate-x-10 xl:translate-x-[-3.9rem] h-14 w-14 sm:h-20 sm:w-20 lg:h-[106px] lg:w-[106px] rounded-2xl border-2 border-divider p-0.5 text-sub bg-bg;
			left: -60px;
		}
	}
</style>
