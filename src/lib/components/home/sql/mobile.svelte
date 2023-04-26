<script lang="ts">
	import MobileThing from './mobile-thing.svelte';
	import { things } from './things';
</script>

<div class="parent-mobile">
	{#each things as thing}
		<MobileThing {thing} />
	{/each}
</div>

<style lang="postcss">
	.parent-mobile {
		@apply hidden mb-32 mt-16;
		/* while changing this make sure to change the conditional in the integrated terminal file which references 1185px */
		@media (max-width: 1185px) {
			@apply flex flex-col gap-72;
		}
	}
</style>
