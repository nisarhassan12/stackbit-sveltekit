<script lang="ts">
	import Base from './layout/section/base.svelte';
	import BaseCard from '../components/ui/card/base.svelte';
	import Heading from './ui/heading.svelte';
	import Text from './ui/text.svelte';

	export let heading: string;
	export let text: string;
	export let logos = [
		{
			name: 'Sproutfi',
			image: '/images/logos/sproutfi.svg'
		},
		{
			name: 'Drizly',
			image: '/images/logos/drizly.svg'
		},
		{
			name: 'Kepler-Chevreaux',
			image: '/images/logos/kepler.svg'
		},
		{
			name: 'Datalot',
			image: '/images/logos/datalot.svg'
		},
		{
			name: 'Density',
			image: '/images/logos/density.svg'
		},
		{
			name: 'Unimarket',
			image: '/images/logos/unimarket.svg'
		}
	];
</script>

<Base variant="tight">
	<BaseCard size="md">
		<Heading
			type="h2"
			class="h4 text-center mb-12 max-w-[260px] sm:max-w-none mx-auto"
			text={heading}
		/>
		<div
			class="flex flex-wrap px-6 sm:px-0 gap-y-12 gap-x-16 xl:gap-24 justify-center items-center opacity-60 invert-on-light"
		>
			{#each logos as logo}
				{@const { name, image } = logo}
				<img class="max-h-16" title={name} alt={name} src={image} width={110} height={64} />
			{/each}
		</div>
		<Text class="text-center mt-10" size="medium">
			{@html text}
		</Text>
	</BaseCard>
</Base>
