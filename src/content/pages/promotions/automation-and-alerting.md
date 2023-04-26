---
layout: Page
label: Automation and Alerting
noindex: true
title: Automation and Alerting | Materialize
description: >-
  Learn how software engineers build powerful event-driven automation and
  alerting using Materialize, a streaming SQL database.
image: >-
  https://res.cloudinary.com/mzimgcdn/image/upload/v1665555413/automation-alerting.jpg
sections: [
  {
    type: "HeroSection",
    heading: 'A better database for {{automation and alerting}}',
    text: " Materialize is a database with stream processing internals: Use SQL to transform data in real-time, and event-driven primitives to automate it.",
    image: "/svgs/automation-and-notifications-hero.svg",
    alt: "Automation and Notifications",
  },
  {
		type: "Section",
		heading: "Ship real-time product {notifications in hours, not weeks}",
		headingClassNames: max-w-3xl h2 text-center,
		isCentered: false,
		text: "Alerts and automated actions need to act fast - and on the right information. However, many applications are still built on a batch paradigm, fundamentally limiting how quickly notifications can be triggered. <br/><br/> With Materialize, software engineering teams can build real-time services with sub-second latencies, all while using the same SQL and scale they’ve used with traditional data warehouses. And with the strongest consistency guarantees, Materialize alleviates worries about false positives or incorrect triggers that have previously troubled product teams working with real-time data.",
	  	textSize: "medium",
		textClassNames: max-w-3xl mx-auto,		
	},
	{
		type: "Section",
		layout: "lined",
		cardsHeadingType: 'h2',
		cards: [
			{
				"heading": "User-facing notifications",
				"text": "Customers expect only the most useful notifications to be delivered when they are most relevant. Build highly-specific notifications on high-volume, rapidly changing data - no need to wait for your data warehouse to run.",
				"button": {
				"label": "Read: How Drizly uses Materialize",
				"url": "/customer-stories/drizly/",
				"theme": "mz-btn-link",
				"arrow": true
				}
			},
			{
				"heading": "Fraud and anomaly detection",
				"text": "Fraud and bot management models need to work immediately to detect and eliminate anomalous activity faster than they can adapt and exploit. Detect fraud on large datasets at extremely low latencies - and easily adjust models as needed in SQL."
			},
			{
				"heading": "Risk Modeling",
				"text": "Instantly determine how much risk and volatility is present in a particular trade, investment, or series of cash flows. Use your existing SQL models to validate every trade in a portfolio in real-time, instead of in batches.",
				"button": {
				"label": "Read: How Kepler uses Materialize",
				"url": "/customer-stories/kepler-cheuvreux/",
				"theme": "mz-btn-link",
				"arrow": true
				}
			},
			{
				"heading": "Monitoring and maintenance",
				"text": "Monitor and manage the health of networks, IoT devices, and connected fleets. Build dashboards for real-time visibility into conditions and locations, then automate alerts to status changes and better enable preventative maintenance."
			}
		]
	},
	{
		type: "Section",
		heading: "Use an engine purpose built {for real-time analytics}",
    	text: " Materialize is built from the ground up to solve complex issues hindering adoption of streaming tools.",
		headingClassNames: "max-w-2xl h2",
    	textClassNames: "max-w-2xl mx-auto",
		"cards": [
			{
				"heading": "“Our data warehouse alerts run too slowly”",
				"text": "Data warehouses power many user-facing notifications and data models - but can only work in batches. Materialize incrementally maintains the results of SQL queries in real-time so alerts never run off of old data."
			},
			{
				"heading": "“Creating and updating notification logic is a hassle”",
				"text": "Hard-coded notification logic requires a ton of effort to update and maintain as business requirements shift. Materialize allows you to adjust and test using standard SQL, saving time both in the short and long term."
			},
			{
				"heading": "“We don’t have the data engineers for real-time alerts”",
				"text": "Anyone who knows standard SQL - including full-stack engineers, data scientists, or PMs - can build notification logic within Materialize, eliminating the need for long back-and-forth review cycles with data engineering."
			},
			{
				"heading": "“We can’t risk automation if our system gives bad data”",
				"text": "Don’t risk weird failure cases caused by eventual consistency.  All results from Materialize reflect correct answers, meaning alerts and automated processes are never falsely triggered by late-arriving data."
			},
			{
				"heading": "“We use other systems for our notifications”",
				"text": "Materialize is postgres wire-compatible and acts like a standard postgres database. Keep your existing alerting and notification systems - but power them with real-time data."
			},
			{
				"heading": "“We need to run alerts at massive scale”",
				"text": "Materialize is designed for scale, and is powered by a stack of stream processors - Timely Dataflow and Differential Dataflow - that have been battle-tested by Fortune 100 companies in global deployments."
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
