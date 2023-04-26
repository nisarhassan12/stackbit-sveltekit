<script lang="ts">
	import '../app.postcss';
	import Container from '../lib/components/container.svelte';
	import Nav from '$lib/components/nav/index.svelte';

	import { fade } from 'svelte/transition';
	import Search from '$lib/components/search.svelte';
	import { invalidate } from '$app/navigation';
	import Post from '$lib/components/layouts/post.svelte';
	import { isBackgroundWhite, renderPostLayout } from '$lib/utils';
	import Footer from '$lib/components/layout/footer.svelte';
	import Seo from '$lib/components/layout/seo.svelte';

	export let data: any;
	const { config } = data;
	const { navigation, banner, footer } = config;
	$: metadata = data.metadata;

	const onContentChange = () => {
		invalidate(`${data.currentRoute}.json`);
		console.log('Content update - invalidating current page');
	};
</script>

<svelte:window on:stackbitObjectsChanged|preventDefault={onContentChange} />

<Seo {metadata} />

<div class="h-screen flex flex-col">
	<Nav {navigation} {banner} route={data.currentRoute} featured_post={data.featured_post} />
	<div class:bg-[#f4f4f4]={isBackgroundWhite(data.currentRoute)}>
		<Container class="mt-[128px]">
			{#key data.currentRoute}
				<main in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
					{#if renderPostLayout(data.currentRoute)}
						<Post route={data.currentRoute} {metadata}>
							<slot />
						</Post>
					{:else}
						<slot />
					{/if}
				</main>
			{/key}
		</Container>
	</div>

	<Footer {footer} />
</div>

<Search />
