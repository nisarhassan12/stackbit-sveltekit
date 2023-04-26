---
layout: 'Guide'
title: 'What is Streaming SQL?'
date: '2020-02-26'
last_reviewed: '2020-03-24'
category: 'Key Concept'
image: 'https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/what-is-streaming-SQL.webp'
people_refs:
  - andy-hattemer
description: "Get a high-level overview of what Streaming SQL means, why it's useful, how it's being used in the real world, and how you can start using it yourself."
---

### Summary

**Streaming SQL** is about taking the same declarative SQL used to write database queries, and instead **running it on streams of fast-changing data**.

This is useful because:

1. Data is often more valuable when you can act on it quickly
2. The existing tools for deriving real-time insights from streams are too complex.

The "declarative" nature of SQL plays an important role in addressing the second point because it allows the user to focus on **WHAT** they want, and lets the underlying engine worry about **HOW** it gets done.

In the real world, Streaming SQL is used to:

- Enable new internal and customer-facing insights, automation, and applications
- Increase value of business intelligence data by providing a single up-to-date source of truth for key metrics
- Simplify microservices by replacing code doing data coordination and transformation

## What is streaming SQL?

Let's start by being specific about what we mean when we say **streaming** and **SQL**.

### Streaming (event streams)

Streaming refers to message brokers like Kafka, Kinesis, or Pulsar that handle data as a **continuous stream of events or messages**.

