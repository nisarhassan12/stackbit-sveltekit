<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' = 'sm';
	export let variant: 'default' | 'lined' | 'timeline' = 'default';
	let className: string = '';
	export { className as class };
	export let themeOverride: 'dark' | 'light' | '' = '';
	export let hasGradientBorder: boolean = false;
</script>

<div
	class="{variant === 'default' || variant === 'timeline'
		? 'card default'
		: variant} {size} {className}"
	class:gradient={hasGradientBorder}
	class:timeline={variant === 'timeline'}
	data-theme={themeOverride}
>
	<slot />
</div>

<style lang="postcss">
	div {
		&.lined {
			@apply bg-bg py-8 md:p-8 lg:p-16;
		}

		&.sm,
		&.md {
			@apply rounded-2xl;
		}

		&.sm {
			@apply w-full px-6 py-11 max-w-[400px];
		}

		&.md {
			@apply py-10 sm:py-16 px-6 sm:px-8 lg:px-12;
		}

		&.default.lg {
			@apply px-10 py-10 lg:py-14 rounded-2xl lg:rounded-3xl;
		}

		&.gradient {
			background: var(--primary-gradient);
			@apply p-[1px];

			& > :global(*) {
				@apply h-full w-full bg-card rounded-[15px] px-6 py-11;
			}
		}

		&.timeline {
			@apply max-w-[416px] py-6;
		}
	}
</style>
