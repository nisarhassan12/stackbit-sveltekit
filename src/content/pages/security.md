---
layout: Page
label: Security
title: Materialize Security
image: https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/meta-home.webp
noindex: true
sections: [
	{
		type: "Section",
		heading: '{Security and Compliance}',
		headingType: 'h1',
		text: "Materialize strives to follow cloud security standards to ensure connectivity and on-platform customer data remains private and secure.",
		textClassNames: max-w-3xl mx-auto
	},
	{
		type: 'Section',
		heading: 'On-Platform Security',
		text: 'Once customer data reaches Materialize, it is isolated from access using encryption at rest and single-tenant architecture at both the compute and control layers.',
		textClassNames: 'max-w-3xl mx-auto',
		alternating: true,
		features: [
			{
				image: '/svgs/security/materialize-tenant-isolation.svg',
				labelList: [
					{
						heading: 'Encryption at Rest in S3',
						text: 'Source data, Tables and Materialized Views are isolated by customer and encrypted at rest in S3.',
					},
					{
						heading: 'Tenant Isolation',
						text: "Materialize Cloud isolates each customer's infrastructure using strict network access control policies and container sandboxing.",
					},
					{
						heading: "Audit Events",
						text: "Materialize provides a system table `mz_audit_events` which records create, alter, drop events for objects in the system catalog.",
						url: "https://materialize.com/docs/sql/system-catalog/mz_catalog/#mz_audit_events"
					},
					{
						icon: "TimeOutline",
						heading: '[In-Progress] RBAC: User-Level Privileges',
						text: "SQL RBAC (Role-Based Access Control) will allow fine-grained tuning of access privileges by user and role.",
					}
				]
			},
			{
				heading: "SOC 2 Type 2 Compliant",
				text: "Your data is secure and compliant in Materialize. To see our SOC 2 Type 2 Compliance report, [get in touch](/contact/).",
				image: "https://res.cloudinary.com/mzimgcdn/image/upload/v1679408088/21972-312_SOC_NonCPA.png"
			},
		]
	},
	{
		type: "Section",
		heading: "Streaming Connection Security",
		text: "With streaming inputs like the [Kafka](https://materialize.com/docs/sources/kafka/) and [Postgres](https://materialize.com/docs/sources/kafka/) Sources, Materialize needs to establish a permenant two-way connection between customer infrastructure. This is done following connection patterns established by companies with similar requirements like Fivetran.",
		textClassNames: "max-w-4xl mx-auto text-left",
		alternating: true,
		features: [
			{
				heading: "Postgres Connection Security",
				text: "Postgres Sources support network-level security over SSH Tunneling + application-level security via standard TLS auth.",
				image: "/svgs/security/bastion-host-diagram.svg",
				labelList: [
					{
						heading: "SSH Tunnel with Bastion Host",
						"text": "Create a secure connection with Materialize-generated Ed25519 keys to keep your database from being exposed to the public internet.",
						"url": "https://materialize.com/docs/sql/create-connection/#postgres-ssh",
					},
					{
						heading: "TLS Encryption",
						"text": "Keep network traffic encrypted between Materialize and Database with standard Postgres SSL options.",
						"url": "https://materialize.com/docs/sql/create-connection/#postgres"
					},
					{
						heading: "Secure Passwords",
						"text": "The SECRET object allows you to protect a password from accidental exposure in Materialize.",
						"url": "https://materialize.com/docs/sql/create-secret/"
					},
					{
						heading: "Static IPs for IP Allowlisting",
						"text": "All outbound traffic from Materialize Cloud originates from a fixed set of IPs that you can allowlist in your environment.",
						"url": "https://materialize.com/docs/ops/network-security/static-ips/",
					}
				]
			},
			{
				heading: "Kafka Connection Security",
				"text": "Kafka supports application level TLS Authentication + Authorization over public-facing IP.",
				"image": "/svgs/security/kafka-security-diagram.svg",
				labelList: [
					{
						heading: "SSL and SASL Authentication",
						"text": "Materialize currently supports SSL or SASL encrypted connections for Broker and Registry.",
						"url": "https://materialize.com/docs/sql/create-source/kafka/#creating-a-connection"
					},
					{
						heading: "Secure Keys",
						"text": "The SECRET object allows you to protect certificates, passwords and keys from accidental exposure in Materialize.",
						"url": "https://materialize.com/docs/sql/create-secret/"
					},
					{
						heading: "Static IPs for Allowlisting",
						"text": "All outbound traffic from Materialize Cloud originates from a fixed set of IPs that you can allowlist in your environment.",
						"url": "https://materialize.com/docs/ops/network-security/static-ips/"
					},
					{
						heading: "AWS PrivateLink",
						"text": "AWS PrivateLink is available for participating enterprise customers.",
						"url": "https://materialize.com/docs/ops/network-security/privatelink/"
					}
				]
			}
  		]
	},
	{
		type: 'SignUp',
	}
]
---
