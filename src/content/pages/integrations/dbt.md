---
layout: Page
label: dbt
noindex: true
title: Real-Time dbt | Materialize
description: >-
  Materialize is a fast and efficient streaming SQL database that, when
  connected to Kafka, enables developers to write real-time materialized views
  in standard SQL that join, transform and aggregate Kafka data.
sections: [
	{
		type: "Section",
		heading: "dbt + Materialize: {{Real-Time Data Superpowers}}",
		text: "Use the best-in-class analytics engineering workflows of dbt to manage
      revolutionary new streaming data capabilities in Materialize.",
	  	textClassNames: "max-w-3xl mx-auto",
		cardsTextAlignment: "center",
		cardsHeadingType: "h2",
		cards: [
			{
				"heading": "Keep your Standard SQL",
				"text": "Keep the SQL modelling conventions your team is familiar with."
			},
			{
				"heading": "End Manual Orchestration",
				"text": "`dbt run` once and your views are continually kept updated."
			},
			{
				"heading": "Get Event-Driven Capabilities",
				"text": "Write tests that run continually on your data and alert immediately."
			}
  		],
		buttons: [
			{
				"label": "Get Access",
				"url": "https://materialize.com/materialize-cloud-access/",
				"size": "md"
			},
			{
				"label": "Read the Docs",
				"url": "https://materialize.com/docs/integrations/dbt/",
				"variant": "ghost",
				"size": "md"
			}
		]
	},
		{
		type: "FeaturedCustomerStory",
		item_refs: ["customer-stories/drizly"]
	},
	{
		type: "Section",
		cardsHeadingType: "h2",
		cards: [
			{
				"heading": "What is dbt?",
				"text": "[dbt](https://getdbt.com) is a SQL-based transformation workflow that lets teams quickly and collaboratively deploy analytics code following software engineering best practices.",
				"icon": "/svgs/dbt-bit_tm.svg",
				"list": [
					"Git-enabled version control",
					"Modularity",
					"CI/CD",
					"Documentation"
				]
			},
			{
				"heading": "What is Materialize?",
				"text": "Materialize is a fast, distributed, SQL database built on streaming internals.",
				"icon": "/svgs/materialize-logo-mark-color.svg",
				"list": [
					"Incremental Computation Engine",
					"Presents as Postgres",
					"Built for Joins",
					"Event-Driven Primitives"
				]
			}
  		]
	},
	{
		type: "Section",
		heading: "How it {works?}",
		text: "Manage Materialize using dbt in Three Steps",
		"steps": [
			{
			"eyebrow": "Model",
			"heading": "Write SQL transformations in dbt",
			"text": "Maintain the entire schema of your SQL transformations (sources, views, materialized views) in a dbt project in a git repo.",
			"image": "/svgs/dbt-project-in-git-repo.svg",
			"links": [
				{
					"text": "What is dbt?",
					"url": "https://docs.getdbt.com/docs/introduction"
				},
				{
					"text": "dbt-Materialize adapter",
					"url": "https://materialize.com/blog/introducing-dbt-materialize/"
				}
			]
			},
			{
				"eyebrow": "Run",
				"heading": "Use the dbt CLI to build views in Materialize",
				"text": "Execute `dbt run` from the CLI to build the SQL models and transformations in Materialize once, and to migrate after updates.",
				"image": "/svgs/dbt-run-diagram.svg",
				"links": [
					{
					"text": "Docs > How to use dbt to manage Materialize",
					"url": "https://materialize.com/docs/integrations/dbt/"
					}
				]
			},
			{
				"eyebrow": "Materialize",
				"heading": "Results are automatically kept up-to-date",
				"text": "Materialize automatically updates the results of SQL transformations as source data changes. Results can be queried in SQL or streamed out.",
				"image": "/svgs/realtime-table.svg",
				"links": [
					{
					"text": "Real-Time Data Quality Tests using dbt and Materialize",
					"url": "https://materialize.com/blog/real-time-data-quality-tests-using-dbt-and-materialize/"
					}
				]
			}
		]
	},
	{
		type: "SignUp"
	}
]
---
