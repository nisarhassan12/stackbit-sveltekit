<script lang="ts">
	import { getPostTypeByLayout, isBackgroundWhite } from '$lib/utils';
	import PostHeader from '$lib/components/posts/post-header.svelte';
	import './post.postcss';
	import Toc from '../posts/toc.svelte';
	import Sidebar from '../posts/sidebar.svelte';
	import Text from '../ui/text.svelte';
	import Heading from '../ui/heading.svelte';
	import EventHeader from '../posts/event-header.svelte';
	import List from '../ui/person/list.svelte';

	export let route: string;
	export let metadata: any;

	const postType = getPostTypeByLayout(route);

	const isACustomerStoriesPage = postType === 'customer-stories';
	const isAnEventsPage = postType === 'events';

	const mapTypeToHeader: any = {
		blog: PostHeader,
		'press-releases': PostHeader,
		guides: PostHeader,
		events: EventHeader
	};

	const plainClasses = 'mx-auto gradient-list-container';

	const mapPostTypeToClasses: any = {
		'customer-stories':
			'w-full max-w-3xl p-4 md:p-6 lg:p-12 mb-28 card rounded-xl bg-card border-divider shadow-default',
		blog: plainClasses,
		guides: plainClasses,
		events: plainClasses
	};
</script>

<svelte:head>
	<link rel="stylesheet" href="/prism-theme.css" />
</svelte:head>

{#if isACustomerStoriesPage}
	<div class="mt-6 mb-6 md:mb-10">
		<a href="/customer-stories">← Back to all Customer Stories</a>
	</div>
{/if}

<div
	class="post-layout mx-auto"
	class:max-w-7xl={!isACustomerStoriesPage}
	class:light={isBackgroundWhite(route)}
>
	{#if !isACustomerStoriesPage}
		<svelte:component this={mapTypeToHeader[postType]} {metadata} {postType} />
	{/if}

	<div class="flex items-start relative">
		{#if !isACustomerStoriesPage && !isAnEventsPage}
			<Toc />
		{/if}
		{#if isACustomerStoriesPage}
			{@const { logo, label, sidebar } = metadata}
			<Sidebar {logo} {label} {sidebar} />
		{/if}

		<div
			class="w-full max-w-prose prose prose-lg 2xl:prose-xl pb-28 {mapPostTypeToClasses[postType]}"
		>
			{#if isACustomerStoriesPage}
				{@const { eyebrow, title, image, label } = metadata}
				<Text size="small" variant="gradient">{eyebrow}</Text>
				<Heading type="h1" class="h2 !font-medium !text-4xl mt-4" text={title} />
				<img src={image} alt={label} class="rounded-lg my-8" />
			{/if}
			<div
				class="post-body"
				class:customer-story={isACustomerStoriesPage}
				class:default-post={!isACustomerStoriesPage}
			>
				<slot />

				{#if isAnEventsPage}
					<div class="flex flex-col py-12 ">
						<h2 class="font-display text-3xl font-semibold mb-10">Presenters:</h2>
						{#if metadata.authors}
							<List authors={metadata.authors} full={true} />
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
