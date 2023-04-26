<script lang="ts">
	export let header: any;
	export let tbodyClassName: string = '';
</script>

<div>
	<table>
		<thead>
			<tr>{@html header}</tr>
		</thead>
		<tbody class={tbodyClassName}>
			<slot />
		</tbody>
	</table>
</div>

<style lang="postcss">
	div {
		table {
			@apply bg-card w-[380px] overflow-hidden;
			box-shadow: 0 2px 10px 5px rgba(255, 255, 255, 0.04);
			table-layout: fixed;

			@media (max-width: 440px) {
				@apply w-[370px];
			}

			@media (max-width: 410px) {
				width: 320px;
			}

			@media (max-width: 355px) {
				width: 280px;
			}
		}

		table,
		td,
		th {
			@apply border border-divider;
		}

		th {
			@apply font-normal;
		}

		th,
		:global(td) {
			@apply px-6 py-1 text-sm text-center;

			@media (max-width: 440px) {
				@apply text-xs;
			}
		}

		tr > :first-child:not(th) {
			@apply text-body;
		}
	}
</style>
