<script lang="ts">
	export let path: string;
	export let image: string;
	export let title: string;
	export let description: string;
</script>

<a href={path}>
	<div class="card rounded-2xl p-6">
		<img src={image} alt={title} />
		<div>
			<p class="text-sub font-semibold">{title}</p>
			<p class="text-sm mt-2">{description}</p>
		</div>
	</div>
</a>

<style lang="postcss">
	a {
		@apply cursor-pointer;

		&:hover,
		&:focus {
			.card {
				@apply !bg-card text-important;

				p {
					@apply text-important;
				}
			}
		}

		.card,
		p {
			@apply transition-all duration-200 delay-[50ms];
		}

		.card {
			@apply flex items-center mt-4 gap-6 bg-bg !max-w-full !py-6;
		}

		img {
			@apply w-32 h-20 object-cover rounded-md;
		}
	}
</style>
