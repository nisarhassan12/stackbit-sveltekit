---
layout: Page
label: Real-Time Analytics
title: Real-Time Analytics & Dashboards | Materialize
description: Learn how software engineers build engaging and dynamic real-time applications powered by Materialize.
noindex: true
image: >-
  https://res.cloudinary.com/mzimgcdn/image/upload/v1665555413/real-time-analytics.jpg
sections: [
	{
		type: "HeroSection",
		heading: "A better database for {Real-Time Analytics}",
		text: "Keep your SQL models and dbt workflow - Use a streaming database to run complex analytical transformations in real-time.",
		image: "/images/use-cases/realtime-analytics-and-dashboards.png",
	},
	{
		type: "Section",
		heading: "What if your data warehouse {{was never out of date?}}",
		headingClassNames: max-w-3xl h2 text-center,
		isCentered: false,
		text: "Insights can only move as fast as the data behind them. Access to
      real-time data means **real-time decision making** - whether it be in the
      form of an **event-driven application**, or a product leader making a call
      based on the current state of a metric.<br /> <br/>With Timely Dataflow and Differential Dataflow, Materialize delivers
      support for real-time analytic workloads without sacrificing consistency
      guarantees. Teams can easily build analytical tests, operationalize
      reports and dashboards, and ensure insights are based on the most current
      data available.",
	  	textSize: "medium",
		textClassNames: max-w-3xl mx-auto,
		featuredItem: {
			image: "/svgs/real-time-analytics-architecture-diagram.svg",
			caption: "Reference real-time analytics architecture using to [SUBSCRIBE](https://materialize.com/docs/sql/subscribe/) to changes to incrementally updated views.",
			isCentered: true
		}
	},
	{
		type: "Section",
		heading: "What can you {build with Materialize?}",
		layout: "lined",
		cards: [
			{
				"heading": "Dashboards and Business Intelligence",
				"text": "Materialize is PostgreSQL wire-compatible, enabling connection with BI tools like Looker, Metabase and more.",
				"button": {
					"label": "View BI integrations",
					"url": "https://materialize.com/docs/integrations/#business-intelligence-bi"
				}
			},
			{
				"heading": "User-Facing Analytics",
				"text": "Query or subscribe to data in Materialize directly from customer-facing applications, without the need for complex caching.",
				"button": {
					"label": "Read more",
					"url": "/blog/lets-talk-about-data-apps/"
				}
			},
			{
				"heading": "Real-time data quality tests",
				"text": "Monitor your data pipelines as you would any other production system and get notified - in real-time - when data quality expectations fail. No need for an orchestrator to schedule data model runs.",
				"button": {
					"label": "Read more",
					"url": "/blog/real-time-data-quality-tests-using-dbt-and-materialize/"
				}
			},
			{
				"heading": "Operational and IoT Reporting",
				"text": "Create live customer service dashboards, manage IoT device performance, and automate logistics-focused dashboards."
			}
		]
	},
	{
		type: "Section",
		heading: "Use an engine purpose built {for real-time analytics}",
		headingClassNames: "max-w-2xl h2",
		"cards": [
			{
				"heading": "“My warehouse is too slow - but real time is too expensive”",
				"text": "Get access to real time without rebuilding or rehiring: Materialize uses familiar database abstractions and ANSI-standard SQL."
			},
			{
				"heading": "“Our analytics are too join-heavy to move to real time”",
				"text": "Materialize efficiently handles complex SQL joins on streaming data."
			},
			{
				"heading": "“We don't want to take on the operational burden of Kafka”",
				"text": "No Kafka? No problem. Materialize connects directly to your Postgres DB via Change Data Capture (CDC)."
			},
			{
				"heading": "“This is high-stakes data, we can't show incorrect results.”",
				"text": "Unlike other streaming solutions, Materialize is strongly consistent: Incomplete results are never served to the user."
			},
			{
				"heading": "“We’d like to keep our existing visualization tools”",
				"text": "Materialize is Postgres wire-compatible: Tools that connect to Postgres can connect and query Materialize."
			},
			{
				"heading": "“We already move Kafka data into our data warehouse”",
				"text": "Warehouses help you **report** on data, move the same SQL to Materialize to serve high concurrency, low latency data products."
			}
		]
	},
	{
		type: "FeaturedCustomerStory",
		item_refs: ["customer-stories/drizly"]
	},
	{
		type: "Section",
		heading: "Key {Features}",
		cards: [
			{
				"heading": "Incremental Materialized Views",
				"text": "The power of materialized views - but always up-to-date",
				"icon": "/svgs/incremental-materialized-views-gradient-icon.svg"
			},
			{
				"heading": "Easily Connect Kafka",
				"text": "Easily manage streams from Kafka or Redpanda",
				"icon": "/svgs/kafka-gradient-icon.svg"
			},
			{
				"heading": "Make Postgres Real-Time",
				"text": "Connect directly to any Postgres database via CDC.",
				"icon": "/svgs/postgres-real-time-gradient-icon.svg"
			},
			{
				"heading": "dbt Integration",
				"text": "Use dbt to model data and create real-time analytics",
				"icon": "/svgs/dbt-gradient-icon.svg"
			},
			{
				"heading": "Full SQL - including joins",
				"text": "Full support for joins, subqueries, CTEs, inserts, and deletes.",
				"icon": "/svgs/sql-gradient-icon.svg"
			},
			{
				"heading": "Presents as Postgres",
				"text": "Connect to the ecosystem of Postgres tools",
				"icon": "/svgs/postgres-gradient-icon.svg"
			},
			{
				"heading": "SUBSCRIBE to updates",
				"text": "Get updated results as data changes with query subscriptions.",
				"icon": "/svgs/tail-gradient-icon.svg"
			}
  		]
	},
	{
		type: "SignUp",
		text:  'Ready to start building with Materialize? Register for early access here.',
		buttons: [
			{
				label: "Register for Access",
				url: '#register'
			}
		],
	}
]
---
