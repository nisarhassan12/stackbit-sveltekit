<script lang="ts">
	import DropdownArrow from './dropdown-arrow.svelte';

	export let text: string;
	export let linkLists: any;
	export let item_refs: any;
	export let clickHandler: () => void;

	let active: boolean = false;

	const handleClick = () => {
		active = !active;
	};
</script>

<div>
	<button on:click={handleClick}>
		{text}
		<DropdownArrow {active} />
	</button>

	{#if active}
		<div>
			{#each linkLists.filter(({ desktop_only }) => !desktop_only) as { heading, is_main, links }}
				<div>
					{#if !is_main}
						<p class="label">{heading}</p>
					{/if}
					<div class={`links ${!is_main ? 'sub' : ''}`}>
						{#each links as link}
							{@const { text, url } = link}
							<a href={url} class="block" on:click={clickHandler}>{text}</a>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	button {
		@apply flex items-center;
	}

	.svg-parent {
		@apply h-5 w-5;
	}

	.label {
		@apply mt-3 text-xs uppercase text-sub font-semibold;
	}

	.links {
		a {
			@apply text-sm;
		}

		&:not(.sub) {
			@apply space-y-2 mt-2;
		}

		&.sub {
			@apply pl-4 mt-2 space-y-1.5;
		}
	}
</style>
