<script lang="ts">
	import IntegratedTerminal from './integrated-terminal.svelte';
	import Highlight from 'svelte-highlight';
	import sql from 'svelte-highlight/languages/sql';
	import dark from 'svelte-highlight/styles/atom-one-dark.css';

	export let code: any;
	export let isVisible: boolean;
	export let Component: any;
	export let isTerminalReady: boolean;
	export let setIsTerminalReady: (status: boolean) => void;
</script>

<div class="container">
	<div class="controls-bar">
		<span>{code.fileName}</span>
	</div>
	<Highlight language={sql} code={code.contents} class="light" />
	{#key isVisible}
		{#key code}
			<IntegratedTerminal fileName={isVisible ? code.fileName : null} {setIsTerminalReady} />
		{/key}
	{/key}
	<div class="results">
		{#if Component}
			<svelte:component this={Component} {isTerminalReady} />
		{/if}
	</div>
</div>

<style lang="postcss">
	.container {
		@apply border border-divider rounded-t-lg w-[560px] relative;

		@media (max-width: 610px) {
			@apply w-[505px];
		}

		@media (max-width: 510px) {
			@apply w-full;
		}

		pre {
			@apply !leading-7 text-[15px] !py-5;

			@media (max-width: 610px) {
				@apply text-sm !py-3 !px-1;
			}

			@media (max-width: 510px) {
				@apply text-xs;
			}
		}

		.controls-bar {
			@apply flex bg-bg rounded-t-lg pt-3 px-3;

			span {
				@apply inline-block px-3 pt-2.5 pb-1.5 rounded-t-lg text-sm text-important border border-divider border-b-0;
				font-family: 'Fira Code', monospace;
			}
		}

		.results {
			@apply absolute top-full;

			@media (max-width: 795px) {
				@apply left-1/2 -translate-x-1/2 translate-y-6;
			}

			@media (min-width: 796px) {
				@apply transform -translate-y-14 left-60;
			}

			& > :global(*) {
				@apply opacity-0 transform -translate-y-10 transition-all duration-[0] ease-out;
				transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
			}

			& > :global(.active) {
				@apply opacity-100 transform-none duration-[1s];
			}
		}
	}
</style>
