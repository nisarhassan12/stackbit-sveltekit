---
layout: Page
label: Brand Guide
title: Materialize Brand Guide & Logos
description: >-
  Reference the Materialize brand guidelines and download official Materialize logos here.
sections: [
	{
		type: "Section",
		heading: "Brand Guidelines",
    	text: "This page provides detail on how to use our logo marks.",
		variant: "tight",
	},
	{
		type: "Section",
		heading: "Logo Collections",
		text: "Download the files containing both the logomark and logotype versions in different color schemes in your preferred format:",
		textClassNames: 'max-w-2xl mx-auto',
		cards: [
			{
				"heading": "SVG",
				"text": "Preferred for print and when logo size needs to be scaled.",
				"button": {
					"label": "Download SVG Pack (ZIP)",
					"url": "/Materialize-Logo-SVG.zip",
					"download": true,
					"variant": "ghost",
					"size": "md"
				}
			},
			{
				"heading": "PNG",
				"text": "Used in web applications where SVGs are not possible.",
				"button": {
					"label": "Download PNG Pack (ZIP)",
					"url": "/Materialize-Logo-PNG.zip",
					"download": true,
					"variant": "ghost",
					"size": "md"
				}
			}
		]
	},
	{
		type: "Section",
		heading: "Logo Variants",
		text: "See below for official Materialize logo variations and the guidance on where each can be used.",
		cards: [
			{
				"heading": "Two-Color (Default)",
				"theme": "light",
				html: "Use on standalone placement with white background - i.e. document headers.\n<p class=\"flex flex-col items-center not-prose\">\n  <img style=\"border-radius:0; padding:32px 32px 24px; margin: auto;\" src=\"/svgs/brand-guide/materialize-logo.svg\" />\n  <img style=\"border-radius:0; padding:32px 32px 24px; margin: auto;\" src=\"/svgs/brand-guide/materialize-mark.svg\" />\n</p>"
			},
			{
				"heading": "Purple",
				"theme": "light",
				html: "Use on white backgrounds where there are other design elements and the green/purple would be too distracting - on a slide footer, for example.\n<p class=\"flex flex-col items-center not-prose\">\n  <img style=\"border-radius:0; padding:32px 32px 24px; margin: auto;\" src=\"/svgs/brand-guide/materialize-purple-logo.svg\" />\n  <img style=\"border-radius:0; padding:32px 32px 24px; margin: auto;\" src=\"/svgs/brand-guide/materialize-purple-mark.svg\" />\n</p>"
			},
			{
				"heading": "Grayscale",
				"theme": "light",
				html: "Use for black and white printed assets only.\n<p class=\"flex flex-col items-center not-prose\">\n  <img style=\"border-radius:0; padding:32px 32px 24px; margin: auto;\" src=\"/svgs/brand-guide/materialize-grayscale-logo.svg\" />\n  <img style=\"border-radius:0; padding:32px 32px 24px; margin: auto;\" src=\"/svgs/brand-guide/materialize-grayscale-mark.svg\" />\n</p>"
			},
			{
				"heading": "White",
				"theme": "dark",
				html: "Use on dark backgrounds.\n<p class=\"flex flex-col items-center not-prose\">\n  <img style=\"border-radius:0; padding:32px 32px 24px; margin: auto;\" src=\"/svgs/brand-guide/materialize-white-logo.svg\" />\n  <img style=\"border-radius:0; padding:32px 32px 24px; margin: auto;\" src=\"/svgs/brand-guide/materialize-white-mark.svg\" />\n</p>"
			}
  		]
	},
	{
		type: "Section",
		heading: 'Colors',
    	text: 'Materialize Colors are',
		"cards": [
			{
				"heading": "Purple",
				html: "Materialize brand purple is used in the following variations:\n<section class=\"flex flex-wrap not-prose mt-4 gap-4\">\n  <p class=\"flex flex-col\">\n    <span class=\"w-32 h-12\" style=\"background:#7F4EFF;\"></span>\n    <span>Accent Purple</span>\n    <code>#7F4EFF</code>\n  </p>\n  <p class=\"flex flex-col\">\n    <span class=\"w-32 h-12\" style=\"background:#472F85;\"></span>\n    <span>Logo Purple</span>\n    <code>#472F85</code>\n  </p>\n  <p class=\"flex flex-col\">\n    <span class=\"w-32 h-12\" style=\"background:#1B164C;\"></span>\n    <span>Dark Purple</span>\n    <code>#1B164C</code>\n  </p>\n</section>"
			},
			{
				"heading": "Green",
				html: "Materialize brand green is used in the following variations:\n<section class=\"flex flex-wrap not-prose mt-4 gap-4\">\n  <p class=\"flex flex-col\">\n    <span class=\"w-32 h-12\" style=\"background:#13D461;\"></span>\n    <span>Accent Green</span>\n    <code>#13D461</code>\n  </p>\n  <p class=\"flex flex-col\">\n    <span class=\"w-32 h-12\" style=\"background:#5ae191;\"></span>\n    <span>Logo Green</span>\n    <code>#5ae191</code>\n  </p>\n</section>"
			},
			{
				"heading": "Gradients",
				html: "Materialize uses the following gradients in brand material:\n<section class=\"flex flex-wrap not-prose mt-4 gap-4\">\n  <p class=\"flex flex-col\">\n    <span style='background: var(--primary-gradient)' class=\"w-32 h-12\"></span>\n    <span>Primary Gradient</span>\n  </p>\n  <p class=\"flex flex-col\">\n    <span style='background: var(--secondary-gradient)' class=\"w-32 h-12\"></span>\n    <span>Secondary Gradient</span>\n  </p>\n</section>"
			}
  ]
	}
]
---
