<script lang="ts">
	import Heading from './ui/heading.svelte';
	import Text from './ui/text.svelte';
	import Base from './layout/section/base.svelte';
	import Eyebrow from './ui/eyebrow.svelte';
	import type { CardProps } from '$lib/types/card.type';
	import Cards from './ui/card/cards.svelte';
	import type { HeadingType } from '$lib/types';
	import type { FeatureProps } from '$lib/types/feature.type';
	import Features from './ui/features/features.svelte';
	import type { ButtonProps } from '$lib/types/button.type';
	import ButtonsWrapper from './ui/buttons-wrapper.svelte';
	import Button from './ui/button.svelte';
	import type { TestimonialProps } from '$lib/types/testimonial.type';
	import Testimonials from './home/testimonials/testimonials.svelte';
	import type { IconList as IconListType } from '$lib/types/icon-list.type';
	import IconList from './ui/icon-list.svelte';
	import type { FeaturedItem as FeaturedItemType } from '$lib/types/featured-item.type';
	import FeaturedItem from './ui/featured-item.svelte';
	import TimeLine from './ui/timeline/index.svelte';
	import TickList from './layout/section/tick-list.svelte';
	import Feature from './ui/features/index.svelte';
	import type { StepProps } from '$lib/types/step.type';
	import Steps from './ui/steps/steps.svelte';
	import Employees from './ui/employees/employees.svelte';
	import type { Employee } from '$lib/types/employee.type';

	export let items_appearance: 'cards' | 'features' | 'timeline' | '' = '';
	export let appearance: 'default' | 'card' | 'horizontal' | '' = '';
	export let feature: FeatureProps | null = null;
	export let items: any = [];
	export let eyebrow: string = '';
	export let heading: string;
	export let headingType: HeadingType = 'h2';
	export let headingClassNames: string = '';
	export let headerClassNames: string = '';
	export let headerAppearance: 'horizontal' | '' = '';
	export let variant: 'tight' | 'margin-less' | 'default' = 'default';
	export let text: string = '';
	export let textSize: 'small' | 'medium' | 'large' = 'large';
	export let textClassNames: string = '';
	export let id: string = '';
	export let isCentered: boolean = true;
	export let layout: 'lined' | 'vertical' | '' = '';
	export let cards: CardProps[] | null = null;
	export let cardsTextAlignment: 'center' | '' = '';
	export let cardsHeadingType: HeadingType = 'h3';
	export let features: FeatureProps[] | null = null;
	export let testimonials: TestimonialProps[] | null = null;
	export let buttons: ButtonProps[] | null = null;
	export let iconList: IconListType | null = null;
	export let steps: StepProps[] | null = null;
	export let featuredItem: FeaturedItemType | null = null;
	export let list: string[] | null = null;
	export let alternating: boolean = false;
	export let employees: Employee[] | null = null;

	const appearance_to_component_map: any = {
		timeline: TimeLine
	};

	let className: string = '';
	export { className as class };
</script>

<Base {id} class={className} {variant}>
	{@const isHorizontal = headerAppearance === 'horizontal'}
	<div class={appearance === 'card' ? 'card py-12 -mt-10 md:-mt-24 rounded-3xl' : null}>
		<div
			class="
			{headerClassNames} 
			{isCentered && !isHorizontal ? 'text-center' : ''}
			{isHorizontal ? 'md:flex md:gap-5 items-center' : ''}"
		>
			{#if eyebrow}
				<Eyebrow text={eyebrow} class="mb-6" />
			{/if}
			{#if heading}
				<Heading
					type={headingType}
					text={heading}
					class="{isHorizontal ? 'flex-[0_0_50%] h2' : 'h2'} {headingClassNames} mx-auto"
				/>
			{/if}
			{#if text}
				<Text class="mt-5 md:mt-7 {textClassNames}" size={textSize}>{@html text}</Text>
			{/if}
		</div>
		{#if feature}
			<Feature {feature} />
		{/if}
		{#if items_appearance}
			<svelte:component this={appearance_to_component_map[items_appearance]} {items} />
		{/if}
		{#if cards}
			<Cards
				{layout}
				{cards}
				headingType={cardsHeadingType}
				class="
				{layout === 'lined' ? 'mt-4' : 'mt-8'} 
				lg:mt-14 
				{cardsTextAlignment === 'center' ? 'text-center' : ''}
			"
			/>
		{/if}
		{#if features}
			<Features {features} {layout} {alternating} class="mt-16" />
		{/if}
		{#if testimonials}
			<Testimonials {testimonials} class="mt-14" />
		{/if}
		{#if steps}
			<Steps {steps} />
		{/if}
		{#if list}
			<TickList {list} isMultiColumn={true} class="mt-10" />
		{/if}
		{#if employees}
			<div class="mt-10 space-y-32">
				{#each employees as employee}
					<Employees {employee} />
				{/each}
			</div>
		{/if}
		<div
			class={iconList && featuredItem
				? 'flex flex-wrap md:flex-nowrap items-center justify-between gap-10 md:gap-20 max-w-sm md:max-w-4xl mx-auto mt-12'
				: ''}
			class:hidden={!iconList && !featuredItem}
		>
			{#if iconList}
				<IconList {iconList} />
			{/if}
			{#if featuredItem}
				<FeaturedItem {featuredItem} />
			{/if}
		</div>
		{#if buttons}
			<ButtonsWrapper class="justify-center mt-8">
				{#each buttons as button}
					<Button {button} />
				{/each}
			</ButtonsWrapper>
		{/if}
		<slot />
	</div>
</Base>
