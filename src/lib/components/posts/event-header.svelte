<script lang="ts">
	import { eventInPast, prettyDate } from '$lib/utils';
	import { text } from 'svelte/internal';
	import Eyebrow from '../ui/eyebrow.svelte';
	import Heading from '../ui/heading.svelte';
	import Text from '../ui/text.svelte';
	import YoutubeEmbed from './youtube-embed.svelte';

	export let metadata: any;

	export let { category, title, date, embedId } = metadata;
</script>

<div class="text-center pt-10 pb-12">
	<span
		class="relative lg:translate-y-2 inline-block text-body uppercase tracking-wide font-semibold text-base"
	>
		<a href="/events/">Events</a>
		&nbsp;/&nbsp;
	</span>
	<Eyebrow text={category} />
	<Heading type="h1" class="h2 mt-5 mb-8 max-w-4xl mx-auto" text={title} />
	<Text size="medium" class="mb-8">
		{prettyDate(date)}
	</Text>
	{#if eventInPast(date)}
		<YoutubeEmbed {embedId} />
	{/if}
</div>
