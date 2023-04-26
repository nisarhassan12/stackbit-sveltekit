<script lang="ts">
	import type { ButtonProps } from '$lib/types/button.type';
	import Container from './container.svelte';
	import Button from './ui/button.svelte';
	import ButtonsWrapper from './ui/buttons-wrapper.svelte';
	import Heading from './ui/heading.svelte';
	import Text from './ui/text.svelte';

	export let heading: string;
	export let headingClassNames: string = '';
	export let text: string = '';
	export let textClassNames: string = '';
	export let buttons: ButtonProps[] | null = null;
	export let isCentered: boolean = false;
</script>

<header class={isCentered ? 'text-center' : ''}>
	<Heading type="h1" class="{isCentered ? 'h1' : 'h2'} {headingClassNames}" text={heading} />
	{#if text}
		<Text class="mt-6 {textClassNames}" size="medium">{text}</Text>
	{/if}
	{#if buttons}
		<ButtonsWrapper class="mt-6">
			{#each buttons as button}
				<Button {button} />
			{/each}
		</ButtonsWrapper>
	{/if}
	<slot />
</header>

<style lang="postcss">
	header {
		@apply mt-40 mb-10;
	}
</style>
