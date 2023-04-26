<script lang="ts">
	import GradientAvatar from '../gradient-avatar.svelte';

	export let authors: any;
</script>

<div class="flex items-center justify-center">
	<div class="flex mr-6">
		{#each authors as author, idx}
			<div class="-mr-4" style="z-index: {idx * 10}">
				<GradientAvatar size="xs" alt={author.name} src={author.image} />
			</div>
		{/each}
	</div>
</div>
