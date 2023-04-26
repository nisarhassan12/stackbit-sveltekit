<script lang="ts">
	import type { ButtonProps } from '$lib/types/button.type';

	export let button: ButtonProps;
	const {
		type = 'a',
		url,
		label,
		variant = 'cta',
		size = 'sm',
		class: classNames = '',
		download
	} = button;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svelte:element
	this={type}
	href={url}
	class="{classNames} btn btn-{variant} btn-{size} {variant === 'ghost' && 'gradient-border'} group"
	on:click
	{download}
>
	<span data-sb-field-path={$$restProps['data-sb-field-path'] && '.label'}>{label}</span>
	{#if variant === 'cta'}
		<svg class="arrow stroke-current stroke-2" viewBox="0 0 10 10" aria-hidden="true">
			<path
				class="opacity-100 transition-transform group-hover:translate-x-1 fill-transparent"
				d="M1 1l4 4-4 4"
			/>
			<path class="opacity-0 transition-opacity group-hover:opacity-100" d="M0 5h10" />
		</svg>
	{:else if variant === 'text'}
		<span>&nbsp;&rarr;</span>
	{/if}
</svelte:element>
