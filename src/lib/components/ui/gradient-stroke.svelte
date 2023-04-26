<script lang="ts">
	let className = '';
	export { className as class };
</script>

<div class={className}>
	<slot />
</div>

<style lang="postcss">
	div {
		@apply p-[1px];
		background-image: var(--primary-gradient);

		& > :global(*) {
			@apply bg-bg;
		}
	}
</style>
