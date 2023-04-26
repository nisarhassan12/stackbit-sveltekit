<script lang="ts">
	import TickList from '$lib/components/layout/section/tick-list.svelte';
	import type { CardProps } from '$lib/types/card.type';
	import { getImagePath } from '$lib/utils';
	import Button from '../button.svelte';
	import Eyebrow from '../eyebrow.svelte';
	import Heading from '../heading.svelte';
	import Text from '../text.svelte';
	import Base from './base.svelte';

	export let card: CardProps;
	const {
		eyebrow,
		heading,
		headingType,
		text,
		html,
		icon,
		variant,
		size = 'sm',
		list,
		images,
		button,
		idx,
		theme,
		gradientBorder
	} = card;
</script>

<Base {size} {variant} themeOverride={theme} hasGradientBorder={gradientBorder}>
	<div>
		<div class="parent">
			<div class="top w-full">
				{#if icon}
					<img
						src={icon}
						alt={heading}
						class={`inline-block mx-auto mb-7 ${
							variant === 'lined' ? 'w-full' : 'h-16 max-w-[200px]'
						}`}
					/>
				{/if}
				{#if eyebrow}
					<Eyebrow text={eyebrow} class="mb-4" />
				{/if}
				<Heading type={headingType || 'h3'} class="h4" text={heading} />
				{#if text}
					<Text class="mt-4 text-lg">
						{@html text}
					</Text>
				{/if}
				{#if html}
					<p class="text-lg mt-4">
						{@html html}
					</p>
				{/if}
			</div>
			{#if list}
				<TickList {list} />
			{/if}
			{#if images}
				<div class="flex mt-6 gap-6">
					{#each images as { src, alt, className }}
						<img src={getImagePath(src)} {alt} class={`h-10 ${className}`} />
					{/each}
				</div>
			{/if}
			{#if button}
				<div class="bottom">
					<Button
						variant="text"
						button={{ ...button, class: 'mt-8', variant: button.variant || 'text' }}
					/>
				</div>
			{/if}
		</div>
	</div>
</Base>

<style lang="postcss">
	.parent {
		@apply flex flex-col items-start h-full;

		.bottom {
			@apply mt-auto;
		}
	}
</style>
