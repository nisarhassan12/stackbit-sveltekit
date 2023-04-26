<script lang="ts">
	import { onMount } from 'svelte';
	import TexContainer from './tex-container.svelte';
	import Ide from './ide.svelte';

	export let thing: any;

	let ref: HTMLDivElement;
	let isVisible: boolean = false;
	let isTerminalReady: boolean = false;

	const setIsTerminalReady = (status: boolean) => {
		isTerminalReady = status;
	};

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
					}
				});
			},
			{
				threshold: 0.5
			}
		);

		observer.observe(ref);
	});
</script>

<div bind:this={ref} class={isVisible ? 'active' : ''}>
	<TexContainer {...thing} />
	<Ide
		{isTerminalReady}
		{setIsTerminalReady}
		code={thing.code}
		{isVisible}
		Component={thing.Component}
	/>
</div>

<style lang="postcss">
	div {
		@apply flex flex-col items-center space-y-7 sm:space-y-8;

		& > * {
			@apply opacity-0 transform translate-y-[100px];
			transition: opacity 1s, transform 1s;
			transition-timing-function: cubic-bezier(0.33, 1, 0.68, 1);

			:first-child {
				transition-delay: 0ms;
			}

			:nth-of-type(2n) {
				transition-delay: 200ms;
			}

			:last-child {
				transition-delay: 400ms;
			}
		}

		&.active {
			& > * {
				@apply opacity-100 transform-none;
			}
		}
	}
</style>
