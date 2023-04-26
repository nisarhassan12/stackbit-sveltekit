<script lang="ts">
	import FeaturedStory from './posts/featured-story.svelte';

	export let featured: any;
</script>

<FeaturedStory {...featured} />
