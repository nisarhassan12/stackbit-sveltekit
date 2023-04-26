<script lang="ts">
	import DiagramBlock from '$lib/components/diagram-block.svelte';
	import TableBlock from '$lib/components/table-block.svelte';
	import type { FeatureProps } from '$lib/types/feature.type';
	import Button from '../button.svelte';
	import ButtonsWrapper from '../buttons-wrapper.svelte';
	import Eyebrow from '../eyebrow.svelte';
	import Heading from '../heading.svelte';
	import Text from '../text.svelte';
	import LabelList from './label-list.svelte';

	export let feature: FeatureProps;
	const {
		eyebrow,
		heading,
		headingLevel,
		text,
		image,
		alt,
		buttons,
		layout,
		inlineSVG,
		table,
		diagramBlock,
		labelList
	} = feature;
</script>

<div
	class="
		{layout === 'vertical'
		? 'flex-col px-12'
		: 'flex-col-reverse lg:flex-row lg:gap-0 items-center justify-between'} 
		flex justify-between 
		container 
		{table ? 'with-table' : ''}
		{labelList ? 'with-label-list flex-col lg:flex-row' : ''}
	"
>
	{#if inlineSVG || image}
		<div class="img-container flex items-center">
			{#if inlineSVG}
				<!-- <svelte:component this={inlineSVG} /> -->
			{:else}
				<img src={image} {alt} />
			{/if}
		</div>
	{/if}
	{#if diagramBlock}
		<DiagramBlock variant={diagramBlock.variant} />
	{/if}
	<div class="text">
		{#if eyebrow}
			<Eyebrow class="mb-4" text={eyebrow} />
		{/if}
		{#if heading}
			<Heading type={headingLevel || 'h3'} text={heading} class={`h3 mb-3 md:mb-7`} />
		{/if}
		{#if text}
			<Text size="medium">
				{@html text}
			</Text>
		{/if}
		{#if buttons}
			<ButtonsWrapper>
				{#each buttons as button}
					<Button button={{ ...button, variant: 'text', class: 'mt-10' }} />
				{/each}
			</ButtonsWrapper>
		{/if}
		{#if labelList}
			<LabelList {labelList} class={text ? 'mt-10' : ''} />
		{/if}
	</div>
	{#if table}
		<TableBlock dataset={table.dataset} />
	{/if}
</div>

<style lang="postcss">
	div.container {
		@apply max-w-2xl gap-10 lg:max-w-full mx-auto;

		@media (min-width: 1080px) {
			& > :first-child {
				flex: 0 0 35%;
			}

			& > :last-child {
				flex: 0 0 55%;
			}
		}

		&.with-table {
			& > :first-child {
				flex: 0 0 40%;
			}

			& > :last-child {
				flex: 0 0 55%;
			}
		}

		&.with-label-list {
			.img-container {
				@apply justify-end;
				img {
					@apply w-full max-w-xl;
				}
			}

			& > :first-child {
				flex: 0 0 55%;
			}

			& > :last-child {
				flex: 0 0 40%;
			}
		}

		&:not(.with-label-list) {
			.img-container {
				@apply justify-center;
			}

			& img {
				max-height: 360px;
				max-width: 440px;
			}
		}

		:global(p) + :global(p) {
			@apply mt-5;
		}
	}
</style>
