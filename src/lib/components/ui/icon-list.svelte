<script lang="ts">
	import type { IconList } from '$lib/types/icon-list.type';
	import { getIcon } from '$lib/utils';

	export let iconList: IconList;
</script>

<ul class="space-y-7">
	{#each iconList as { heading, icon }}
		<li class="flex items-center text-lg">
			<svelte:component this={getIcon(icon)} />
			<p>{heading}</p>
		</li>
	{/each}
</ul>

<style lang="postcss">
	li {
		:global(svg) {
			@apply h-6 w-6 mr-4;
			flex: 0 0 24px;
		}
	}
</style>
