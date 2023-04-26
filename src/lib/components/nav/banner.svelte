<script lang="ts">
	export let banner;
	const { text, shortText, linkUrl, linkText } = banner;
	import { slide } from 'svelte/transition';
	export let isShown: boolean;
</script>

{#if isShown}
	<div
		class="relative bg-card-light border-b border-solid border-divider text-sub"
		data-sb-field-path="content/data/config.json:banner"
		in:slide={{ duration: 500 }}
		out:slide={{ duration: 300 }}
	>
		<div class="sm:text-center sm:px-16">
			<p class="flex items-center justify-center py-2.5 text-base">
				{#if text}
					<span class={`${shortText ? 'hidden md:' : ''}inline overflow-ellipsis`}>
						{text}
					</span>
				{/if}
				{#if shortText}
					<span class="inline md:hidden overflow-ellipsis">
						{shortText}
					</span>
				{/if}
				&nbsp;{' '}
				{#if linkUrl && linkText}
					<a href={linkUrl} class="ml-1">
						<span class="hidden md:inline">
							{linkText}
						</span>
						<span class="inline md:hidden"> More </span>
					</a>
				{/if}
				.
			</p>
		</div>
	</div>
{/if}
