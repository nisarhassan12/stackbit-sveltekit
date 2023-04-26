<script lang="ts">
	export let size: 'small' | 'medium' | 'large' | '' = '';
	let clazz: string = '';
	export { clazz as class };
	export let variant: 'gradient' | '' = '';
</script>

<p
	class="text-{size} {clazz} {variant === 'gradient'
		? 'gradient-text uppercase font-semibold'
		: ''} gradient-list-container"
>
	<slot />
</p>
