<script lang="ts">
	import Credit from './credit.svelte';

	export let authors: any;
</script>

<div class="flex gap-6 lg:gap-12 flex-wrap">
	{#each authors as author}
		<Credit {...author} class="w-56" />
	{/each}
</div>
