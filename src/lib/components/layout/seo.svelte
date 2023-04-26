<script lang="ts">
	export let metadata: any;
</script>

<svelte:head>
	{#if metadata}
		{@const { title, description, noindex, image } = metadata}
		<title>{title || 'Materialize: The Streaming Database'}</title>
		<meta name="title" content={title} />
		<meta
			name="description"
			content={description ||
				'Materialize is a streaming SQL database for real-time applications, live dashboards, and streaming data pipelines. It provides the simplicity of SQL queries, but with millisecond-level latency for real-time data.'}
		/>
		{#if noindex}
			<meta name="robots" content="noindex" />
		{/if}
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />

		{#if image}
			<meta property="og:image" content={`${image.replace('.webp', '.jpg')}`} />
		{/if}

		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
		{#if image}
			<meta name="twitter:image" content={`${image.replace('.webp', '.jpg')}`} />
		{/if}
	{/if}
</svelte:head>
