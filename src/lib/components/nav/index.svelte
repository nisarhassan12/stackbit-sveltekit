<script lang="ts">
	import { isBackgroundWhite, removeTrailingSlash } from '$lib/utils';
	import Container from '../container.svelte';
	import { page } from '$app/stores';
	import Dropdown from './dropdown.svelte';
	import Banner from './banner.svelte';
	import Toggle from './toggle.svelte';
	import MobileDropdown from './mobile-dropdown.svelte';
	import Button from '../ui/button.svelte';
	import LogoWithDialog from './logo-with-dialog.svelte';

	export let navigation;
	export let banner: any;
	export let route: string;
	export let featured_post: string;
	let scroll: number;

	let isOpen: boolean = false;

	const clickHandler = () => {
		isOpen = !isOpen;
	};

	const { links, access, signin, theme = 'dark' } = navigation;

	const pageSlug = $page.url.pathname;
</script>

<svelte:window bind:scrollY={scroll} />

<nav class:scrolled-out={scroll} class:nav-bg={!isBackgroundWhite(route)} class={theme}>
	{#if banner}
		<Banner {banner} isShown={scroll === 0} />
	{/if}
	<Container class="flex justify-between wrapper">
		<LogoWithDialog
			clickHandler={() => {
				isOpen = false;
			}}
		/>

		<ul class="links desktop">
			{#each links as link}
				{@const { type, text, url, linkLists, item_refs } = link}
				<li>
					{#if type === 'Link'}
						<a href={url} class={removeTrailingSlash(url) === pageSlug ? 'active' : ''}>{text}</a>
					{:else}
						<Dropdown {text} {linkLists} {featured_post} {item_refs} />
					{/if}
				</li>
			{/each}
		</ul>

		<ul class="links desktop">
			<li><a href={signin.url}>{signin.label}</a></li>
			<Button button={access} />
		</ul>

		<Toggle {isOpen} onClick={clickHandler} class="mobile" />
	</Container>

	{#if isOpen}
		<div class="mobile mobile-links">
			<Container class="w-full">
				<ul class="flex flex-col">
					{#each links as link}
						{@const { type, text, url, linkLists, item_refs } = link}
						{#if type === 'Link'}
							<li>
								<a
									href={url}
									class={removeTrailingSlash(url) === pageSlug ? 'active' : ''}
									on:click={clickHandler}
								>
									{text}
								</a>
							</li>
						{:else}
							<li><MobileDropdown {text} {linkLists} {item_refs} {clickHandler} /></li>
						{/if}
					{/each}
					<li><a href={signin.url}>{signin.label}</a></li>
					<li>
						<Button button={access} on:click={clickHandler} />
					</li>
				</ul>
			</Container>
		</div>
	{/if}
</nav>

<style lang="postcss">
	nav {
		@apply fixed w-full top-0 bg-bg border-b border-solid border-transparent transition-all duration-200 z-[1000];

		&.scrolled-out.dark {
			@apply border-divider;
			backdrop-filter: saturate(0.5) blur(5px);
		}

		&.nav-bg {
			@apply bg-bg-nav;
		}

		:global(a),
		:global(button) {
			@apply text-base;
		}

		:global(a) {
			@apply no-underline;

			&:hover,
			&:focus {
				@apply text-important;
			}
		}
	}

	:global(.wrapper) {
		@apply py-5;
		@media (max-width: 900px) {
			@apply py-1.5;
		}
	}

	.mobile-links {
		@apply border-t border-solid border-divider pt-4 pb-10 overflow-y-auto overflow-x-hidden bg-card;
		height: calc(100vh - 60px);

		ul {
			@apply flex flex-col mx-0 divide-y divide-divider w-full;

			& > * {
				@apply py-2.5;
			}
		}
	}

	ul.desktop {
		@apply flex gap-10 items-center;

		@media (max-width: 900px) {
			@apply hidden;
		}
	}

	:global(.mobile) {
		@apply hidden;
		@media (max-width: 900px) {
			@apply flex;
		}
	}
</style>
