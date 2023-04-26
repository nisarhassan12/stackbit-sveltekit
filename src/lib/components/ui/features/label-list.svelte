<script lang="ts">
	import type { LabelListItem } from '$lib/types/feature.type';
	import { getIcon } from '$lib/utils';
	import Text from '../text.svelte';

	export let labelList: LabelListItem[];
	let className = '';
	export { className as class };
</script>

<ul class="space-y-6 max-w-lg {className}">
	{#each labelList as item}
		{@const { heading, text, url, icon = 'CheckmarkOutline' } = item}
		<li class="flex items-center gap-4 md:gap-6">
			{#if icon}
				<svelte:component this={getIcon(icon)} class="h-8 w-8" style="flex: 0 0 32px" />
			{/if}
			<div>
				<svelte:element this={url ? 'a' : 'h3'} class="text-important text-lg font-semibold mb-4">
					{heading}
				</svelte:element>
				<Text size="small">{text}</Text>
			</div>
		</li>
	{/each}
</ul>