Event streams handle everything from transactions to user actions on sites or mobile apps, IoT sensor data, metrics from servers, even activity on traditional databases via [change data capture](https://materialize.com/change-data-capture-part-1/).

### SQL

In the context of streams, SQL gives users a declarative language for:

- Creating **views** that join, filter, and group the raw data from the stream into more useful outputs ([`CREATE MATERIALIZED VIEW`](https://materialize.com/docs/sql/create-materialized-view/))
- Selecting data from sources and views ([`SELECT`](https://materialize.com/docs/sql/select/))

**NOTE:** The CREATE MATERIALIZED VIEW command is the core concept in streaming SQL. It comes from [databases](https://www.postgresql.org/docs/9.3/sql-creatematerializedview.html), where it's used to precompute the VIEW ahead of time in case the data changes. In streaming, the data is changing all the time, so queries are often more useful when maintained as materialized views.

Other common SQL verbs like INSERT, UPDATE, and DELETE have roles in streaming SQL, but for this article we'll focus on the core concepts of **reading** from streams, joining/filtering/transforming these streams, and making their outputs queryable or [writing out to a new stream](https://materialize.com/docs/sql/create-sink/).

### Differences between SQL on streams and databases

A soon as you try using SQL on streams, a few key differences become apparent:

#### Point-in-time vs continuous queries

Running a SQL query on a traditional database returns a static set of results from a single point in time.

Take this query:

```sql
SELECT SUM(amount) as total_amount FROM invoices;
```

When you run it, the database engine scans all invoices that existed **_at the time of_** the query and returns the sum of their amounts.

With streaming SQL, you **_could_** run the exact query above and get a point-in-time answer. But you're querying a stream of fast-changing data, and as soon as you've gotten the results back they're probably out-dated. In many cases a **query that continually updates itself** (a materialized view) is much more useful in a few ways we'll describe below.

To turn the query above into a materialized view, you'd write:

```sql
CREATE MATERIALIZED VIEW invoice_summary AS
  SELECT SUM(amount) as total_amount FROM invoices;
```

When you first create it, the SQL engine will process the entire history of invoice events it has access to up to the present, **_and then continue to update as new invoice events come through._**

#### Response time vs lag

Traditional databases have the concept of query response times: you run a query, some time elapses while the engine computes the results, and you get the response.

In streams the initial response time is only a factor when you first materialize a view. But there has to be some kind of time penalty in streaming results if we get a sudden surge of input events. That penalty is **time lag**: **_by how much time is the output trailing the input?_**

Like response times in traditional databases, most end-users won't need to think about time-lag in streaming systems, but knowing it exists helps to write and use streaming SQL in ways that avoid issues.

#### Different actions create work for the underlying engine

On the READ side, a traditional database engine idles until it receives a query, then it plans and optimizes it and gets to work providing the results. Once it responds with the results it idles again until it gets another query. **The sending of queries is what creates work for the engine.**

If you go back to the materialized view from above, **new data from the stream creates the work** for the engine. In Materialize, this approach is made possible by incremental computation: the work done to update the view is proportionate to the data coming in not the complexity of the query. We don't need to do a full re-scan of data to update the results.

This paradigm shift makes streaming SQL best for queries that ask the same question over and over again (e.g. dashboards, reports, automation, most application code) and not ad-hoc queries.

## Why is streaming SQL useful?

### 1\. Data is often most valuable when it first appears

There are two reasons for this, one obvious and one less so:

1. **Faster data = faster decisions** --- The stock market is a clear example of this idea taken to an extreme. ![Chart showing higher value for newer data](https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/108846387-81f3df00-75ac-11eb-8caa-f293b48bf54c.webp) But it also applies to SaaS businesses, verticals like Marketplaces, Travel, Events that need to make fast decisions about rates and inventory, retail and logistics where faster decisions can reduce inefficiency, etc...

2. **Data closer to its origin has fewer opportunities to be misinterpreted** --- Every step that data takes between where it's created and where it's used adds more potential for errors of the type where the end-user (person or machine) thinks the data represents something it does not. Time plays a role in this by forcing coordination around order of operations and alignment of work. In this case, switching to streaming data isn't better because it's faster, it's better because you no longer have to think about timing.

### 2\. SQL is a great means of deriving insights from streaming data

Here is another example of a materialized view on streaming events:

```sql
  CREATE MATERIALIZED VIEW experiments AS
   SELECT
     experiment_views.name,
     experiment_views.variant,
     COUNT(DISTINCT(experiment_views.user_id)) as unique_users,
     COUNT(DISTINCT(conversions.user_id)) as unique_conversions
   FROM experiment_views
   LEFT JOIN conversions ON
     conversions.user_id = experiment_views.user_id
     AND conversions.created_at > experiment_views.created_at
   GROUP BY experiment_views.name, experiment_views.variant;
```

- **The SQL is not unique to streaming** --- The meaning of data doesn't change when it moves from a stream to a database, so the way we query it shouldn't change either.
- **The declarative nature of it increases productivity** --- There are little or no optimization decisions for the developer to make, especially in comparison to the same task in code.

SQL has the added benefit of being a mature language built over three decades with an ecosystem of tooling and education around it. This means a much larger group of developers can work with streaming data and easily integrate it into the rest of their stack.

## Example use cases for Streaming SQL

Today, anyone already working with a message broker like Kafka can start using streaming SQL without significant effort. In the future as CDC software matures, that criteria will expand to "anyone with a database." Here are some examples of how streaming SQL is used:

### Business Intelligence and Analytics

When deciding "what is the best way to empower our internal teams to make intelligent decisions from data", Streaming SQL is one option to consider, with trade-offs that make it better for some cases than others.

In many cases, a materialized view on primary source data done in streaming SQL is a simpler [data pipeline](https://nchammas.com/writing/data-pipeline-materialized-view). In addition to the benefit of real-time data, businesses use this approach to side-step issues of:

- Coordination of time intervals and order of operations in batch processing
- Extended outages caused by bugs that are not fixable or testable until next batch run
- Slow-loading dashboards
- Inconsistency issues caused by caching, denormalization

See this walkthrough on [streaming SQL to a business intelligence dashboard](https://materialize.com/docs/demos/business-intelligence/) with Materialize for an example.

### Microservices

Streaming SQL is used to replace code doing complex data coordination and transformation in microservices.

An event stream like kafka is typically already a first-class citizen in microservice architectures. Engineers often find themselves building and maintaining complex applications consuming from kafka. For example: applications that read from an event log to produce insights and measurements on API usage for a SaaS application.

Any component of a microservice that looks like a query might be replaceable with streaming SQL.

This [Streaming SQL on Microservices example](https://materialize.com/docs/demos/microservice/) walks through a working demo using Materialize to produce billing data based on product events from a stream.

### Real-Time Applications

If the value of your application depends on your ability to deliver updates and data in real time, Streaming SQL may be an alternative to building an expensive or complex multi-component stack.

See [a simple and efficient real-time application](https://materialize.com/a-simple-and-efficient-real-time-application-powered-by-materializes-tail-command/) post for an example.

### New capabilities

1. **User-facing real-time analytics** - Previously, only tech behemoths like LinkedIn and Google had the scale and engineering teams to build user-facing real-time analytics (like LinkedIn's "Who has viewed your profile" page or Google Analytics' Real-time dashboard.) By lowering the complexity, streaming SQL opens magical real-time user analytics features up to more companies.
2. **Business Automation** - Once you have streaming SQL powering real-time dashboards, a natural progression is to begin making automated decisions on the same data. (For example: If your e-commerce site gets a spike in traffic from a particular source, add a promotion to the homepage.)

## Conclusion

Materialize provides a streaming SQL implementation that's unique in two important ways:

1. In Materialize, you write queries in postgres-compatible SQL. **_We think it's worth going through the extra effort to build this because only with this level of SQL-compatibility do you get the benefits of integrating with existing tools and removing the burden that the user understand advanced stream processing concepts._**
2. The query engine uses incremental computation ([Differential Dataflow](https://timelydataflow.github.io/differential-dataflow/)) to more efficiently maintain materialized views as new data comes in.

For more details on how it works, [read the docs](https://materialize.com/docs/overview/what-is-materialize/), [Download the Whitepaper](https://materialize.com/a-simple-and-efficient-real-time-application-powered-by-materializes-tail-command/#) or [join our Community Slack](https://materialize.com/s/chat) to discuss.

You can [start using Materialize](https://materialize.com/docs/get-started/) today.

#### References

- Inspiration for explaining the "WHY" behind streaming SQL from [Julian Hyde - Streaming SQL](https://www.youtube.com/watch?v=k8RIjuwqIds)
