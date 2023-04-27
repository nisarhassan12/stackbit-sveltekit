<script lang="ts">
	export let heading: string;
	export let text: string = '';
	export let list: string[] | null = null;
	export let image: string;
	export let imageClassNames: string = '';
	export let alt: string;
</script>

<header class="flex items-center justify-between mx-auto pb-16 pt-10 gap-8 xl:gap-0">
	<div class="max-w-[545px] gradient-list-container">
		<h1>{heading}</h1>
		<p>
			{#if text}
				{@html text}
			{/if}
		</p>

		{#if list}
			<ul class="text-xl">
				{#each list as item}
					<li>{@html item}</li>
				{/each}
			</ul>
		{/if}
	</div>
	{#if image}
		<div class="illustration max-w-xl hidden md:block">
			<img src={image} {alt} class="w-full max-h-[400px] {imageClassNames}" />
		</div>
	{/if}
</header>
