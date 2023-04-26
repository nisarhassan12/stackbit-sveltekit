<script lang="ts">
	export let text: string;
	let className = '';
	export { className as class };
</script>

<span
	class={`relative lg:translate-y-2 inline-block text-body uppercase tracking-wide font-semibold text-base ${
		className ? className : ''
	}`}
>
	{text}
</span>
