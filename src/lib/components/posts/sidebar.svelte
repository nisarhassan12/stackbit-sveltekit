<script lang="ts">
	export let logo: string;
	export let label: string;
	export let sidebar: { heading: string; subheading: string }[];
	let className = '';
	export { className as class };
</script>

<div class="hidden md:block md:max-w-[280px] lg:max-w-xs mr-6 lg:mr-12 {className}">
	<img src={logo} alt={label} class="invert-on-light max-w-[120px] mb-6" />
	{#each sidebar as { heading, subheading }}
		<p class="heading gradient-text mt-8 mb-2 inline-block">{heading}</p>
		<p>{subheading}</p>
	{/each}
</div>

<style lang="postcss">
	.heading {
		@apply text-xs uppercase font-semibold;
	}

	.heading + p {
		@apply text-sm mt-4;
	}
</style>
