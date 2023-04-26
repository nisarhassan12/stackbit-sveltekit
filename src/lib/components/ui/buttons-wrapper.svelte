<script lang="ts">
	let className = '';
	export { className as class };
</script>

<div class={`flex flex-wrap gap-5 md:gap-6 ${className}`}>
	<slot />
</div>
