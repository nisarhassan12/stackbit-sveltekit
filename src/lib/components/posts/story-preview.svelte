<script lang="ts">
	import Button from '../ui/button.svelte';
	import Heading from '../ui/heading.svelte';
	import Text from '../ui/text.svelte';

	export let title: string;
	export let logo: string;
	export let label: string;
	export let excerpt: string;
	export let description: string;
	export let path: string;
	export let squareImage: string;
	export let image: string;
</script>

<div class="card story-preview">
	<div style="background-image: url({squareImage || image})" class="square-image" />
	<div class="text-content">
		{#if logo}
			<img src={logo} alt={label || ''} class="logo invert-on-light" />
		{:else if title}
			<a href={path} class="no-underline">
				<Heading text={title} type="h2" class="h4 mb-4" />
			</a>
		{/if}
		{#if excerpt}
			<Text size="small">{excerpt}</Text>
		{/if}
		{#if description}
			<Text size="small">{description}</Text>
		{/if}
		<div class="mt-auto">
			<Button
				button={{ url: path, label: 'Read Customer Story', variant: 'ghost', class: 'mt-6' }}
			/>
		</div>
	</div>
</div>

<style lang="postcss">
	.story-preview {
		@apply flex flex-col max-w-sm lg:flex-row text-left lg:max-w-6xl rounded-lg mx-auto;

		.square-image {
			@apply lg:w-[280px] bg-cover bg-center rounded-t-lg lg:rounded-tr-none lg:rounded-tl-lg lg:rounded-bl-lg;
			flex: 0 0 280px;
		}

		.text-content {
			@apply flex flex-col h-full px-5 lg:px-10 py-5;
		}

		.logo {
			@apply h-14 max-w-[130px] pb-3 opacity-90;
		}
	}
</style>
