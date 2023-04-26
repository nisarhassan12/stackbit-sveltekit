<script lang="ts">
	export let text: string;
	export let breakLines: boolean;

	const gradientFormat = /\{+(.*?)\}+/;

	const extractGradientText = (str: string) => {
		return gradientFormat.exec(str) && gradientFormat.exec(str)[1];
	};
</script>

{text.substr(0, text.indexOf('{'))}
{#if text.indexOf('{{') > -1}
	<br />
{/if}

<span class="gradient-text {breakLines ? 'inline-block py-2 -my-2' : ''}">
	{extractGradientText(text)}
</span>
{#if text.indexOf('}}') > -1}
	<br />
{/if}

{text.substr(text.lastIndexOf('}') + 1)}
