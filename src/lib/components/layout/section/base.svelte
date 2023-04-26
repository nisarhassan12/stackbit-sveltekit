<script lang="ts">
	export let id: string = '';
	let className: string = '';
	export { className as class };
	export let variant: 'tight' | 'margin-less' | 'default' = 'default';
	export let isHero: boolean = false;
</script>

<section class="{variant} {className}" {id} class:hero={isHero} {...$$restProps}>
	<slot />
</section>

<style lang="postcss">
	section {
		@apply py-16 md:py-20 lg:py-28;

		&.hero {
			@apply pt-40;
		}

		&.tight {
			@apply pt-10 md:py-12 lg:py-16;
		}

		&.margin-less {
			@apply py-0;
		}
	}
</style>
