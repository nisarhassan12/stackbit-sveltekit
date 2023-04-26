<script lang="ts">
	import { getImagePath } from '$lib/utils';

	export let src: string;
	export let alt: string;
	export let size: 'xs' | 'sm' | 'md' | 'lg' = 'sm';
	let className = '';
	export { className as class };
</script>

<div class="gradient-avatar {className} p-0.5 rounded-full">
	<div class={`relative ${size} rounded-full overflow-hidden bg-card`}>
		<div class="absolute -inset-1">
			<div class="text-center w-full h-full ">
				<img src={getImagePath(src)} {alt} title={alt} class="filter grayscale" />
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.gradient-avatar {
		background-image: var(--primary-gradient);

		.xs {
			@apply h-8 w-8;
		}

		.sm {
			@apply h-10 w-10;
		}

		.md {
			@apply h-12 w-12;
		}
	}
</style>
