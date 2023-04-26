<script lang="ts">
	import { prettyDate } from '$lib/utils';
	import Button from '../ui/button.svelte';
	import Heading from '../ui/heading.svelte';
	import List from '../ui/person/list.svelte';

	export let title: string;
	export let description: string = '';
	export let excerpt: string = '';
	export let date: string;
	export let path: string;
	export let category: string;
	export let image: string;
	export let authors: any;
</script>

<div class="post-preview shadow-sm rounded-2xl mt-10 pb-16">
	<div>
		<p class="uppercase font-semibold text-sm gradient-text">{category}</p>
		{#if date}
			<p>{prettyDate(date)}</p>
		{/if}
	</div>
	<div>
		<Heading type="h2" class="h4 max-w-lg" text={title} />
		{#if authors}
			<div class="max-w-[200px]">
				<List {authors} compact={true} />
			</div>
		{/if}
	</div>
	<div>
		<div class="max-w-lg">
			{#if description}
				<p>{description}</p>
			{:else if excerpt}
				<p>{excerpt}</p>
			{/if}
			<Button
				button={{
					url: path,
					label: 'Read More',
					variant: 'text',
					class: 'mt-6'
				}}
			/>
		</div>
		{#if image}
			<img src={image} alt={title} class="max-w-xs rounded-lg shadow-m object-cover" />
		{/if}
	</div>
</div>

<style lang="postcss">
	.post-preview {
		@apply space-y-4;

		& > * {
			@apply flex justify-between;
		}
	}
</style>
