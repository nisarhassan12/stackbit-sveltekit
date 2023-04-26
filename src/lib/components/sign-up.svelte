<script lang="ts">
	import type { ButtonProps } from '$lib/types/button.type';
	import Container from './container.svelte';
	import Base from './layout/section/base.svelte';
	import Button from './ui/button.svelte';
	import ButtonsWrapper from './ui/buttons-wrapper.svelte';
	import Heading from './ui/heading.svelte';
	import Text from './ui/text.svelte';

	export let heading: string = 'Sign Up for {Access}';
	export let text: string =
		'Ready to see if Materialize works for your use case? Register for access today!';
	export let buttons: ButtonProps[] = [
		{
			label: 'Get Access',
			url: '/register',
			variant: 'cta'
		},
		{
			label: 'Get a Demo',
			url: '/demo',
			variant: 'ghost'
		}
	];
	export let image: string = '';
	export let alt: string = '';
</script>

<Base>
	<Container>
		<div class="text-center max-w-3xl mx-auto">
			<Heading type="h2" class="h2" text={heading} />
			<Text size="medium" class=" mt-8 mb-10">
				{text}
			</Text>
			<ButtonsWrapper class="buttons-wrapper justify-center">
				{#each buttons as button}
					<Button button={{ ...button, size: button.size || 'md' }} />
				{/each}
			</ButtonsWrapper>
		</div>
	</Container>
</Base>
