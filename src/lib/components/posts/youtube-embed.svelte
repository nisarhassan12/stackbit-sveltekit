<script lang="ts">
	import Share from './share.svelte';

	export let embedId: string;
</script>

<div class="max-w-6xl mx-auto">
	<div class="embed">
		<iframe
			src={`https://www.youtube.com/embed/${embedId}`}
			title="YouTube video player"
			frameBorder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
		/>
	</div>
	<Share url={`https://youtube.com/watch?v=${embedId}`} class="mt-8" />
</div>

<style lang="postcss">
	.embed {
		@apply relative w-full h-0;
		padding-bottom: 56.25%;
	}

	iframe {
		@apply absolute top-0 left-0 h-full w-full;
	}
</style>
