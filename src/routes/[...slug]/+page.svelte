<script>
	export let data;
	console.log(data);
	const { content, components } = data;
</script>

{#if components}
	{#each components as { component, props }}
		<svelte:component this={component} {...props} />
	{/each}
{/if}

<div>
	<svelte:component this={content} />
</div>
