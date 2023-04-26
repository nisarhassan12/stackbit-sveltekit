---
layout: Page
label: Segmentation and Personalization
title: Real-Time Segmentation and Personalization | Materialize
description: >-
  Learn how software engineers build engaging and dynamic real-time applications
  powered by Materialize.
image: >-
  https://res.cloudinary.com/mzimgcdn/image/upload/v1665555412/segmentation-personalization.jpg
sections: [
	{
		type: "HeroSection",
		heading: "A better database for {segmentation and personalization}",
		text: "Join multiple sources of real-time data and build a better customer experience - all using standard SQL.",
		image: "/svgs/segmentation-and-personalization.svg",
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
		type: "Section",
		heading: "A 360° view of the customer {that’s never out of date.}",
		headingClassNames: max-w-3xl h2 text-center,
		isCentered: false,
		text: "Customers expect a personalized experience every time they interact with
      an application. However, creating a full picture of a customer requires
      joining sources of data together - which has previously been performed in
      a batch-based data warehouse. <br /> <br /> With Materialize, data teams can join multiple streams of data in real
      time for a full view of a customer, all using standard SQL. Timely
      Dataflow incrementally maintains the results of joined streams as a
      segment updates. Materialize offers an elegant solution to the problem of
      cache invalidation, eliminating the need to develop complex logic or
      stitch systems together.",
	   textSize: "medium",
	   textClassNames: max-w-3xl mx-auto,

	},
	{
		type: "Section",
		layout: "lined",
		cardsHeadingType: "h2",
		cards: [ 
			{
				"heading": "Customer 360",
				"text": "Get a full view into how customers interact with your organization - across every touchpoint. Join multiple sources of data and ensure dashboards, customer service teams, and applications all run off the most up-to-date information."
			},
			{
				"heading": "Dynamic Pricing and Billing",
				"text": "Fraud and bot management models need to work immediately to detect and eliminate anomalous activity faster than they can adapt and exploit. Detect fraud on large datasets at extremely low latencies - and easily adjust models as needed in SQL."
			},
			{
				"heading": "App Customization and Promotions",
				"text": "Put your real-time segments to work - and create customized experiences or promotions across a range of applications like gaming, ecommerce, A/B tests, and marketing campaigns."
			},
			{
				"heading": "Content and Product Recommendations",
				"text": "Tailor recommended content or products with up-to-the-second customer data. Reduce cart abandonment, identify new sales opportunities - or simply stop promoting a product someone has already purchased."
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
				"heading": "“Our customers expect a personalized experience”",
				"text": "Running customer segments off a data warehouse is too slow for modern expectations. Move the exact same SQL from your data warehouse to Materialize and get segments that update in real-time."
			},
			{
				"heading": "“Our application microservices are tough to maintain”",
				"text": "With Materialize, you can cut out the notion of scheduling and jobs for microservices. Instead, you simply send data to Materialize, describe its transformations with SQL, and read results on the other side."
			},
			{
				"heading": "“Cache invalidation requires a ton of logic to get right”",
				"text": "Materialize is purpose-built for fast changing data. Its underlying engines know exactly which records to update or invalidate, giving data teams the most up-to-date value without complex cache invalidation logic."
			},
			{
				"heading": "“We need to join many data sources for a full customer view”",
				"text": "Materialize supports cross-stream and multi-way joins, without the need to microbatch or round-trip data at high latencies. With strict serializability, you don’t need to give up correctness guarantees to use multiple data inputs."
			},
			{
				"heading": "“Our segments are too large to run efficiently in real-time”",
				"text": "Materialize is built for horizontal scaling and separates storage and compute. Data is durably stored in S3, while compute scales independently. Run replicated compute clusters to increase availability and reduce downtime."
			},
			{
				"heading": "“We want to use machine learning to improve our segments”",
				"text": "For teams looking to improve their recommendation engine over time, Materialize can also be used as a real-time online feature store, training and serving machine learning models without waiting for batches of data to arrive."
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
		type: "SignUp"
	}
]
---
