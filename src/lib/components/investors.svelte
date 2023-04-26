<script lang="ts">
	import Section from './section.svelte';

	const investors = [
		{
			src: '/images/logos/lightspeed.webp',
			alt: 'Lightspeed'
		},
		{
			src: '/images/logos/kleiner.webp',
			alt: 'Kleiner Perkins'
		},
		{
			src: '/images/logos/redpoint.webp',
			alt: 'Redpoint'
		}
	];
</script>

<Section heading="Backed By The Best" id="investors">
	<div>
		{#each investors as { src, alt }}
			<img {src} {alt} />
		{/each}
	</div>
</Section>

<style lang="postcss">
	div {
		@apply flex flex-wrap justify-center gap-5 mt-20;

		img {
			@apply rounded-lg dark:filter dark:grayscale dark:invert;
		}
	}
</style>
