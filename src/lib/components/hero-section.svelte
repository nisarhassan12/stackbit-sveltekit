<script lang="ts">
	import type { ButtonProps } from '$lib/types/button.type';
	import Heading from './ui/heading.svelte';
	import Button from './ui/button.svelte';
	import Text from './ui/text.svelte';
	import ButtonsWrapper from './ui/buttons-wrapper.svelte';
	import type { DiagramBlockType } from '$lib/types/feature.type';
	import DiagramBlock from './diagram-block.svelte';
	export let heading: string;
	export let text: string = '';
	export let list: string[] | null = null;
	export let image: string;
	export let diagramBlock: DiagramBlockType | null = null;
	export let imageClassNames: string = '';
	export let alt: string;
	export let buttons: ButtonProps[] | null = null;
</script>

<header
	class="flex items-center justify-between mx-auto pb-16 pt-10 gap-8 xl:gap-0
		{diagramBlock ? '' : 'lg:pt-32 xl:pt-36'}
	"
	class:flex-col={diagramBlock}
>
	<div class="max-w-[545px] gradient-list-container" class:text-center={diagramBlock}>
		<Heading type="h1" class="h2" text={heading} />
		<Text class="mx-auto my-6 xl:my-8" size="medium">
			{#if text}
				{@html text}
			{/if}
		</Text>

		{#if list}
			<ul class="text-xl">
				{#each list as item}
					<li>{@html item}</li>
				{/each}
			</ul>
		{/if}
		{#if buttons}
			<ButtonsWrapper>
				{#each buttons as button}
					<Button {button} />
				{/each}
			</ButtonsWrapper>
		{/if}
	</div>
	{#if image}
		<div class="illustration max-w-xl hidden md:block">
			<img src={image} {alt} class="w-full max-h-[400px] {imageClassNames}" />
		</div>
	{/if}
	{#if diagramBlock}
		<DiagramBlock variant={diagramBlock} />
	{/if}
</header>
