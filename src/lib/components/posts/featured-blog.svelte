<script lang="ts">
	import { prettyDate } from '$lib/utils';
	import Button from '../ui/button.svelte';
	import GradientStroke from '../ui/gradient-stroke.svelte';
	import Heading from '../ui/heading.svelte';
	import List from '../ui/person/list.svelte';
	import Text from '../ui/text.svelte';

	export let title: string;
	export let date: string;
	export let description: string;
	export let people_refs: string;
	export let path: string;
	export let authors: any;
	let className: string = '';
</script>

<div class="featured-blog">
	<GradientStroke class="card">
		<div>
			<p class="featured gradient-text">Featured</p>

			<a class="no-underline" href={path}>
				<Heading text={title} type="h2" class="h3" />
			</a>
			<Text class="my-4 text-lg">{description}</Text>
			<Text class="text-lg mb-4">{prettyDate(date)}</Text>
			{#if authors}
				<List {authors} />
			{/if}
			<Button button={{ url: path, label: 'Read More', variant: 'text', class: 'mt-6' }} />
		</div>
	</GradientStroke>
</div>

<style lang="postcss">
	:global(.featured-blog) :global(.card) {
		@apply mb-10 p-3 text-left;

		&,
		& > div {
			@apply rounded-xl;
		}

		& > div {
			@apply p-6 sm:p-10 bg-card-light;
		}

		.featured {
			@apply uppercase mb-2 font-semibold;
			letter-spacing: 0.1em;
		}
	}
</style>
