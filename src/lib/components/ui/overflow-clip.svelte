<script lang="ts">
	import Button from './button.svelte';

	let className: string = '';
	export { className as class };
	export let closeButtonText: string = '';
	export let size: 'small' | 'large' = 'small';

	let shown: boolean = false;
</script>

<div
	class="
		clip-overflow 
		{shown ? 'shown' : 'not-shown'} 
		{className}
	"
	class:large={size === 'large'}
>
	<slot />

	{#if !shown}
		<div class="overlay" />
		<div class="btn-container">
			<Button
				button={{ label: 'Show more...', type: 'button', variant: 'ghost' }}
				on:click={() => (shown = true)}
			/>
		</div>
	{:else}
		<div class="text-center">
			<Button
				button={{
					type: 'button',
					label: closeButtonText || 'Show less...',
					variant: 'ghost',
					class: 'mt-6 mb-2'
				}}
				on:click={() => (shown = false)}
			/>
		</div>
	{/if}
</div>

<style lang="postcss">
	.clip-overflow {
		@apply relative overflow-hidden;

		.overlay {
			@apply absolute bottom-0 pt-[8rem] pb-[2rem] w-full z-40;
			background: linear-gradient(rgba(0, 0, 0, 0), var(--bg) 45%);
		}

		.btn-container {
			@apply absolute bottom-0 z-50 pb-2 left-1/2 -translate-x-1/2;
		}

		&.shown {
			overflow-y: visible;
			max-height: auto;
		}

		&.not-shown {
			max-height: 460px;
			overflow-y: hidden;

			@media (max-width: 768px) {
				max-height: 700px;
			}

			@media (max-width: 460px) {
				max-height: 460px;
			}
		}

		&.large.not-shown {
			max-height: 800px;

			@media (max-width: 768px) {
				max-height: 800px;
			}

			@media (max-width: 460px) {
				max-height: 800px;
			}
		}
	}
</style>
