<script lang="ts">
	import { onMount } from 'svelte';

	export let fileName: string;
	let ref: HTMLElement;
	let isCursorShown = true;
	export let setIsTerminalReady: (status: boolean) => void;

	const timeouts: any = [];

	const type = () => {
		const target = ref;
		const SPEED = 40;
		const characters = [...`psql -f ${fileName}`.split('')];
		let interval = SPEED;

		characters.forEach((character) => {
			timeouts.push(
				setTimeout(() => {
					target.insertAdjacentText('beforeend', character);
				}, interval)
			);
			interval = interval + SPEED;
		});

		timeouts.push(
			setTimeout(() => {
				isCursorShown = false;
				setIsTerminalReady(true);
			}, interval)
		);
	};

	onMount(() => {
		const target = ref;
		target.innerHTML = '';
		if (fileName) {
			let terminalDelay: number;
			// 1185 is bound to the media queries in sql/index.tsx and sql/mobile.tsx
			if (window.innerWidth <= 1185 || localStorage.getItem('terminal-delay') === null) {
				terminalDelay = 2000;
			} else {
				terminalDelay = 0;
			}
			timeouts.push(
				setTimeout(() => {
					type();
				}, terminalDelay)
			);
			localStorage.setItem('terminal-delay', '0');
		}

		return () => {
			timeouts.forEach((timeout: any) => {
				clearTimeout(timeout);
			});
			isCursorShown = true;
			setIsTerminalReady(false);
		};
	});
</script>

<div class="{isCursorShown ? 'shown' : ''} terminal">
	$&nbsp;
	<span bind:this={ref} />
</div>
