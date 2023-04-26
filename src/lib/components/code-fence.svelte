<script lang="ts">
	import HeadingLinkIcon from './svgs/heading-link.svelte';
	export let lang: string = '';
	export let code: string | null = null;
	export let title: string | null = null;
	export let rawCode: string | null = null;
	let className = 'my-8 rounded-xl shadow';
	export { className as class };
	export let hideTopBar: boolean = false;

	let copiedSuccessfully = false;

	const displayLanguageMap: any = {
		yaml: 'yml',
		shell: 'bash'
	};

	const mapDisplayLanguage = (str: string) => {
		return displayLanguageMap[str.toLowerCase()] || str;
	};

	let copyCode = async () => {
		try {
			const copiedCode = rawCode;
			await navigator.clipboard.writeText(copiedCode as string);
		} catch (e) {}
		copiedSuccessfully = true;
	};

	$: if (copiedSuccessfully) {
		setTimeout(() => {
			copiedSuccessfully = false;
		}, 1000);
	}

	$: tag = title ?? mapDisplayLanguage(lang);
</script>

<div class="code-fence overflow-y-auto {className}">
	{#if !hideTopBar}
		<div class="sticky top-0 left-0 z-10 py-1 flex items-center">
			{#if tag}
				{#if title}
					<span class="ml-4">{tag}</span>
				{:else}
					<div class="ml-4 flex items-center">
						<span class="text-lg">{tag}</span>
					</div>
				{/if}
			{/if}
			<div class="flex-1" />
			<button
				on:click={copyCode}
				class="mr-4 group px-2 py-1 transition-all duration-200 delay-[50] text-[12px] dark:stroke-[#999795] dark:hover:stroke-divider-light hover:stroke-black stroke-[#565252]"
				><div
					class={copiedSuccessfully
						? 'hidden opacity-0'
						: 'opacity-100 flex items-center gap-1 underline group-hover:text-black underline-offset-[0.25em] dark:group-hover:text-important group-hover:decoration-transparent transition-all duration-200 delay-[50]'}
				>
					<HeadingLinkIcon /><span>copy code</span>
				</div>
				<div
					class="transition-opacity z-10 duration-300 rounded-md ease-out
		  {copiedSuccessfully ? 'opacity-100' : 'hidden opacity-0'}"
					aria-hidden="true"
				>
					copied successfully
				</div></button
			>
		</div>
	{/if}
	<div>
		<pre class="language-{lang} !m-0 !rounded-none"><code class="language-{lang}">{@html code}</code
			></pre>
	</div>
</div>
