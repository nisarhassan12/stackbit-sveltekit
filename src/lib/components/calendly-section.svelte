<script lang="ts">
	import type { ButtonProps } from '$lib/types/button.type';
	import { onMount } from 'svelte';
	import Section from './section.svelte';

	export let eyebrow: string;
	export let heading: string;
	export let text: string;
	export let buttons: ButtonProps[];
	export let calendlyUrl: string;

	onMount(() => {
		const script = document.createElement('script');
		script.setAttribute('src', 'https://calendly.com/assets/external/widget.js');

		document.body.appendChild(script);
	});
</script>

<svelte:head>
	<link href="https://calendly.com/assets/external/widget.css" rel="stylesheet" />
</svelte:head>

<Section
	{heading}
	{text}
	{eyebrow}
	{buttons}
	variant="tight"
	class={`relative`}
	headerClassNames="max-w-3xl mx-auto"
	headingType="h1"
>
	<div
		class="calendly-inline-widget"
		data-url={calendlyUrl}
		style="min-width:250px;height:780px;"
	/>
</Section>
