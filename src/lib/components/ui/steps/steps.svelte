<script lang="ts">
	import type { StepProps } from '$lib/types/step.type';
	import Step from './step.svelte';

	export let steps: StepProps[];
</script>

<div>
	{#each steps as step, idx}
		<Step step={{ ...step, idx }} />
	{/each}
</div>

<style lang="postcss">
	div {
		@apply mt-20 border-l-4 border-solid border-divider ml-4 sm:ml-8 xl:ml-12 pl-6 sm:pl-8 lg:pl-12 xl:pl-16 py-20;

		@media (max-width: 900px) {
			@apply max-w-[700px] sm:mx-10 md:mx-20;
		}

		& > :global(*:not(:last-child)) {
			@apply mb-32 xl:mb-40;
		}
	}
</style>
