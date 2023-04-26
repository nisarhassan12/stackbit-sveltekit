<script lang="ts">
	import Button from '../ui/button.svelte';
	import Eyebrow from '../ui/eyebrow.svelte';
	import List from '../ui/person/list.svelte';

	export let highlight: string;
	export let path: string;
	export let squareImage: string;
	export let logo: string;
	export let label: string;
	export let authors: any;
</script>

<figure class="flex justify-between items-center flex-col-reverse md:flex-row gap-10 mb-40">
	<blockquote class="max-w-2xl">
		<Eyebrow text="Featured Customer Story" />
		<p class="text-3xl text-important my-6">{highlight}</p>

		{#if authors}
			<List {authors} />
		{/if}

		<Button button={{ label: 'Read Customer story', url: `/${path}`, class: 'mt-6' }} />
	</blockquote>
	<div class="relative">
		<img src={squareImage} alt="" class="rounded-lg max-w-lg w-full" />
		<div
			class="flex items-center justify-center rounded-lg card h-auto absolute -bottom-4 md:-bottom-6 right-4 lg:-bottom-20 lg:right-16 p-4 lg:w-36 lg:h-36"
		>
			<img src={logo} alt={label} class="w-full h-full" />
		</div>
	</div>
</figure>

<style lang="postcss">
	blockquote {
		flex: 0 0 60%;
	}
</style>
