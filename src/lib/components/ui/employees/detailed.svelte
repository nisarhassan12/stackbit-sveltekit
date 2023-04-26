<script lang="ts">
	export let people: any;
</script>

<div class="space-y-12 text-left">
	<ul class="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-20 lg:gap-y-16 lg:space-y-0">
		{#if people}
			{#each people as person}
				<li data-sb-object-id={person.id}>
					<div class="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-0">
						<div class="h-40 w-32 relative">
							<div class="absolute w-full bottom-0 bg-default-focus rounded-full aspect-square" />
							<img
								class="relative h-full object-cover rounded-full"
								src={person.image}
								alt={person.name}
								data-sb-field-path=".image"
							/>
						</div>
						<div class="sm:col-span-2">
							<div class="text-left space-y-4">
								<div class="text-lg leading-6 font-medium space-y-1">
									<h3 data-sb-field-path=".name">{person.name}</h3>
									<p class="text-orchid uppercase" data-sb-field-path=".role">
										{person.role}
									</p>
								</div>
								<div class="text-lg">
									<p data-sb-field-path=".bio">{person.bio}</p>
								</div>
							</div>
						</div>
					</div>
				</li>
			{/each}
		{/if}
	</ul>
</div>
