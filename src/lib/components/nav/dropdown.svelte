<script lang="ts">
	import { onMount } from 'svelte';
	import Container from '../container.svelte';
	import DropdownArrow from './dropdown-arrow.svelte';
	import FeaturedBlog from './featured-post.svelte';

	export let text: string;
	export let linkLists: any;
	export let featured_post: any;
	export let item_refs: any;

	let buttonEl: HTMLButtonElement;
	let backdropEl: HTMLDivElement;
	let active: boolean;

	const handleClick = () => {
		active = !active;
	};

	const handleClickOutside = (e: Event) => {
		const eventTarget = e.target;
		const targets: Element[] = [backdropEl, buttonEl];
		if (backdropEl && backdropEl) {
			const container = backdropEl.children[0];
			targets.push(
				container,
				...Array.from(container.children),
				...Array.from(document.querySelectorAll('.label'))
			);
		}
		if (targets.every((target) => target !== eventTarget)) {
			active = false;
		}
	};

	const handleEscPress = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			active = false;
		}
	};

	onMount(() => {
		window.addEventListener('click', handleClickOutside);
		window.addEventListener('keydown', handleEscPress);

		return () => {
			window.removeEventListener('click', handleClickOutside);
			window.removeEventListener('keydown', handleEscPress);
		};
	});
</script>

<div>
	<button on:click={handleClick} bind:this={buttonEl}>
		{text}
		<DropdownArrow {active} />
	</button>

	{#if active}
		<div class="backdrop" bind:this={backdropEl}>
			<Container class="wrapper">
				<div class={item_refs && featured_post ? 'col-2' : ''}>
					{#if featured_post && item_refs}
						<div>
							<p class="label">FEATURED CONTENT</p>
							<FeaturedBlog {...featured_post} />
						</div>
					{/if}
					<div class="flex justify-around">
						{#each linkLists as { heading, links }}
							<div>
								<p class="label">{heading}</p>
								<div class="space-y-2 mt-4">
									{#each links as link}
										{@const { text, url } = link}
										<a href={url} class="block">{text}</a>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</Container>
		</div>
	{/if}
</div>

<style lang="postcss">
	.backdrop {
		@apply absolute top-full bg-card w-screen left-1/2 transform -translate-x-1/2 border-t border-b border-divider shadow-default;
	}

	.wrapper {
		@apply py-12;
	}

	.col-2 {
		@apply py-0;
		@apply flex divide-x divide-divider;
		& > * {
			@apply py-12;
			flex: 0 0 50%;

			&:first-child {
				@apply pr-10;
			}
		}
	}

	.label {
		@apply uppercase font-semibold text-sub text-sm;
	}

	.svg-parent {
		@apply h-5 w-5;
	}

	button {
		@apply flex items-center w-full;

		&:hover,
		&:focus {
			@apply text-important;

			svg {
				path {
					fill: var(--important);
				}
			}
		}
	}
</style>
