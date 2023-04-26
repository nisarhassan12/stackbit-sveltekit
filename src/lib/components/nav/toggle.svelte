<script lang="ts">
	export let onClick: () => void;
	export let isOpen: boolean;
	let className = 'h2';
	export { className as class };
</script>

<button on:click={onClick} class={className}>
	<div class={isOpen ? 'open' : ''}>
		<span />
	</div>
</button>

<style lang="postcss">
	div {
		@apply flex flex-col items-center justify-center h-12 w-12 rounded-xl transform translate-x-2 transition-all duration-200;

		span,
		&::before,
		&::after {
			content: '';
			@apply h-0.5 w-6 rounded-[2px] bg-sub transition-all duration-200 ease-out;
		}

		&::before {
			@apply mb-1.5;
		}

		&::after {
			@apply mt-1.5;
		}

		&.open {
			&::before,
			&::after {
				@apply bg-important;
			}

			span {
				opacity: 0;
			}

			&:before {
				transform: rotate(-135deg);
				@apply -mb-2.5;
			}

			&::after {
				transform: rotate(135deg);
			}
		}
	}
</style>
