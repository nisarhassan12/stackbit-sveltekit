---
layout: PressRelease
title: >-
  Materialize Makes Using Real-Time Data As Simple As Batch with New Distributed
  Streaming Database
description: >-
  Developers can now leverage real-time data using standard ANSI SQL, with new
  functionality including elastic storage separated from compute,
  strict-serializability, active replication and horizontal scalability.
date: '2022-10-03'
people_refs: []
category: Company News
image: https://res.cloudinary.com/mzimgcdn/image/upload/v1665546810/Why-Use-Materialized-View.png
---

[Materialize](http://www.materialize.com/) today announced early availability of its distributed streaming database, which enables immediate, widespread adoption of real-time data for applications, business functions, and other data products. In an industry first for streaming data, [Materialize delivers](https://materialize.com/blog/next-generation/?utm_source=media&utm_medium=release&utm_campaign=octrelease) in a single platform the separation of storage and compute, strict-serializability, active replication, horizontal scalability, and workload isolation — all through a simple SQL interface available as a fully-managed cloud service. Materialize is now the fastest way to build products with streaming data, drastically reducing the time, expertise, cost and maintenance traditionally associated with implementation of real-time features.

Until now, adopting real-time data has come with sky-high development costs, extreme complexity in implementation, yet still lacks the capabilities necessary to truly productionalize the resulting data products. However, working with streaming data is no longer a nice-to-have for high-performing companies, and in the next decade, companies will have to work with a real-time first approach to their data. Materialize, for the first time, [gives users all the power of streaming data](https://materialize.com/blog/next-generation/?utm_source=media&utm_medium=release&utm_campaign=octrelease) with the same simplicity and low implementation cost as batch cloud data warehouses.

> **“Materialize is one of the highest-leverage solutions available in the streaming space," said Jared Noynaert, vice president, data & analytics at Crane Worldwide. "With the added persistence, high availability, decoupled storage and compute, and improved ergonomics, Materialize delivers the right abstraction at the right time.”**

Materialize’s PostgreSQL-compatible interface lets users leverage the tools they already use, with unsurpassed simplicity enabled by full ANSI SQL support. It allows developers and data teams to build customer-facing workflows, data engineers to build data applications, and analytics engineers to perform streaming analytics, leveraging integrations with powerful platforms like dbt. Materialize gives developers results that are always up-to-date, enabling them to quickly build automated, low-latency applications downstream.

**New innovations announced today include:**

- **Availability as a fully-managed cloud-native software-as-a-service platform**

- **Elastic storage (AWS S3), separated from compute** increases scalability and availability while reducing costs

- **Strict-serializability** eliminates stale data and enables strong consistency guarantees

- **Multi-way complex joins** supports stream-to-stream, stream-to-table, table-to-table, and more, all in standard SQL

- **Horizontal scalability** leverages[ Timely Dataflow](https://timelydataflow.github.io/timely-dataflow/) to let users handle large, fast-scaling workloads

- **Active replication** enables users to spin up multiple clusters with the same workload for high-availability

- **Workload isolation** enables users to spin up multiple clusters with different workloads while still leveraging shared elastic-storage, enabling collaboration without worrying about interference

> **“By abstracting away the tedious stream processing work and allowing both data and software engineers to focus on logic in SQL, we help them create customizable, powerful data experiences, quickly, easily, and cost-effectively,” said Materialize Co-founder and Chief Scientist Frank McSherry. “Real-time products haven’t been impossible to implement, they’ve just been extremely difficult, due to the need for custom development and ongoing maintenance. Standard SQL significantly lowers the bar to engagement and should be sufficient for all but the most complex use cases, enabling valuable engineering resources to be applied to the most sophisticated challenges.”**

**How Materialize works**

Using standard ANSI SQL and looking and acting like a Postgres database, Materialize, which is built atop[ Timely Dataflow](https://timelydataflow.github.io/timely-dataflow/) and[ Differential Dataflow](https://timelydataflow.github.io/differential-dataflow/introduction.html):

1.  Incrementally maintains the results of SQL queries as materialized views, in-memory or on cloud storage, providing millisecond-level latency on complex transformations, joins, or aggregations.

2.  Ingests data from multiple sources, including relational databases, event streams, and data lakes before transforming or joining data using the same complex SQL queries used with batch data warehouses.

3.  Builds materialized views and incrementally updates the results of as source data changes, rather than computing the answer to a query from scratch every time like a traditional database. Users may either query the results for fast, high-concurrency reads, or subscribe to changes for pure event-driven architectures.

> **“We believe in a future where the default for developers and data teams will be working with data in real-time,” said Arjun Narayan, CEO of Materialize. “The availability of this streaming database platform will help accelerate a migration from batch to real-time in the same way that we saw an enormous shift from on-premises infrastructure to the cloud. Materialize enables companies to not just be data-driven, but to be event-driven, and we provide a critical building block in the creation of these event-driven businesses. If you need to build something real-time, you should build with Materialize first.”**

For more information [read more](https://materialize.com/blog/next-generation/?utm_source=media&utm_medium=release&utm_campaign=octrelease) in the accompanying blog post, and to get early access to the Materialize Distributed Streaming Database, visit the Materialize web site[ here](http://www.materialize.com/).

**About Materialize**
Materialize is a cloud-native streaming database purpose-built to enable the world's most innovative companies to operate with the best data available at all times. Materialize reduces the cost, and complexity of working with real-time data by presenting as a Postgres database and supporting full ANSI SQL, all while delivering capabilities previously only found in batch-based systems. Materialize is headquartered in New York and backed by leading venture capital firms including Kleiner Perkins, Lightspeed Venture Partners, and Redpoint Ventures. For more information visit[ www.materialize.com](http://www.materialize.com/) or follow us on Twitter at @MaterializeInc.
