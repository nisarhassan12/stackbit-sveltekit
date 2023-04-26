<script lang="ts">
	import GradientAvatar from '../gradient-avatar.svelte';

	let className: string = '';
	export let image: string;
	export let name: string;
	export let team: string;
	export let attribution: string;
	export let role: string;
</script>

<div class={`flex items-center space-x-2 lg:space-x-4 ${className ? className : ''}`}>
	{#if image}
		<GradientAvatar src={image} alt={name} />
	{/if}
	<div class="flex flex-col">
		<span class="text-sub">{name || `- ${attribution}`}</span>
		<span class="text-xs block mt-1">
			{team && team != 'External' && (team != 'Leadership' || team != 'Founders') ? team : role}
		</span>
	</div>
</div>
