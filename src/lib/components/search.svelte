<script lang="ts">
	import algoliasearch from 'algoliasearch';
	import instantsearch from 'instantsearch.js';
	import { searchBox, hits } from 'instantsearch.js/es/widgets';
	import { onMount } from 'svelte';
	import {
		PUBLIC_ALGOLIA_SEARCH_KEY,
		PUBLIC_ALGOLIA_APPLICATION_ID,
		PUBLIC_ALGOLIA_BLOG_INDEX
	} from '$env/static/public';
	import Modal from './modal.svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		const searchClient = algoliasearch(PUBLIC_ALGOLIA_APPLICATION_ID, PUBLIC_ALGOLIA_SEARCH_KEY);
		const search = instantsearch({
			indexName: PUBLIC_ALGOLIA_BLOG_INDEX,
			searchClient
		});

		search.addWidgets([
			searchBox({
				container: '#searchbox',
				placeholder: 'Search...'
			}),

			hits({
				container: '#hits',
				templates: {
					item: (data) => `
						<a class="py-3 px-10 block no-underline border-y border-transparent hover:bg-bg hover:border-divider" data-href="${data.slug}">
							<p class="font-bold text-important">${data._highlightResult?.title.value}</p>
							<p>${data._highlightResult?.description.value}</p>
						</a>
					`,
					empty: `<p>No results... Please try something else.</p>`
				}
			})
		]);

		search.start();

		const hitsElement = document.querySelector('#hits');
		hitsElement?.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			let slug: string;

			if (target.nodeName !== 'a') {
				slug = `${target.parentElement?.dataset['href']}`;
			} else {
				slug = `${target.dataset['href']}`;
			}

			goto(slug);
			isModalOpen = false;
		});

		window.addEventListener('keydown', (e) => {
			if (e.metaKey && e.key === 'k') {
				isModalOpen = true;
			}
		});
	});

	let isModalOpen: boolean = false;

	$: if (isModalOpen) {
		const input = document.querySelector('.ais-SearchBox-input') as HTMLInputElement;
		setTimeout(() => {
			input.focus();
		}, 100);
	}

	const handleCloseModal = () => {
		isModalOpen = false;
	};
</script>

<Modal isOpen={isModalOpen} on:close={handleCloseModal} buttonClassNames="hidden">
	<div class="search w-[700px] max-w-3xl h-[500px] bg-card rounded overflow-y-auto">
		<div id="searchbox" />

		<div id="hits" />
	</div>
</Modal>

<style lang="postcss">
	.search {
		@apply rounded-t-3xl;

		:global(input) {
			@apply w-full bg-card py-5 px-10 border border-divider-light rounded-t-3xl;
		}

		:global(input) + :global(button) {
			@apply hidden;
		}
	}
</style>
