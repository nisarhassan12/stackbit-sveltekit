---
layout: 'Guide'
title: 'What is a Streaming Database?'
date: '2023-01-04'
last_reviewed: '2023-01-04'
category: 'Key Concept'
image: 'https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/Why-Use-Materialized-View.webp'
people_refs:
  - andy-hattemer
description: 'Get an overview of how streaming databases differ from traditional DBs. What are the tradeoffs? How are they used?'
---

<!-- :::note{.info} -->
[Materialize](/) is a streaming database that data and software engineering teams use to build apps and services where data must be processed
and served at speeds and scales not possible in traditional databases.

This article focuses on the category definition of **modern streaming databases**, but you can find out more about Materialize in [the docs](https://materialize.com/docs/overview/).
<!-- ::: -->

A streaming database uses the same declarative SQL and the same abstractions (tables, columns, rows, views, indexes) as a traditional database, but has a completely different engine (a stream processor) and computing model (dataflows) inside.
The result: A data platform that is familiar to work with, but provides fast continuous data transformation capabilities not possible in traditional databases.

Broadly speaking, a streaming database is an inversion of the traditional database:

In traditional DBs, data is stored in tables matching the structure of the writes (inserts, updates) and all the computation work happens on read queries (selects).

<InlineSvg title="Traditional Database Model of work" name="traditional-database-model-of-work" caption="Try clicking the [Write] and [Read] buttons to see how they work." />

A streaming database moves the work to the write side:
Instead of just storing data on writes, a streaming database asks for the queries upfront (in the form of [Materialized Views](/guides/materialized-views/)) and [incrementally updates](/guides/incremental-computation/) results as input data arrives.

<InlineSvg title="Streaming Database Model of work" name="streaming-database-model-of-work" />

The shift in computation model is made possible by using a stream processor as the engine.

The resulting user experience: Streaming Databases serve results with sub-second latency for the same kinds of complex SQL joins, aggregations, and transformations that either don't scale in transactional databases or take hours to run overnight in analytical databases. There are, of course, some major performance and capability trade-offs. The rest of this article covers those, as well as origins of streaming databases and common use cases.

## Origins

Streaming Database concepts first emerged in the capital markets vertical, where the value of fast computation over continuous data is highest. The first products like [StreamBase](https://www.tibco.com/resources/datasheet/tibco-streambase) and [KX System](https://code.kx.com/platform/stream/) were more "event processing framework" than database. They optimized for the unique requirements within hedge funds and trading desks over universality and accessibility.

But from the beginning, creators of streaming data processing tools were aware that SQL works just as well as the declarative language for streaming data as it does for traditional static databases.

Take a query like:

```sql
-- Sum revenue by product category
SELECT categories.name as category, SUM(line_items.amount) AS total_revenue
FROM purchases
JOIN line_items ON purchases.id = line_items.purchase_id
JOIN products ON products.id = line_items.product_id
JOIN categories ON product.category_id = categories.id
WHERE purchases.is_complete
GROUP BY 1;
```

This is valid [streaming SQL](/guides/streaming-sql/). It contains all the info a streaming database needs to provide a continually updated set of results. SQL doesn't care whether the data is static or actively updating.

Early streaming DB tools implemented SQL-like control languages. In StreamBase, resources were created with DDL statements like `CREATE INPUT STREAM`. But the SQL was just surface-level, users still needed to be streaming systems experts first and foremost.

The second generation of tools like [ksqlDB](https://ksqldb.io/) and [Flink](https://flink.apache.org/) took the SQL control layer implementation further, allowing users to define transformations in SQL.
But, users coming from databases still had a lot of challenging streaming concepts to work around, like [eventual consistency](https://materialize.com/blog/eventual-consistency-isnt-for-streaming/).

Modern streaming databases (like [Materialize](/)) focus on expanding access to _(and therefore applications of)_ streaming computation by simplifying the control interface to the extent that it can be operated by anyone familiar with traditional databases.

## Example Architectures

Today, streaming databases most often used "downstream" of primary transactional databases and/or message brokers. This is similar to how a Redis cache or a data warehouse might be used.

### Data Engineering

Here's a representative architecture of a streaming database used by data engineering teams:

<InlineSvg title="Example Streaming Database Data Engineering Architecture" name="streaming-database-data-engineering-architecture" />

Some important aspects to call out:

1. A message broker like Kafka is used to reliably and continuously feed streams of data into the database.
2. A Change Data Capture (CDC) service translates primary DB updates into structured data messages in Kafka.
3. Like in data warehouses, the SQL transformations are managed in dbt.
4. Downstream architecture is more flexible than data warehouses, user-facing applications and internal tools can connect directly to the streaming database without the need for caching.

### Application Engineering

In the architecture below, a standard web/mobile application stack with a PostgreSQL DB is supplemented by a streaming database that reads in a change feed of updates from the primary DB via change data capture and Kafka.

<InlineSvg title="Example Streaming Database Application Architecture" name="streaming-database-architecture-applications" />

Some notes to call out for the application engineering use case:

1. The Streaming database plays a role similar to a traditional read-replica DB. It connects directly to the primary transactional DB via replication slot, and the application layer routes certain read queries to it.
2. The API layer can [subscribe to updates of query results](https://materialize.com/blog/subscribe-to-changes-in-a-view-with-tail-in-materialize/) in the streaming database, enabling push-centric data architectures.

<CTABlock heading="Get started with a Streaming Database" backgroundStyle='bg-white bg-opacity-100' subheading='Register for early access to see if Materialize fits your use-case.' />

## Trade-offs

With experience in software engineering comes the realization that no tooling or software stack is magical.
Everything is a series of trade-offs that may be better or worse aligned with the needs of a specific use-case.
With that in mind, let's examine the specific trade-offs inherent to streaming databases so that we can better understand the use cases they align best with.

### Features

**Features unique to streaming databases:**

- **Incrementally updated materialized views** - _on arbitrarily complex SQL._ Other databases like Oracle, SQLServer, even Redshift have varying levels of partial support for incrementally updating a [materialized view](/guides/materialized-views/). They could continue to expand support, but will continue to hit walls on fundamental issues of consistency and throughput as long as they approach it with their "one-shot query" computation engines. Streaming Databases build on entirely different [dataflow](https://en.wikipedia.org/wiki/Dataflow_programming) paradigms, and as a result, shift limitations elsewhere and efficiently handle incremental view maintenance on a broader SQL vocabulary.
- **True streaming inputs** - Because they are built on stream processors, streaming databases are optimized to process continuous streams of input data (e.g. messages from Kafka) individually. In traditional databases (especially OLAP data warehouses) larger, less frequent batch updates are more performant, so scaling streaming inputs involves batching them into larger transactions, slowing down data and losing granularity.
- **Streaming outputs on queries** - Many databases have some form of streaming output (e.g. the Postgres WAL) but what's missing is output streams involving any kind of data transformation. Streaming databases allow for streaming output of complex joins, aggregations, computations expressed in SQL.
- **Subscribe to changes in a query** - As a side effect of streaming outputs, streaming databases can efficiently support subscriptions to complex queries: Updates can be pushed to connected clients, instead of forcing inefficient polling. This is a key building block for pure event-driven architectures.

**Features missing in streaming databases:**

- **Columnar optimization** - OLAP databases have advanced optimization techniques to speed up batch computation across millions of rows of data. There is no equivalent in streaming databases, because the focus is on fast incremental updates to results prompted by a change to a single row.
- **Non-deterministic SQL functions** - Non-deterministic functions like `RANDOM()` are common and straightforward in traditional databases. But imagine running a non-deterministic function continuously, the result is chaotic noise. For that reason, Streaming Databases don't support non-deterministic SQL functions like `RANDOM()`

### Performance

**Performance Gained:**

- **Minimized time from input update to output update** - The time between when data first arrives in the streaming database (input) and changes to results reflect the change (output) is sub-second. Additionally, it doesn't slow down as the dataset scales because results are incrementally updated.
- **Repeated Read Query Response Times** - When a query or query pattern is known and pre-computed as a persistent transformation, reads are fast because they require no computation: You're just doing key-value lookups in memory, similar to a cache like Redis.
- **Aggregations** - The resources needed to handle persistent transformations is often proportionate to the number of rows in the output, not the scale of the input. This can lead to dramatic improvements in performance in aggregations in a streaming DB vs a traditional DB.

**Performance Sacrificed:**

- **Ad-Hoc Query Response Times** - While it is sometimes possible to run ad-hoc queries in a streaming database, response times will be an order of magnitude slower because the computation plan is optimized for continuously maintaining results, not answering point-in-time results.
- **Window Functions** - A window function performs a calculation across a set of table rows that are somehow related to the current row. They are less performant in streaming databases because an update to a single input row can necessitate updates to every output row. For example, consider a `RANK()` window function that ranks output by a computation. A single update (resulting in a new #1 ranked item) can force an update to every row in the output.

### Scalability

Major factors that impact scalability in a streaming database:

1. **Throughput of changes** - The changes or updates to input data is what triggers work in the system, so data that is changing often will require more CPU than data that changes rarely.
1. **Cardinality of dataset** - The total number of unique keys will slow down read queries in traditional databases. In streaming databases, high-cardinality increases the initial "cold-start" time when a persistent SQL transformation is first created, and requires more memory on an ongoing basis.
1. **Complexity of transformations** - Unlike the on-request model in a traditional DB, SQL transformations are always running in a streaming database. This has an impact on scale in two ways:
   1. Memory required to maintain intermediate state - Imagine how you would incrementally maintain a join between two datasets: You never know what new keys will appear on each side, so you have to keep the entirety of each dataset around in memory. This means that joins over large datasets can take a significant amount of memory.
   1. Quantity and complexity of transformations - When a single change in inputs needs to trigger a change in outputs in many views, or when there are many layers of views that depend on each other, more CPU is needed for each update.

Factors that _don't_ impact scalability:

1. **Frequency of reads from (arbitrarily complex) materialized views** - Complex queries that include joins and aggregations are handled as persisted computation, so high volumes of reads, spikes, and high concurrency have minimal impact on streaming databases.

## Use Cases

Like any software primitive, use cases are many and varied, but here are some categories of products and services with requirements particularly well-suited to streaming databases:

- **Real-Time Analytics** - Use the same ANSI SQL from data warehouses to build real-time views that serve internal and customer-facing dashboards, APIs and apps.

- **Automation and Alerting** - Build user-facing notifications, fraud and risk models, and automated services using event-driven SQL primitives in a streaming database.

- **Segmentation and Personalization** - Build engaging experiences with customer data aggregations that are always up-to-date: personalization, recommendations, dynamic pricing and more.

- **Machine Learning in Production** - Power online feature stores with continually updated data, monitor and react to changes in ML effectiveness - all in standard SQL.

## Conclusion

The goal of streaming databases is to use familiar SQL DB concepts to make powerful stream processing capabilities more accessible to data teams and software teams.
The key technological difference is the engine used to compute SQL transformations: A stream processor instead of a traditional query engine.
With this technology change comes significant changes to capabilities and performance.
The result: Small software teams can lean on a streaming database to ship products with previously impossible or unscalable technical requirements around data transformation.

<CTABlock heading="Get Early Access to Materialize" subheading="Ready to try a modern streaming database? Register for access to Materialize to get started." backgroundStyle='bg-white bg-opacity-100'  />
