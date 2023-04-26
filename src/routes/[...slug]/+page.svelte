<script lang="ts">
	import { renderPostLayout } from '../../lib/utils/index';

	export let data;
	const { content, components, currentRoute } = data;
</script>

{#if components}
	{#each components as { component, props }}
		<svelte:component this={component} {...props} />
	{/each}
{/if}

<div
	class={!components && !renderPostLayout(currentRoute)
		? 'post-body gradient-list-container default-post post-layout max-w-3xl mx-auto pt-16 pb-28'
		: ''}
>
	<svelte:component this={content} />
</div>
