<script lang="ts">
	import { getJobs } from '$lib/utils/content';
	import SectionBase from '../components/layout/section/base.svelte';
	import Heading from './ui/heading.svelte';

	let promise = getJobs();
	export let heading: string;
	export let text: string;
</script>

<SectionBase class="max-w-sm md:max-w-4xl mx-auto" id="jobs">
	<Heading type="h2" class="h2 mb-4" text={heading} />
	<p class="mb-12 text-xl max-w-2xl">{text}</p>
	{#await promise}
		<p>Loading...</p>
	{:then data}
		{@const keys = Object.keys(data)}
		<div class="container">
			{#each keys as key}
				{@const titles = Object.keys(data[key])}
				{@const jobsRaw = Object.values(data[key])}
				{@const jobs = jobsRaw.flat()}
				<div>
					<Heading type="h3" class="h3 mb-4" text={key} />
					<div class="space-y-4">
						{#each jobs as { loc, url }, i}
							<p>
								<a href={url}>{titles[i]}</a> [{loc}]
							</p>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/await}
</SectionBase>

<style lang="postcss">
	.container {
		@apply flex flex-wrap justify-between gap-20;

		& > * {
			@media (min-width: 1080px) {
				flex: 0 0 45%;
			}
		}
	}
</style>
