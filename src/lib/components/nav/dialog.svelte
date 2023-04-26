<script lang="ts">
	import { onMount } from 'svelte';

	let ref: HTMLElement;

	export let closeHandler: () => void;

	const handleClickOutside = (e: MouseEvent) => {
		if (ref && !ref.contains(e.target as Node)) {
			closeHandler();
		}
	};

	onMount(() => {
		window.addEventListener('mousedown', handleClickOutside);

		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	});
</script>

<div
	bind:this={ref}
	class="z-40 text-sm font-light absolute mt-2 bg-black w-40 rounded-md border-dashed border-2 border-gray-600"
	style="width: 161px"
	on:blur={closeHandler}
>
	<!-- <p class="text-gray-500 text-center pt-2">Logo resources</p>
          <button
            type="button"
            class="w-full z-40  inline-flex items-center p-3 text-white shadow-sm hover:bg-mz-purple-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            .svg
            <DownloadIcon class="inline-block absolute right-5 m-auto w-5 h-5"/>
          </button>
          <button
            type="button"
            class="w-full inline-flex items-center p-3 text-white shadow-sm hover:bg-mz-purple-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            .png
            <DownloadIcon class="inline-block absolute right-5 m-auto w-5 h-5"/>
          </button>  -->

	<a
		class="w-full inline-flex items-center p-3 text-white shadow-sm hover:bg-mz-purple-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		href="/brand-guide"
		on:click={closeHandler}
	>
		Download Logos
	</a>
</div>
