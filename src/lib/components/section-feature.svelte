<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import Base from '$lib/components/layout/section/base.svelte';
	import type { FeatureProps } from '$lib/types/feature.type';
	import Feature from './ui/features/index.svelte';

	export let feature: FeatureProps;
</script>

<Base variant={'tight'}>
	<Container>
		<Feature {feature} />
	</Container>
</Base>
