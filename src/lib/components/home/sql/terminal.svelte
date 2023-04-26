<script lang="ts">
	import { onMount } from 'svelte';

	const SPEED = 40;
	let preElement: HTMLElement;
	let isCursorShown: boolean = false;

	export let terminal: string;
	export let setIsTerminalReady: (state: boolean) => void;

	const codeLines = terminal && terminal.split(/\r?\n|\r|\n/g);
	const timeouts: any = [];

	const type = (line: string, interval: number) => {
		const pre = preElement;
		const characters = [...line.split(''), '\n'];

		characters.forEach((character) => {
			timeouts.push(
				setTimeout(() => {
					pre.insertAdjacentText('beforeend', character);
				}, interval)
			);
			interval = interval + SPEED;
		});
	};

	onMount(() => {
		const pre = preElement;
		pre.innerHTML = '';
		if (terminal) {
			let interval = (codeLines[0].length / 3) * SPEED;

			(codeLines as string[]).forEach((line) => {
				type(line, interval);
				interval += line.length * SPEED;
			});

			timeouts.push(
				setTimeout(() => {
					isCursorShown = false;

					setIsTerminalReady(true);
				}, interval)
			);
		}

		return () => {
			timeouts.forEach((timeout: any) => {
				clearTimeout(timeout);
			});
			isCursorShown = true;
		};
	});
</script>

<div>
	<pre class={isCursorShown ? 'shown' : ''}>
        <span>mz=&gt;&nbsp;</span>
        <span bind:this={preElement} />
      </pre>
</div>

<style lang="postcss">
	div {
		@apply bg-black border border-divider rounded-md h-[200px] w-[400px] sm:h-[300px] sm:w-[460px] shadow-default p-2 text-xs sm:text-sm text-sub;

		@media (max-width: 440px) {
			@apply w-[380px] p-1;
		}

		@media (max-width: 400px) {
			width: 320px;
		}

		@media (max-width: 340px) {
			width: 280px;
		}

		pre {
			@apply block h-full w-full rounded-[inherit] p-2 sm:p-5;
			overflow-x: auto;

			span:first-child {
				@apply text-white font-bold;
			}

			&::after {
				content: '|';
				@apply text-important transition-all duration-100;
			}

			&:not(.shown)::after {
				@apply opacity-0;
			}
		}
	}
</style>
