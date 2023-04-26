<script lang="ts">
	import GradientStroke from './ui/gradient-stroke.svelte';

	export let attribution: string;
	export let text: string;
</script>

<GradientStroke class="lg:-mx-20 my-14 relative rounded-lg text-important not-prose shadow-default">
	<div class="p-8 rounded-lg">
		<span
			class="absolute z-10 top-2 lg:top-auto left-4 text-transparent text-5xl lg:text-8xl bg-clip-text bg-gradient-to-r from-mz-lavender to-mz-orchid font-mono font-semibold"
		>
			&#8220;
		</span>
		<div class="max-w-xl mx-auto">
			{text}
			<div class="mt-4">&mdash; {attribution}</div>
		</div>
	</div>
</GradientStroke>
