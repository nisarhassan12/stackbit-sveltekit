<script lang="ts">
	import Logo from '../logo.svelte';
	import Dialog from './dialog.svelte';
	export let clickHandler: () => void;

	let isDialogShown: boolean = false;

	const handleClick = (e: MouseEvent) => {
		clickHandler();
		// @ts-ignore
		if (e.type === 'contextmenu' || e.nativeEvent.button === 2) {
			e.preventDefault();
			isDialogShown = true;
		}
	};
</script>

<div class="relative">
	<a href="/" class="flex items-center" on:click={handleClick} on:contextmenu={handleClick}>
		<Logo />
	</a>

	{#if isDialogShown}
		<Dialog
			closeHandler={() => {
				isDialogShown = false;
			}}
		/>
	{/if}
</div>
