<script lang="ts">
	import { onMount } from 'svelte';
	import Table from './table.svelte';

	export let isTerminalReady: boolean;
	let interval: any;
	let timeouts: any = [];

	const data = [
		{
			userID: 'VPLaKV',
			count: 400,
			pageViews: 20
		},
		{
			userID: 'MN37Mt',
			count: 60,
			pageViews: 9
		},
		{
			userID: '1fT4KY',
			count: 72,
			pageViews: 42
		},
		{
			userID: 'sT4QY',
			count: 10,
			pageViews: 342
		}
	];

	const getRandom = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	$: if (isTerminalReady) {
		const counts = Array.from(document.querySelectorAll('.animated-numbers-tbody .count'));
		const allViews = Array.from(document.querySelectorAll('.animated-numbers-tbody .view'));
		// 1185 is bound to the media queries in sql/index.tsx and sql/mobile.tsx
		const targets =
			window.innerWidth <= 1185
				? [...counts.slice(4, 8), ...allViews.slice(4, 8)]
				: [...counts.slice(0, 4), ...allViews.slice(0, 4)];
		const animate = () => {
			const randomTargetIndex = getRandom(0, targets.length - 1);
			const randomIncrement = getRandom(1, 5);
			targets.forEach((target) => target.classList.remove('update'));
			targets[randomTargetIndex].classList.add('update');
			timeouts.push(
				setTimeout(() => {
					targets[randomTargetIndex].textContent = `${
						parseInt(targets[randomTargetIndex].textContent, 10) + randomIncrement
					}`;
				}, 500)
			);
		};

		timeouts.push(
			setTimeout(() => {
				animate();
			})
		);

		interval = setInterval(() => {
			animate();
		}, 1000);
	}

	onMount(() => {
		return () => {
			clearInterval(interval);
			timeouts.forEach((timeout: any) => clearTimeout(timeout));
		};
	});
</script>

<div class={isTerminalReady ? 'active' : ''}>
	<Table
		header={`
        <th>userID</th>
        <th>api_calls</th>
        <th>pageviews</th>
      `}
		tbodyClassName="animated-numbers-tbody"
	>
		{#each data as entry}
			<tr>
				<td>{entry.userID}</td>
				<td class="count">{entry.count}</td>
				<td class="view">{entry.pageViews}</td>
			</tr>
		{/each}
	</Table>
</div>

<style lang="postcss">
	div {
		td {
			transition: all 1s cubic-bezier(0.215, 0.61, 0.355, 1);
		}

		:global(.update) {
			@apply font-bold bg-gray-200;
			transition: all 0.1s;
		}
	}

	:global(body.dark) {
		div {
			:global(.update) {
				@apply bg-gray-700;
			}
		}
	}
</style>
