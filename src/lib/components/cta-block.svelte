<script lang="ts">
	import Button from './ui/button.svelte';
	import GradientStroke from './ui/gradient-stroke.svelte';
	import Heading from './ui/heading.svelte';

	export const data: {
		heading: string;
		backgroundStyle?: string;
		subheading: string;
		size?: string;
		button: {
			label: string;
			url: string;
		};
	} = {
		heading: 'Get Access',
		subheading: 'Build real-time data products with unbounded scale on Materialize, in the cloud.',
		button: {
			label: 'Get Access',
			url: '/register'
		}
	};

	const { heading, subheading, size, button, backgroundStyle } = data;
</script>

<GradientStroke
	class="flex flex-col space-y-4 my-16 not-prose rounded-lg ${size === 'shrinkToContent'
		? 'h-min w-min'
		: ''}"
>
	<div class="rounded-lg">
		<div class={`p-8 rounded-lg ${backgroundStyle ? backgroundStyle : ''}`}>
			<Heading type="h3" class="!mt-0 !text-3xl !font-medium" text={heading} />
			<p class="!my-4 max-w-lg">{subheading}</p>
			<Button button={{ label: button.label, url: button.url }} />
		</div>
	</div>
</GradientStroke>
