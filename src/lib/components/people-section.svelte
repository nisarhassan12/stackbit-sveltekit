<script lang="ts">
	import Heading from './ui/heading.svelte';

	export let data: any;
</script>

<div class="flex flex-wrap gap-20 justify-center">
	{#each data as person}
		{@const { image, name, role, bio } = person}
		<div class="max-w-[300px] text-center ">
			<img src={image} alt={name} class="h-28 w-28 rounded-full mx-auto mb-4" />
			<Heading type="h2" class="h4" text={name} />
			<p class="my-2">{role}</p>
			{#if bio}
				<p class="text-sm">{bio}</p>
			{/if}
		</div>
	{/each}
</div>
