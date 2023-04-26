<script lang="ts">
	import type { MediaCardProps } from '$lib/types/media-card.type';
	import Section from './section.svelte';
	import MediaCard from './ui/card/media-card.svelte';
	import OverflowClip from './ui/overflow-clip.svelte';

	export let heading: string;
	export let text: string;
	export let cards: MediaCardProps[];
</script>

<Section {heading} {text}>
	<OverflowClip size="large">
		<div class="mt-8 lg:mt-14 max-w-7xl mx-auto">
			<div class="flex flex-wrap justify-center gap-8">
				{#each cards as card}
					<MediaCard {card} />
				{/each}
			</div>
		</div>
	</OverflowClip>
</Section>
