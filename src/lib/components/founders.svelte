<script lang="ts">
	import { getImagePath } from '$lib/utils';
	import Section from './section.svelte';
	import Button from './ui/button.svelte';
	import BaseCard from './ui/card/base.svelte';
	import Heading from './ui/heading.svelte';
	import Text from './ui/text.svelte';
	import arjun from '../../content/data/people/arjun-narayan.json';
	import frank from '../../content/data/people/frank-mcsherry.json';

	const founders = [
		{ ...arjun, image: '/images/arjun-narayan.png' },
		{ ...frank, image: '/images/frank-mcsherry.png' }
	];
</script>

<Section heading="Founders">
	<div>
		{#each founders as { name, image, role, bio }}
			<BaseCard size="md">
				<div class="img-container">
					<img src={image} alt={name} />
				</div>
				<Heading type="h3" class="h3 mt-10 mb-3" text={name} />
				<Text size="medium" class="text-orchid">
					{role}
				</Text>
				<Text size="medium" class="mt-4 mb-10">
					{bio}
				</Text>
				<Button
					button={{ download: true, variant: 'ghost', url: image, label: 'Download Headshot' }}
				/>
			</BaseCard>
		{/each}
	</div>
</Section>

<style lang="postcss">
	div {
		@apply flex justify-center mt-10 gap-10;

		.img-container {
			@apply h-48 w-48 p-[2px];
			background-image: var(--primary-gradient);

			&,
			img {
				@apply rounded-full;
			}

			img {
				@apply bg-bg;
			}
		}

		& > * {
			flex: 0 0 45%;
		}
	}
</style>
