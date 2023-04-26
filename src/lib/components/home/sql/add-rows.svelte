<script lang="ts">
	import { onMount } from 'svelte';
	import Table from './table.svelte';
	export let isTerminalReady: boolean;

	const data = [
		{
			userID: 'REOtIb',
			email: 'a@gmail.com',
			last_order: '13/12/2022'
		},
		{
			userID: 'Y5KBE8',
			email: 'b@yahoo.com',
			last_order: '9/12/2022'
		},
		{
			userID: 'Wj7JQ0',
			email: 'c@hotmail.com',
			last_order: '13/12/2022'
		},
		{
			userID: 'tPCQ0',
			email: 'd@xyz.com',
			last_order: '13/11/2022'
		}
	];

	const timeouts: any = [];

	$: if (isTerminalReady) {
		const rows = document.querySelectorAll('.add-row.animated-row-alert');
		const ticks = Array.from(document.querySelectorAll('.tick'));
		let interval = 0;
		rows.forEach((row, i) => {
			timeouts.push(
				setTimeout(() => {
					row.classList.add('shown');
					if (i < ticks.length) {
						timeouts.push(
							setTimeout(() => {
								ticks[i].classList.add('shown');
							}, 400)
						);
					}
				}, interval)
			);

			interval = interval + 700;
		});
	}

	onMount(() => {
		return () => {
			timeouts.forEach((timeout) => clearTimeout(timeout));
		};
	});
</script>

<div class="{isTerminalReady ? 'active' : ''} alerting">
	<Table
		header={`
            <th>userID</th>
            <th>email</th>
            <th>last_order</th>
        `}
	>
		{#each data as entry}
			<tr class="add-row animated-row-alert">
				<td>{entry.userID}</td>
				<td class="email">{entry.email}</td>
				<td class="time">{entry.last_order}</td>
			</tr>
		{/each}
	</Table>
	<div class="ticks">
		{#each [...Array(data.length)] as n}
			<div class="tick">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<title>Checkmark</title>
					<path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="64"
						d="M416 128L192 384l-96-96"
					/>
				</svg>
			</div>
		{/each}
	</div>
</div>
