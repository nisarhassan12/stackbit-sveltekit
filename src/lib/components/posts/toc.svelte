<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const headings = document.querySelectorAll('.prose h2');
		const toc = document.querySelector('.toc') as HTMLElement;
		toc.innerHTML = '';

		headings.forEach((heading) => {
			const html = `<li>
				<a href="#${heading.id}">${heading.textContent}</a>
			</li>`;
			toc.insertAdjacentHTML('beforeend', html);
		});

		const tocLinks = document.querySelectorAll('.toc a');
		headings.forEach((heading, i) => {
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						tocLinks.forEach((link) => link.classList.remove('active'));
						tocLinks[i].classList.add('active');
					}
				});
			});

			observer.observe(heading);
		});
	});
</script>

<div class="hidden lg:flex flex-col sticky top-24 shrink-0 w-52 space-y-4">
	<span class="uppercase tracking-wide font-medium text-base">Table of Contents</span>
	<ul class="toc space-y-4" />
</div>

<style lang="postcss">
	.toc :global(a) {
		@apply block no-underline !text-gray-800 pl-3 border-l-2 border-solid border-transparent;
	}

	.toc :global(a.active) {
		@apply !text-orchid border-orchid;
	}
</style>
