<script lang="ts">
	import type { MediaCardProps } from '$lib/types/media-card.type';
	import { getImagePath, prettyDate } from '$lib/utils';
	import Heading from '../heading.svelte';
	import BaseCard from './base.svelte';

	export let card: MediaCardProps;

	const { image, invertImageOnDark, alt, name, title, url, date } = card;
</script>

<BaseCard size="sm" class="">
	<img
		src={getImagePath(image)}
		alt={alt || name}
		class={`max-w-[200px] h-[55px] ${invertImageOnDark ? 'dark:filter dark:invert' : ''}`}
	/>
	<p class="text-orchid mt-6">{name}</p>
	<div>
		<a href={url} target={url.startsWith('/') ? '_self' : '_blank'}>
			<Heading text={title} type="h3" class="h4 mt-1 mb-6" />
		</a>
	</div>
	<p>{prettyDate(date)}</p>
</BaseCard>
