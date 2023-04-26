---
layout: Page
label: Homepage
noindex: true
title: The Streaming Database | Materialize
description: >-
  Materialize is a streaming SQL database for real-time applications, live
  dashboards, and streaming data pipelines. It provides the simplicity of SQL
  queries, but with millisecond-level latency for real-time data.
image: 'https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/meta-home.webp'
sections: [
	{
		type: "HeroSection",
		heading: "The Cloud Database for {{Fast-Changing Data.}}",
		text: "We put a streaming engine in a database, so your team can build real-time data products without the cost, complexity, and development time of stream processing.",
		diagramBlock: 'default',
	},
	{
		type: "Sql"
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
		type: "Section",
    	heading: 'Consistency, Scalability, Low Latency: {Pick Three}',
    	text: "The stream processor at the heart of Materialize proactively computes results with strong consistency and sub-second latency — all in a distributed, cloud-native architecture that allows for unbounded scale.",
    	textClassNames: "max-w-4xl mx-auto",
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
