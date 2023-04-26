<script lang="ts">
	import Container from '../container.svelte';
	import BaseCard from '../ui/card/base.svelte';
	import Button from '../ui/button.svelte';
	import Slack from '../svgs/slack.svelte';
	import Linkedin from '../svgs/linkedin.svelte';
	import Twitter from '../svgs/twitter.svelte';
	import Github from '../svgs/github.svelte';

	export let footer;

	const getYear = () => {
		return /\d{4}/.exec(Date())[0];
	};

	/* Group linkLists into groups of two */
	const listPairs = footer.linkLists.reduce((acc, linkList, index) => {
		if (index % 2 == 0) acc.push([linkList]);
		else acc[acc.length - 1].push(linkList);
		return acc;
	}, []);
</script>

<div
	class="text-base relative border-t border-divider bg-card mt-auto"
	aria-labelledby="footer-heading"
>
	<h2 id="footer-heading" class="sr-only">Footer</h2>

	<Container class="mx-auto py-12 lg:py-16 ">
		<div class="top flex items-start">
			<div class="flex gap-10 md:gap-0">
				{#each listPairs as listPair}
					<div class="md:grid md:grid-cols-2 md:gap-12">
						{#each listPair as { heading, links }}
							<div class="mt-12 md:mt-0">
								<h3 class="text-sm font-semibold tracking-wider uppercase text-sub">
									{heading}
								</h3>
								<ul class="mt-6 space-y-4">
									{#each links as link}
										<li>
											<a href={link.url} class="hover:underline">{link.text}</a>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				{/each}
			</div>

			<BaseCard size="sm" class="!bg-bg !py-8">
				<h3 class="text-sm font-semibold tracking-wider uppercase">
					Join the Materialize Community
				</h3>
				<p class="mt-3 mb-6">
					Join hundreds of other Materialize users and connect directly with our engineers.
				</p>
				<Button
					button={{
						url: 'https://materialize.com/s/chat',
						label: 'Join the Community',
						variant: 'ghost'
					}}
				/>
			</BaseCard>
		</div>
		<div class="mt-8 pt-8 gap-8 flex flex-col lg:flex-row items-center  lg:justify-between">
			<!-- <ThemeSwitcher class="lg:order-2" /> -->
			<p class="lg:mt-0 lg:order-1">
				&copy;&nbsp;
				{getYear()}
				&nbsp;Materialize, Inc.{' '}

				<a class="hover:text-mz-blue" href="/site-terms-of-service">Terms of Service</a>
			</p>
			<div class="flex space-x-6 lg:order-3 social-links">
				<a href="https://materialize.com/s/chat">
					<Slack />
				</a>
				<a href="https://www.linkedin.com/company/materializeinc/about/">
					<Linkedin />
				</a>
				<a href="https://twitter.com/materializeinc">
					<Twitter />
				</a>
				<a href="https://github.com/MaterializeInc/materialize">
					<Github />
				</a>
			</div>
		</div>
	</Container>
</div>

<style lang="postcss">
	a {
		@apply no-underline;
	}

	.social-links {
		a {
			@apply w-10 h-10 hover:text-orchid;
		}
	}

	.top {
		@apply items-center md:items-start md:justify-between;

		@media (max-width: 1200px) {
			@apply flex-col-reverse gap-10;
		}
	}
</style>
