<script lang="ts">
	import HubspotForm from './hubspot-form.svelte';
	import Section from './section.svelte';
	import BaseCard from './ui/card/base.svelte';

	export let formId: string;
	export let heading: string;
	export let text: string;
	export let textClassNames: string;
</script>

<Section
	{heading}
	headingType="h1"
	headingClassNames="h2"
	{text}
	textClassNames="{textClassNames || 'max-w-3xl mx-auto'} mb-10"
	class="max-w-4xl mx-auto"
	variant="tight"
>
	<BaseCard size="lg">
		<div class="hb-container">
			<HubspotForm {formId} />
		</div>
	</BaseCard>
</Section>
