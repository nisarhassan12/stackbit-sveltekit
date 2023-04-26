<script lang="ts">
	import StreamingDatabaseArchitectureApplications from './svgs/streaming-database-architecture-applications.svelte';
	import StreamingDatabaseDataEngineeringArchitecture from './svgs/streaming-database-data-engineering-architecture.svelte';
	import StreamingDatabaseMinimal from './svgs/streaming-database-minimal.svelte';
	import StreamingDatabaseModelOfWorkStandalone from './svgs/streaming-database-model-of-work-standalone.svelte';
	import StreamingDatabaseModelOfWork from './svgs/streaming-database-model-of-work.svelte';
	import TraditionalDatabaseModelOfWorkStandalone from './svgs/traditional-database-model-of-work-standalone.svelte';
	import TraditionalDatabaseModelOfWork from './svgs/traditional-database-model-of-work.svelte';
	export let name: string;
	export let caption: string;

	const nameToSvgMap: any = {
		'streaming-database-architecture-applications': StreamingDatabaseArchitectureApplications,
		'streaming-database-data-engineering-architecture':
			StreamingDatabaseDataEngineeringArchitecture,
		'streaming-database-minimal.svelte': StreamingDatabaseMinimal,
		'streaming-database-model-of-work-standalone': StreamingDatabaseModelOfWorkStandalone,
		'streaming-database-model-of-work': StreamingDatabaseModelOfWork,
		'traditional-database-model-of-work-standalone': TraditionalDatabaseModelOfWorkStandalone,
		'traditional-database-model-of-work': TraditionalDatabaseModelOfWork
	};
</script>

<svelte:component this={nameToSvgMap[name]} {...$$restProps} />

{#if caption}
	<div class="mt-2 text-center"><em>{caption}</em></div>
{/if}
