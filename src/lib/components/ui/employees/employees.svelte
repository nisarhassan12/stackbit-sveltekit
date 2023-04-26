<script lang="ts">
	import Default from './default.svelte';
	import Detailed from './detailed.svelte';
	import Eyebrow from '../eyebrow.svelte';
	import Heading from '../heading.svelte';
	import type { Employee } from '$lib/types/employee.type';

	export let employee: Employee;

	const { layout, eyebrow, heading, text, people } = employee;
</script>

<div>
	<div
		class={layout === 'default' ? 'space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl' : ''}
	>
		<div class="pb-20 text-center">
			{#if eyebrow}
				<Eyebrow text={eyebrow} />
			{/if}
			{#if heading}
				<Heading type="h3" class="h3 text-left" text={heading} />
			{/if}
			{#if text}
				<p>{text}</p>
			{/if}
		</div>
	</div>
	{#if layout === 'default'}
		<Default {people} />
	{:else}
		<Detailed {people} />
	{/if}
</div>
