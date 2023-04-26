<script lang="ts">
	import { prettyDate } from '$lib/utils';

	export let metadata;
	export let postType: 'blog' | 'guides';
	const { title, date, category, image, description } = metadata;
</script>

<div class="flex justify-between items-center pt-10 pb-14 gap-12">
	<div class="flex flex-col gap-4 max-w-2xl">
		<div class="text-lg flex flex-wrap items-center gap-4">
			<div class="flex items-center gap-2">
				<a href="/{postType}" class="post-type-link">{postType}</a>

				{#if postType === 'blog'}
					{#if category}
						<span>&gt;</span>
						<a href={`/blog?search=${category.replace(' ', '+')}`}>
							{category}
						</a>
					{/if}
					{#if date}
						<span>
							{prettyDate(date)}
						</span>
					{/if}
				{/if}
			</div>
		</div>
		<h1>{title}</h1>
		<p>{description}</p>
	</div>
	<img src={image} alt={description} class="hidden md:block shadow-m rounded-lg max-w-lg" />
</div>

<style lang="postcss">
	.post-type-link {
		&::first-letter {
			@apply uppercase;
		}
	}
</style>
