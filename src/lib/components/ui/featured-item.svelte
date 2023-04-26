<script lang="ts">
	import type { FeaturedItem } from '$lib/types/featured-item.type';

	export let featuredItem: FeaturedItem;

	const { image, title, caption, isCentered } = featuredItem;
</script>

<figure class={isCentered ? 'flex flex-col justify-center items-center mt-8' : ''}>
	<img src={image} alt={title} />
	<figcaption class="text-center mt-4 text-base max-w-full md:max-w-md">{@html caption}</figcaption>
</figure>
