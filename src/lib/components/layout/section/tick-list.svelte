<script lang="ts">
	export let list: string[];
	export let isMultiColumn: boolean = false;
	let className = '';
	export { className as class };
</script>

<div
	class={`gradient-list grid ${
		isMultiColumn ? 'grid-cols-2 gap-x-2 px-3 sm:px-6 md:px-16 gap-y-4 md:gap-6' : 'mt-6 gap-2'
	} ${className}`}
>
	{#each list as item}
		<li>
			{item}
		</li>
	{/each}
</div>

<style lang="postcss">
	li {
		@apply flex items-center md:text-lg;
		&::before {
			content: '';
			@apply block h-5 w-5 sm:h-7 sm:w-7 mr-2 sm:mr-2.5 bg-center bg-cover bg-no-repeat;
			background-image: url('/svgs/checkmark.svg');
		}
	}
</style>
