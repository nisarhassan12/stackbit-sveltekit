---
layout: Page
label: Pricing
title: Materialize Pricing
description: View pricing for Materialize.
sections: [
	{
		type: "Section",
		heading: 'Materialize {Pricing}',
		headingType: "h1",
		text: "Only pay for the resources you use. Materialize gives you control to scale compute, streaming I/O and storage independently so you only pay for the resources you need.",
		textClassNames: "max-w-3xl mx-auto",
		textSize: "medium",
		variant: "tight",
	},
	{
		type: "Section",
		appearance: "card",
		heading: 'The essential features of a modern cloud database, included for free.',
		class: 'max-w-3xl mx-auto',
		headingClassNames: 'h4 max-w-lg px-5 mx-auto',
		list: [
			'Team Accounts',
			'SSO, Google, GitHub Auth',
			'Secure Data Integration',
			'Monitoring Integrations',
			'HTTP API',
			'SQL Control Plane',
		]
	},
	{
		type: "SectionFeature",
		feature: {
			heading: "Ramp quickly with On Demand, {{scale efficiently with Capacity.}}",
			text: "Start using Materialize today using on demand billing, or commit to an upfront capacity purchase to receive compute credits at a discounted price.",
			table: {
				dataset: "general"
			}
		}
	},
	{
		type: "Section",
		heading: "Compute Credits vs Ancillary Costs",
		headingClassNames: "h3 mb-10",
		feature: {
			diagramBlock: {
				variant: "minimal",
			},
			text: "**TODO**: add content here once the HTML rendering issue is resolved.",
		}
	},
	{
		type: "SectionFeature",
		feature: {
			heading: "Compute Clusters",
			text: "
				This is some **text**

				This is some other **text**

				- 1

				- 2

				- 3

				~~some other other text~~
			",
			table: {
				dataset: "cluster_replicas"
			}
		}
	},
	{
		type: "SignUp"
	}
]
---
