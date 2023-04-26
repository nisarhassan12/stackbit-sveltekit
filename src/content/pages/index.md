---
layout: Page
label: Homepage
title: The Streaming Database | Materialize
description: >-
  Materialize is a streaming SQL database for real-time applications, live
  dashboards, and streaming data pipelines. It provides the simplicity of SQL
  queries, but with millisecond-level latency for real-time data.
sections: [
	{
		type: "HeroSection",
		heading: "The Cloud Database for {{Fast-Changing Data.}}",
		text: "We put a streaming engine in a database, so your team can build real-time data products without the cost, complexity, and development time of **stream** processing.
		
		- 1
		
		- 2

		- 3
		",
		buttons: [
			{
				label: "Get Access",
				url: "/register",
				size: 'md'
			},
			{
				label: "Get a Demo",
				url: "/register",
				variant: 'ghost',
				size: 'md'
			}
		]
	},
	{
		type: "LogoSection",
    	heading: "Trusted by data and engineering teams",
    	text: "View [Customer Stories](/customer-stories)."
	},
	{
		type: "Section",
		id: "why",
		eyebrow: "Why Materialize?",
		heading: 'New Use Cases in OLAP need {Correct, Up-To-Date Data.}',
		text: "Fresh, correct and consistent data is a prequisite to operationalizing OLAP data in your business.",
		layout: lined,
		cards: [
			{
				"heading": "Real-Time & User-Facing Analytics",
				"text": "Dashboards and data products need to be reactive to up-to-the-minute changes in your business.",
				"icon": "https://res.cloudinary.com/mzimgcdn/image/upload/v1680633726/homepage-usecases_RTA.png",
				"button": {
					"label": "Read More",
					"url": "/use-cases/real-time-analytics/"
				}
			},
			{
				"heading": "Automation and Alerting",
				"text": "Save time for your users, and build value by taking action or notifying at only the right moments.",
				"icon": "https://res.cloudinary.com/mzimgcdn/image/upload/v1680633726/homepage-usecases_Alerting.png",
				"button": {
					"label": "Read More",
					"url": "/use-cases/automation-and-alerting/"
				}
			},
			{
				"heading": "Segmentation and Personalization",
				"text": "Value of personalization, recommendations, dynamic pricing increases as latency of data aggregations approaches zero.",
				"icon": "https://res.cloudinary.com/mzimgcdn/image/upload/v1680633726/homepage-usecases_Segmentation.png",
				"button": {
					"label": "Read More",
					"url": "/use-cases/segmentation-and-personalization/"
				}
			},
			{
				"heading": "ML in Production",
				"text": "Online feature stores need continually updated data, operators need to monitor and react to changes in ML effectiveness.",
				"icon": "https://res.cloudinary.com/mzimgcdn/image/upload/v1680633726/homepage-usecases_ML.png",
				"button": {
					"label": "Read More",
					"url": "/use-cases/machine-learning-ops/",
					"arrow": true,
					"theme": "mz-btn-link"
				}
			}
		]
	},
	{
		type: "Section",
		heading: "Traditional tools don't meet the requirements.",
		layout: vertical,
		features: [
			{
				"text": "**Cloud Warehouses are easy,** but they get expensive when run continuously, and hit hard limits on latency and concurrency."
			},
			{
				"text": "**Stream Processors are fast,** but they're a low-level tool, using them has a high-engineering cost, and results in complex architectures."
			}
		]
	},
	{
		type: "Section",
		heading: "Materialize combines the best of both worlds.",
		text: "Materialize is a fast, distributed SQL database built on streaming internals.",
		layout: "vertical",
		features: [
			{
				"heading": "Distributed and Cloud Native",
				"inlineSVG": "cloud-native-architecture",
				"text": "Materialize separates storage and compute for a cloud-native architecture — and adds in a serving layer.",
				"button": {
					"label": "Read: Materialize Architecture",
					"url": "/blog/next-generation/"
				}
			},
			{
				"heading": "Results are always up-to-date",
				"inlineSVG": "streaming-database-minimal",
				"text": "Work is done at the moment of data arrival, rather than query time, so that maintained results are available almost instantly.",
				"button": {
					"label": "Read: What is a Streaming Database?",
					"url": "/guides/streaming-database/"
				}
			}
  		]
	},
	{
		type: "Sql",
	},
	{
		type: "Section",
		"buttons": [
			{
				"label": "Read the Docs",
				"url": "https://materialize.com/docs",
				"size": "md",
				"variant": "ghost"
			}
		],
		"cards": [
			{
				"heading": "Presents as PostgreSQL",
				"text": "Manage and query Materialize using [any Postgres driver or tool](https://materialize.com/docs/integrations/).",
				"_id": "postgres"
			},
			{
				"heading": "Streaming Inputs",
				"text": "Pull in streams of data from [Kafka](https://materialize.com/docs/sql/create-source/kafka/) or stream from [Postgres](https://materialize.com/docs/sql/create-source/postgres/) via replication.",
				"_id": "inputs"
			},
			{
				"heading": "Built for JOINs",
				"text": "Multi-way, complex [join](https://materialize.com/docs/sql/join/) support across real-time streams - all in standard SQL.",
				"_id": "streaming_joins"
			},
			{
				"heading": "Active Replication",
				"text": "Use replication to increase availability, reduce downtime, scale seamlessly.",
				"_id": "replication"
			},
			{
				"heading": "Low-Latency Serving Layer",
				"text": "Results can be maintained in memory, making read latency similar to Redis.",
				"_id": "reads"
			},
			{
				"heading": "Event-Driven Primitives",
				"text": "[Sink](https://materialize.com/docs/overview/key-concepts/#sinks) changes out to Kafka, or [subscribe](https://materialize.com/docs/sql/subscribe/) to query updates in standard Postgres.",
				"_id": "sink_subscribe"
			},
			{
				"heading": "Secure and Compliant",
				"text": "[SOC 2 Type 2 compliant](security), encrypted at rest, [secure connectivity](/security) to your infra.",
				"_id": "sink_subscribe"
			}
  		]
	},
	{
		type: 'Section',
		heading: 'Empower your Team to {Build Confidently With Live Data.}',
		features: [
			{
				"eyebrow": "World-Class Technology",
				"heading": "Streamline solutions to hard problems.",
				"text": "Materialize is built from the ground up to deliver where others have fallen short: **incremental view maintenance** that doesn't sacrifice **consistency and correctness**, and without limits on SQL complexity.",
				"image": "https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/abstract-streaming.webp",
				"alt": "Streamline solutions to hard problems",
				"button": {
					"label": "Consistency in Streaming",
					"url": "/blog/eventual-consistency-isnt-for-streaming/"
				}
			},
			{
				"eyebrow": "Integrated and Compatible",
				"heading": "Keep the stack and workflows you love.",
				"text": "Get new capabilities without disruptive changes:\n- [PostgreSQL Source](https://materialize.com/docs/sql/create-source/postgres/)\n- [Kafka Sources and Sinks](https://materialize.com/docs/sql/create-source/kafka/)\n- [dbt Adapter](/integrations/dbt/)\n- [PG Wire Compatibility](/blog/postgres-compatibility/)\n",
				"image": "https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/abstract-materialize.webp",
				"alt": "works with your existing stacks, pipelines, workflows",
				"button": {
					"label": "View All Integrations",
					"url": "https://materialize.com/docs/integrations/"
				}
			},
			{
				"eyebrow": "Standard SQL",
				"heading": "Replace bespoke architectures with SQL.",
				"text": "Save your stream processor for the most complex use cases, everything else can be SQL queries.",
				"image": "https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/abstract-cdc.webp"
			},
			{
				"eyebrow": "Cloud Architecture",
				"heading": "Make fresh data accessible across teams.",
				"text": "Run multiple workloads on the same data with ease:\n- **Shared Storage:** access the same raw data, updated continually.\n- **Isolation of Compute:** develop without resource contention.\n",
				"image": "https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/abstract-updates.webp",
				"alt": "Materialize Cloud Architecture",
				"button": {
					"label": "Materialize Architecture Explained",
					"url": "/blog/next-generation/"
				}
			}
  		]
	},
	{
		type: "Section",
		heading: 'Trusted By {Data Teams}',
		testimonials: [
			{
			"name": "Emily Hawkins",
			"title": "Data Infrastructure Lead, Drizly",
			"text": "We can write **real-time SQL,** exactly the same way as we already are in Snowflake with batch.",
			"button": {
				"label": "See how Drizly uses Materialize",
				"url": "/customer-stories/drizly"
			},
			"image": "https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/emily-hawkins.webp"
			},
			{
			"name": "Ryan Gaus",
			"title": "Staff Engineer and Tech Lead, Density",
			"text": "Materialize has saved us I-don’t-know-how-many untold quarters of trying to build our own thing.",
			"button": {
				"label": "See how Density uses Materialize",
				"url": "/customer-stories/density/"
			},
			"image": "https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/ryan-gaus.webp"
			},
			{
			"name": "Jean-Francois Perreton",
			"title": "Head of Algo Quant, Kepler Chevreaux",
			"text": "Materialize **directly integrates with our third-party applications**, BI tools, you name it. It’s really SQL.\n",
			"button": {
				"label": "See how Kepler uses Materialize",
				"url": "/customer-stories/kepler-cheuvreux/"
			},
			"image": "https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/jean-francois-perreton.webp"
			},
			{
			"name": "Tyler Richie",
			"title": "Cofounder and CTO, Sproutfi",
			"text": "With Materialize we don't have to worry about avoiding **complex joins with streaming data**; we can just do them very easily.",
			"image": "https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/tyler-richie.webp",
			"button": {
				"label": "See how Sproutfi uses Materialize",
				"url": "/customer-stories/sproutfi/"
			}
			},
			{
			"name": "Johan Stuyts",
			"title": "Data Architect, Maqqie",
			"text": "Materialize is **correct, and not just eventually consistent.** The alternatives simply don’t support consistency, and you end up wasting a lot of time troubleshooting.\n",
			"image": "https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/johan-stuyts.webp",
			"button": {
				"label": "See how Maqqie uses Materialize",
				"url": "/customer-stories/maqqie/"
			}
			}
		]
	},
	{
		type: "SignUp",
	}
]
---
