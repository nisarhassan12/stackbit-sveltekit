<script lang="ts">
	let className = '';
	export { className as class };
</script>

<div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 {className}">
	<slot />
</div>
