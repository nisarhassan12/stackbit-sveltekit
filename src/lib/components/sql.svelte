<script lang="ts">
	import { onMount } from 'svelte';
	import Section from './section.svelte';
	import { things, type Thing } from './home/sql/things';
	import Switcher from './home/sql/switcher.svelte';
	import Ide from './home/sql/ide.svelte';
	import Mobile from './home/sql/mobile.svelte';
	import './home/sql/sql.postcss';

	let elementRef: HTMLElement;
	let activeThing: Thing = things[0];
	let isVisible: boolean = false;
	let isTerminalReady = false;

	const setIsTerminalReady = (status: boolean) => {
		isTerminalReady = status;
	};

	const handleSetActive = (text: string) => {
		if (text === activeThing.heading) return;
		activeThing = things.find(({ heading }) => heading === text) as Thing;
	};

	onMount(() => {
		localStorage.removeItem('terminal-delay');
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					isVisible = true;
				}
			},
			{
				threshold: 0.4
			}
		);

		observer.observe(elementRef);

		return () => {
			observer.disconnect();
		};
	});
</script>

<Section
	heading="Managed in standard SQL"
	text="Give your team streaming data capabilities without changing their language or workflow."
	headingClassNames="h2 mb-10"
	variant="tight"
>
	<div class="sql">
		<div bind:this={elementRef} class={`parent-desktop ${isVisible ? 'active' : ''}`}>
			<Switcher {things} {activeThing} setActive={handleSetActive} />

			<Ide
				code={activeThing.code}
				{isVisible}
				Component={activeThing.Component}
				{isTerminalReady}
				{setIsTerminalReady}
			/>
		</div>
		<Mobile />
	</div>
</Section>
