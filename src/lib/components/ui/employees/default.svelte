<script lang="ts">
	export let people: any;
</script>

<div class="space-y-8 sm:space-y-12">
	<ul
		class="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6"
	>
		{#if people}
			{#each people as person}
				<li data-sb-object-id={person.id}>
					<div class="space-y-4">
						<img
							class="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24"
							src={person.image}
							alt={person.name}
							data-sb-field-path=".image"
						/>
						<div class="space-y-2">
							<div class="text-xs font-medium lg:text-sm">
								<h3 data-sb-field-path=".name">{person.name}</h3>
								<p class="text-orchid uppercase" data-sb-field-path=".role">
									{person.role}
								</p>
							</div>
						</div>
					</div>
				</li>
			{/each}
		{/if}
	</ul>
</div>
