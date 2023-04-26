<script lang="ts">
	import { onMount } from 'svelte';
	import './form.postcss';

	export let formId: string;

	onMount(() => {
		const script = document.createElement('script');
		script.src = '//js.hsforms.net/forms/v2.js';

		document.head.appendChild(script);

		script.addEventListener('load', () => {
			// @ts-ignore
			hbspt.forms.create({
				region: 'na1',
				portalId: '23399445',
				formId: formId,
				target: '#form',
				css: ''
			});
		});
	});
</script>

<div id="form" class="hb-container" />
