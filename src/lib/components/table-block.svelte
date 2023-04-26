<script lang="ts">
	import { getIcon } from '$lib/utils';
	import Button from './ui/button.svelte';

	const datasets: any = {
		cluster_replicas: [
			{
				id: 0,
				name: '3XS',
				price: '0.25',
				isAvailableInFreeTrial: true
			},
			{
				id: 1,
				name: '2XS',
				price: '0.5',
				isAvailableInFreeTrial: true
			},
			{
				id: 1,
				name: 'XS',
				price: '1',
				isAvailableInFreeTrial: true
			},
			{
				id: 2,
				name: 'S',
				price: '2',
				isAvailableInFreeTrial: true
			},
			{
				id: 3,
				name: 'M',
				price: '4',
				isAvailableInFreeTrial: true
			},
			{
				id: 4,
				name: 'L',
				price: '8',
				isAvailableInFreeTrial: true
			},
			{
				id: 5,
				name: 'XL',
				price: '16',
				isAvailableInFreeTrial: false
			},
			{
				id: 6,
				name: '2XL',
				price: '32',
				isAvailableInFreeTrial: false
			},
			{
				id: 7,
				name: '3XL',
				price: '64',
				isAvailableInFreeTrial: false
			},
			{
				id: 8,
				name: '4XL',
				price: '128',
				isAvailableInFreeTrial: false
			},
			{
				id: 9,
				name: '5XL',
				price: '256',
				isAvailableInFreeTrial: false
			},
			{
				id: 10,
				name: '6XL',
				price: '512',
				isAvailableInFreeTrial: false
			}
		],
		sources_sinks: [
			{
				id: 1,
				name: '3xsmall',
				price: '0.0267',
				isAvailableInFreeTrial: true
			},
			{
				id: 2,
				name: '2xsmall',
				price: '0.0533',
				isAvailableInFreeTrial: true
			},
			{
				id: 3,
				name: 'xsmall',
				price: '0.1067',
				isAvailableInFreeTrial: true
			},
			{
				id: 4,
				name: 'small',
				price: '0.2133',
				isAvailableInFreeTrial: true
			},
			{
				id: 5,
				name: 'medium',
				price: '0.4267',
				isAvailableInFreeTrial: true
			},
			{
				id: 6,
				name: 'large',
				price: '0.8533',
				isAvailableInFreeTrial: true
			}
		]
	};
	export let dataset: string;
</script>

{#if dataset === 'general'}
	<div class="px-4 sm:px-6 lg:px-8">
		<div
			class="-mx-4 mt-10 ring-1 ring-divider-light sm:-mx-6 md:mx-0 md:rounded-lg bg-card shadow-default"
		>
			<table class="min-w-full divide-y divide-divider-light">
				<thead>
					<tr>
						<th scope="col" class="py-3.5 pl-4 pr-3 text-center text-sm font-semibold sm:pl-6" />
						<th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold "> On Demand </th>
						<th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold "> Capacity </th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="relative py-4 pl-4 sm:pl-6 pr-3 text-sm">
							<div class="font-medium">Compute Credits</div>
						</td>
						<td class="px-3 py-3.5 text-sm">
							<span class="italic">Register to view.</span>
						</td>
						<td class="px-3 py-3.5 text-sm ">Volume-Based Discounts</td>
					</tr>
					<tr class="border-t border-divider">
						<td class="relative py-4 pl-4 sm:pl-6 pr-3 text-sm">
							<div class="font-medium">Storage (GB/Month)</div>
						</td>
						<td class="px-3 py-3.5 text-sm ">
							<span class="italic">Register to view.</span>
						</td>
						<td class="px-3 py-3.5 text-sm ">
							<span class="italic">Register to view.</span>
						</td>
					</tr>
					<tr class="border-t border-divider">
						<td class="relative py-4 pl-4 sm:pl-6 pr-3 text-sm">
							<div class="font-medium">Network Egress (GB)</div>
						</td>
						<td class="px-3 py-3.5 text-sm ">Register to view</td>
						<td class="px-3 py-3.5 text-sm ">Register to view</td>
					</tr>
					<tr class="border-t border-divider">
						<td class="relative py-4 pl-4 sm:pl-6 pr-3 text-sm" />
						<td class="px-3 py-3.5 text-sm ">
							<Button button={{ url: '/register', label: 'Get $500 to Start' }} />
						</td>
						<td class="px-3 py-3.5 text-sm ">
							<Button button={{ url: '/contact', label: 'Contact Us', variant: 'ghost' }} />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
{:else}
	<div class="px-4 sm:px-6 lg:px-8">
		<div
			class="-mx-4 mt-10 ring-1 ring-divider-light sm:-mx-6 md:mx-0 md:rounded-lg bg-card shadow-default"
		>
			<table class="min-w-full divide-y divide-divider-light">
				<thead>
					<tr>
						<th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">
							Size
						</th>
						{#if dataset !== 'sources_sinks'}
							<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">
								<span class="hidden lg:table-cell">Compute Credits/Hour</span>
								<span class="table-cell lg:hidden">Credits/hr</span>
							</th>
						{/if}

						<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">
							<span class="hidden lg:table-cell">Available in Free Trial?</span>
							<span class="table-cell lg:hidden">In Free Trial?</span>
						</th>
					</tr>
				</thead>
				<tbody class="text-center">
					{#each datasets[dataset] as plan, planIdx}
						<tr>
							<td
								class="{planIdx === 0
									? ''
									: 'border-t border-transparent'} relative py-4 pl-4 sm:pl-4 pr-3 text-sm"
							>
								<div class="font-medium">{plan.name}</div>
								{#if planIdx !== 0}
									<div class="absolute right-0 left-0 -top-px h-px bg-default-content/20" />
								{/if}
							</td>
							{#if dataset !== 'sources_sinks'}
								<td class="{planIdx === 0 ? '' : 'border-t border-divider'} 'px-3 py-3.5 text-sm"
									>{plan.price}</td
								>
							{/if}
							<td
								class="{planIdx === 0
									? ''
									: 'border-t border-divider'} relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium"
							>
								{#if plan.isAvailableInFreeTrial}
									<div class="flex justify-center items-center">
										<svelte:component
											this={getIcon('CheckmarkOutline')}
											class="ml-1 text-mz-green w-6 h-6"
										/>
									</div>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/if}
