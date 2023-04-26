<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import Heading from '$lib/components/ui/heading.svelte';
	import Text from '$lib/components/ui/text.svelte';
	import type { Thing } from './things';

	export let things: Thing[];
	export let activeThing: any;
	export let setActive: (text: string) => void;

	function handleActiveChange(e: Event, heading: any) {
		e.preventDefault();
		const detailsElements = document.querySelectorAll('.switcher-details');
		detailsElements.forEach((element) => {
			element.removeAttribute('open');
			element.classList.remove('open');
		});
		(e.currentTarget as HTMLDetailsElement).classList.add('open');
		(e.currentTarget as HTMLDetailsElement).open = true;
		setActive(heading);
	}
</script>

<div>
	{#each things as { heading, text, link }}
		<div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<details
				on:click={(e) => handleActiveChange(e, heading)}
				class={`switcher-details ${heading === activeThing.heading ? 'open' : ''}`}
				open={heading === activeThing.heading}
			>
				<summary>
					<Heading type="h3" class="h4" text={heading} />
					{#if !(heading === activeThing.heading)}
						<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
							<title>Chevron Down</title>
							<path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="32"
								d="M112 184l144 144 144-144"
							/>
						</svg>
					{/if}
				</summary>
				<Text size="small" class="mt-2 mb-5">
					{text}
				</Text>

				<Button
					button={{ ...link, variant: 'ghost' }}
					on:click={() => {
						if (!link.url.startsWith('/')) {
							window.location.assign(link.url);
						}
					}}
				/>
			</details>
		</div>
	{/each}
</div>

<style lang="postcss">
	div {
		@apply flex flex-col justify-center gap-4 xl:gap-6;

		details {
			@apply p-5 w-[500px] border border-transparent transition-all duration-500 cursor-pointer;

			@media (max-width: 1440px) {
				@apply w-[450px];
			}

			@media (max-width: 1325px) {
				@apply w-[420px];
			}

			> summary {
				@apply flex justify-between items-center list-none;

				svg {
					@apply w-6;
				}
			}

			> summary::marker, /* Latest Chrome, Edge, Firefox */ 
      > summary::-webkit-details-marker /* Safari */ {
				@apply hidden;
			}

			&.open,
			&:hover,
			&:focus {
				@apply bg-card border-divider shadow-default rounded-lg;
			}
		}
	}
</style>
