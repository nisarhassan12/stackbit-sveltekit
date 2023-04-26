<script lang="ts">
	import { onMount } from 'svelte';
	import Table from './table.svelte';
	export let isTerminalReady: boolean;

	const data = [
		{
			minute: '13:08',
			order_ct: 143,
			revenue: 12441
		},
		{
			minute: '13:09',
			order_ct: 132,
			revenue: 11076
		},
		{
			minute: '13:10',
			order_ct: 148,
			revenue: 12761
		},
		{
			minute: '13:11',
			order_ct: 148,
			revenue: 12390
		},
		{
			minute: '13:12',
			order_ct: 158,
			revenue: 13533
		},
		{
			minute: '13:13',
			order_ct: 150,
			revenue: 12908
		},
		{
			minute: '13:14',
			order_ct: 164,
			revenue: 13975
		},
		{
			minute: '13:15',
			order_ct: 167,
			revenue: 14698
		}
	];

	const generateRowMarkup = ({ minute, order_ct, revenue }: any, className = '') => `
		<tr class="animated-row ${className}">
			<td>${minute}</td>
			<td>${order_ct}</td>
			<td>$${revenue}</td>
		</tr>
	`;

	const timeouts: any = [];

	const renderAnimatedRows = () => {
		const tbody = document.querySelector('.add-remove-body') as HTMLElement;
		data.forEach((row, i) => {
			if (i < 4) {
				const rowToAdd = generateRowMarkup(row);

				tbody.insertAdjacentHTML('beforeend', rowToAdd);
			}
		});
	};

	const rotate = () => {
		let tbody = document.querySelector('.add-remove-body') as HTMLElement;
		data.push(data.shift());
		tbody.children[0].classList.add('hide');
		timeouts.push(
			setTimeout(() => {
				tbody.children[0].remove();
				tbody.insertAdjacentHTML('beforeend', generateRowMarkup(data[4], 'animated-row'));
				tbody = document.querySelector('.add-remove-body') as HTMLElement;
				timeouts.push(
					setTimeout(() => {
						tbody.children[3].classList.add('shown');
					}, 600)
				);
				timeouts.push(
					setTimeout(() => {
						rotate();
					}, 600)
				);
			}, 600)
		);
	};

	$: if (isTerminalReady) {
		const rows = document.querySelectorAll('.animated-row');
		let interval = 0;
		rows.forEach((row, i) => {
			timeouts.push(
				setTimeout(() => {
					row.classList.add('shown');
					if (i === 3) {
						rotate();
					}
				}, interval)
			);
			interval = interval + 900;
		});
	}

	onMount(() => {
		const tbody = document.querySelector('.add-remove-body') as HTMLElement;
		tbody.innerHTML = '';
		renderAnimatedRows();

		return () => {
			console.log('');
			timeouts.forEach((timeout: any) => clearTimeout(timeout));
			tbody.innerHTML = '';
		};
	});
</script>

<div class={isTerminalReady ? 'active' : ''}>
	<Table
		header={`<th>minute</th>
            <th>order_ct</th>
            <th>revenue</th>`}
		tbodyClassName="add-remove-body"
	/>
</div>
