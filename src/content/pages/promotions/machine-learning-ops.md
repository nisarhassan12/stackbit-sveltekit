---
layout: Page
label: Machine Learning Ops
title: Database for Real-Time ML Ops | Materialize
description: >-
  Learn how machine learning engineers tackle the challenges of operating ML in
  production using Materialize: A cloud-native database with a stream processor
  as the query engine.
noindex: true
image: 'https://res.cloudinary.com/mzimgcdn/image/upload/v1665555412/mlops.jpg'
sections: [
	{
		type: "HeroSection",
		heading: "A better database for {{Machine Learning Ops}}",
		text: "Use a streaming database with strong consistency to solve data latency,
      quality, and monitoring challenges faced by operating ML at scale.",
		image: "/images/use-cases/machine-learning-ops.png",
		imageClassNames: "transform scale-90",
	},
	{
		type: "Section",
		heading: "Train and serve machine learning {models on streaming datasets.}",
		headingClassNames: max-w-3xl h2 text-center,
		isCentered: false,
		text: "According to industry reports, only 22 percent of companies using machine
      learning have successfully deployed a model. And out of that cohort, over
      half believe deploying another would take at least 90 days. Often, the
      challenge is not training the model but getting up-to-date, correct
      information for it to score. <br/> <br/> Materialize has all the capabilities necessary to deliver a feature store
      that continuously updates dimensions as new data becomes available without
      compromising on correctness or speed. And because Materialize is Postgres
      wire compatible, the feature can be served or queried using your favorite
      Postgres driver. No custom integrations are required.",
	   textSize: "medium",
	   textClassNames: max-w-3xl mx-auto,

	},
	{
		type: "Section",
		layout: "lined",
		heading: "What can you build with {Materialize?}",
		cards: [
			{
				"heading": "Unified feature training and serving",
				"text": "The most common frameworks for machine learning require separate systems for feature training and feature serving. Materialize is a database wrapped around a stream processor - enabling teams to train and serve features with a single solution."
			},
			{
				"heading": "Real-time online feature store",
				"text": "Use Materialize to complement your offline feature store, which is built primarily to store and access historical feature data. Build real-time predictions with millisecond latency reads and high throughput writes with Materialize.",
				"button": {
					"label": "Read More",
					"url": "/blog/real-time-feature-store-with-materialize/",
					"theme": "mz-btn-link",
					"arrow": true
				}
			},
			{
				"heading": "Operate on multiple data sources",
				"text": "Materialize supports cross-stream and multi-way joins, without the need to microbatch or round-trip data at high latencies. Use the same existing SQL to train ML models in batch - but instead adapt models in real-time."
			},
			{
				"heading": "Strict serializability",
				"text": "Materialize makes it simple to build a real-time feature store without sacrificing correctness. With strict serializability, you don’t need to give up correctness guarantees to train ML models with multiple data inputs."
			}
  		]
	},
	{
		type: "Section",
		heading: "Use an engine purpose built {for real-time analytics}",
    	text: "Materialize is built from the ground up to solve complex issues hindering adoption of streaming tools.",
		headingClassNames: "max-w-2xl h2",
    	textClassNames: "max-w-2xl mx-auto",
		"cards": [
			{
				"heading": "“Building an ML pipeline requires stitching multiple systems together”",
				"text": "Current models for machine learning operations put a ton of burden on the user - managing separate systems for raw data collection, feature storage, processing, and consumption. Materialize manages all of those pieces in a single streaming database."
			},
			{
				"heading": "“We need to train our machine learning models faster”",
				"text": "Data warehouses power many machine learning use cases - but can only work in batches. Materialize incrementally maintains the results of SQL queries in real-time so machine learning models never train off of old data."
			},
			{
				"heading": "“Machine learning operations requires hiring for a specialized set of skills”",
				"text": "Hard-coded logic requires a ton of effort to update and maintain as business requirements shift. Materialize allows you to adjust and test using standard SQL, saving time both in the short and long term."
			},
			{
				"heading": "“We can manage our feature store with our data warehouse”",
				"text": "Data warehouses are helpful for storing historical features as an offline feature store. With Materialize, models can be trained and served in real-time as an online feature store - and historical models can be enriched by sinking already-generated features into your data warehouse."
			},
			{
				"heading": "“We need to train our models with multiple data inputs and can’t move to streaming”",
				"text": "Materialize supports cross-stream and multi-way joins, without the need to microbatch or round-trip data at high latencies. Focus on what you want to build, and Materialize will handle how to get it."
			},
			{
				"heading": "“Moving to real-time training will results in errors from eventual consistency”",
				"text": "Don’t give up correctness guarantees for speed. All results from Materialize reflect correct answers, and models should never be falsely impacted by late-arriving labels."
			}
		]
	},
	{
		type: "FeaturedCustomerStory",
		item_refs: ["customer-stories/maqqie"]
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
