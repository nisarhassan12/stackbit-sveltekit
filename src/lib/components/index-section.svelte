<script lang="ts">
	import type { ButtonProps } from '$lib/types/button.type';
	import PostPreview from './posts/post-preview.svelte';
	import EventPreview from './posts/event-preview.svelte';
	import StoryPreview from './posts/story-preview.svelte';
	import Button from './ui/button.svelte';
	import ButtonsWrapper from './ui/buttons-wrapper.svelte';
	import Heading from './ui/heading.svelte';
	import FeaturedBlog from './posts/featured-blog.svelte';
	import FeaturedStory from './posts/featured-story.svelte';
	export let heading: string = '';
	export let data: any;
	export let featured: any;
	export let layout: string;
	export let show: number;
	export let buttons: ButtonProps[];
	export let isCentered: boolean = false;

	const slugToPreviewComponentMap: any = {
		blog: PostPreview,
		guides: PostPreview,
		'press-releases': PostPreview,
		events: EventPreview,
		'customer-stories': StoryPreview
	};

	const layoutToFeaturedComponentMap: any = {
		blog: FeaturedBlog,
		'customer-stories': FeaturedStory
	};

	let items_to_render: any = [];

	data &&
		data.forEach((item: any, i: number) => {
			if (show && i < show) {
				items_to_render.push(item);
			} else if (!show) {
				items_to_render.push(item);
			}
		});
</script>

<section class:centered={isCentered} class="pb-28">
	{#if heading}
		<Heading type="h2" class="h2 mb-10" text={heading} />
	{/if}
	{#if featured}
		<div class={layout !== 'customer-stories' ? 'max-w-4xl' : ''}>
			<svelte:component this={layoutToFeaturedComponentMap[layout]} {...featured} />
		</div>
	{/if}
	<div class="space-y-8 {layout !== 'customer-stories' ? 'max-w-4xl' : ''}">
		{#each items_to_render as listing}
			{@const type = listing.path.split('/')[1]}
			<svelte:component this={slugToPreviewComponentMap[type]} {...listing} />
		{/each}
	</div>
	{#if buttons}
		<ButtonsWrapper class="justify-center mt-10">
			{#each buttons as button}
				<Button {button} />
			{/each}
		</ButtonsWrapper>
	{/if}
</section>

<style lang="postcss">
	.centered {
		:global(.h2) {
			text-align: center;
		}

		div {
			@apply mx-auto;
		}
	}
</style>
