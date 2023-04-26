<script lang="ts">
	import { eventInPast, prettyDate } from '$lib/utils';
	import Button from '../ui/button.svelte';
	import Heading from '../ui/heading.svelte';

	export let category: string;
	export let title: string;
	export let description: string;
	export let date: string;
	export let path: string;
	export let image: string;
</script>

<div
	class="md:flex text-left text-base gap-8 rounded-lg shadow-dissipate p-4 card border border-divider"
>
	{#if image}
		<div class="relative max-w-xs rounded-lg overflow-hidden">
			<p class="absolute rounded-lg bg-card text-sub p-2 m-2 inline-block">{prettyDate(date)}</p>
			<img src={image} alt={title} class="w-full h-full object-cover" />
		</div>
	{/if}
	<div>
		{#if category}
			<p class="gradient-text font-semibold uppercase text-sm">{category}</p>
		{/if}
		<a href={path} class="block no-underline mt-2">
			<Heading type="h3" class="h4" text={title} />
		</a>
		<p class="my-4">{description}</p>
		<Button
			button={{
				url: path,
				label: eventInPast(date) ? 'Watch Replay' : 'Register Now ➞',
				variant: 'ghost'
			}}
		/>
	</div>
</div>
