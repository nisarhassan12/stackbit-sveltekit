---
layout: CustomerStory
label: Kepler
date: '2021-10-26'
eyebrow: From Batch to Streaming for Real-Time Algorithmic Trading
title: >-
  How Financial Services firm Kepler Cheuvreux uses Materialize for Real-Time
  Computation, Monitoring, and Alerting
excerpt: >-
  Kepler Cheuvreux streamlined their architecture into just Materialize and
  Kafka, removing Postgres replicas. With timely data being vital to their
  business, they replaced batch jobs with streaming workloads. They also enabled
  real-time alerting and dashboarding in Metabase and Grafana, having
  Materialize serve as the underlying source of information.
logo: /images/logos/kepler.svg
squareImage: >-
  https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/kepler-square.webp
image: >-
  https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/kepler-horizontal.webp
sidebar:
  - heading: At a Glance
    subheading: >-
      Kepler Cheuvreux is a leading independent European financial services
      company that specialises in Research, Execution, Fixed Income & Credit,
      Structured Solutions, Corporate Finance and Asset Management. The group
      employs around 600 people and is present in 13 major financial centres in
      Europe and the US. With €2bn of equities traded daily on average, Kepler
      Cheuvreux uses a set of real-time algorithms to execute trading strategies
      at scale.
  - heading: Industry
    subheading: Financial Services
  - heading: Data Volume
    subheading: >-
      Kepler Cheuvreux generates hundreds of millions of events per second. The
      firm typically exceeds the limits of a regular database and will exceed a
      billion data points per day soon.
  - heading: Challenges
    subheading: >-
      Kepler Cheuvreux’s previous architecture relied on batch data, but was
      slow to refresh intra-day. With a join-heavy workload, Kepler Cheuvreux
      needed a streaming tool that could perform complex joins efficiently. The
      Algo Quant team was also looking to reduce database load without
      sacrificing SQL semantics and correctness.
  - heading: Use Cases
    subheading: >-
      Kepler Cheuvreux uses Materialize for real-time computation, monitoring,
      alerting, and deriving actionable intelligence. Each of these simplify and
      modernize their real-time analytics architecture focused around their
      algorithmic trading engine. In the near future, Kepler Cheuvreux will
      utilize Materialize for real-time machine learning models.
  - heading: Results
    subheading: >-
      With Materialize, Kepler Cheuvreux streamlined their architecture into
      just Materialize and Kafka, removing Postgres replicas. With timely data
      being vital to their business, they replaced batch jobs with streaming
      workloads. They also enabled real-time alerting and dashboarding in
      Metabase and Grafana, having Materialize serve as the underlying source of
      information.
---

## Kepler Cheuvreux: A Data-Forward Financial Services Company

Kepler Cheuvreux is a big consumer and producer of massive amounts of real-time data. The firm generates hundreds of millions of events per second. While they would not describe their workload as "Big Data" yet, it typically exceeds the limits of a regular database and will exceed a billion data points per day very soon as more sources and algorithms are added to the platform.

## Future-proofing an Algorithmic Trading Platform

Jean-Francois Perreton joined Kepler Cheuvreux as the Head of the Algo Quant team in 2017, with more than 15 years of experience in the financial services sector. He is primarily responsible for the management of the company's algorithmic trading platform -- including its recent overhaul.

Kepler Cheuvreux was looking to simplify and future-proof their real-time analytics architecture. They set out to find a common middleware that the organization could use -- and initially moved forward with Apache Kafka. While the firm was able to push massive amounts of data into Kafka for consumption and computation, they quickly realized that they needed to extract more value from the data. How could they derive insights and perform analytics in real-time, instead of running batch processes at the end of the day?

"_This is how we started the journey of thinking, Okay, we need a database -- because you cannot just go and query Kafka like you would with a regular database,_" detailed Jean-Francois. "_We didn't want to replicate all the data that is in Kafka into a database because it's extremely inefficient. The problem we had is there is no such thing as SQL on Kafka -- rather, there was no such thing._"

## Moving to Streaming SQL with Materialize

Jean-Francois started working with Materialize in 2020, using the technology to help out in redesigning their algorithmic trading platform without moving away from years of SQL semantics that had been established at Kepler Cheuvreux. According to Jean-Francois, "_I started exploring SQL streaming and reviewed the set of those technologies. We tried all of them before finding Materialize. Most other solutions come out of distributed systems and are designed before they add the SQL layer on top -- and typically you only get part of SQL. Complex SQL is never going to work. Simple stuff might, but even if it does, you have big overhead in terms of complexity._"

Materialize easily processes streaming datasets and enables complex analytics using standard SQL. The platform delivers incrementally-updated materialized views, which produce always-correct results even when the underlying data changes rapidly-- accelerating development of internal tools, interactive dashboards, and customer-facing experiences.

## The Benefits of Standard SQL for Streams

Kepler Cheuvreux was already a heavy user of Postgres, and Materialize's ability to offer JDBC drivers and a regular PostgreSQL facade was key in integrating with their ecosystem of tools. As Jean-Francois described: "_Materialize directly integrates with our third-party applications, BI tools, you name it. It's really SQL._"

As Materialize uses standard SQL, the Kepler Cheuvreux team was also able to migrate existing queries without any changes. As Jean-Francois explained the difference, "_We didn't need to learn a new language with Materialize. Many other tools come with another programming language on top, which sometimes is branded like SQL, but it's not SQL -- or sometimes it's a completely different thing. A lot of systems force you to define the SQL that you want, which is pre-compiled and that's it. In real-time, there's nothing you can change until you rebuild your application and recompile your SQL. Materialize is not like this._"

<QuoteBlock text="Once we found Materialize we were very happy because it was proper SQL and we actually are big users internally of Postgres already. One of the biggest selling points of Materialize was the fact that it offers JDBC drivers and a regular PostgreSQL facade, if you want. So it directly integrates with our third-party applications, BI tools, you name it" attribution="Jean-Francois Perreton" />

## Interactive Exploration of Streaming Data with Materialize

Kepler Cheuvreux's typical workflow required active data exploration as users often didn't know what they were looking for. A client or a trader may raise an issue around a particular order not behaving in the expected way, and it was the analyst's responsibility to determine the cause of the problem. With only Kafka in place, the team had to extract and go through every single message to diagnose these issues -- while in practice, only a limited number of messages from a specific time window or pattern would be relevant.

Initially, the team offloaded the events to a database, running a JDBC connector between Kafka and Postgres. However, given the speed and data volumes Kepler Cheuvreux required, this approach quickly reached its limits. "We try to be smart around indexing, and we use all the tools to optimize Postgres for real-time, but essentially they all break when we are around 10,000 inserts per second," said Jean-Francois. "_It's just too fast for regular tools. It's too much data._"

As an alternative approach, the Kepler Cheuvreux team looked into how they could interactively run SQL queries directly on top of Kafka. Materialize connects to a wide number of data sources -- including streaming sources like Apache Kafka or Amazon Kinesis, and other sources like S3, local files, or directly to Postgres databases. This modified workflow was a major improvement, according to Jean-Francois. "_Being able to explore that data downstream is where Materialize has really brought value for us. We were able to just completely get rid of Postgres...it's just Materialize and Kafka for that workflow. That's amazing._"

## Using Complex Streaming Joins in Materialize to Simplify Workflows

A common Kepler Cheuvreux trading workflow involves breaking up a parent order from a client, into smaller chunks that provide better prices and reduce the impact of market fluctuations. Kepler Cheuvreux uses custom trading models to facilitate the timing and size of such orders and obtain the best liquidity. Every decision and calculation go into a Kafka topic. Multiple Kafka topics need to be combined in order to analyze algorithmic performance. By combining multiple Kafka topics using multi-way joins in a single materialized view, Materialize simplifies this workflow for Kepler Cheuvreux's trading teams.

Unlike other stream processing tools that are limited to basic joins, if any, Materialize brings a broad range of join capabilities found in traditional database systems to streaming data. This includes inner, left (outer), right, full and cross joins, multi-way joins, and lateral joins.

Lateral joins in Materialize provide a great way to automatically turn SQL prepared statements into high-throughput, data-driven, maintained views. For example, to pull out a particular order, the Kepler Cheuvreux team creates a table with a particular Order ID -- which is empty at the beginning of the day. A [lateral join](https://materializestg.wpengine.com/lateral-joins-and-demand-driven-queries/) is then created between that table and a view that the team intends to materialize later. As soon as another value for Order ID is inserted into the table, the view gets populated automatically, with the relevant data in real-time. This allows the team to instantly get the data that they need to explore, until they discover the actual query that's needed to diagnose an issue. What's more, lateral joins in Materialize save precious engineering time by avoiding the need to create any complex microservices.

<CTABlock />

## Joining Streaming and Reference Data for Comprehensive Analysis

Kepler Cheuvreux's use cases for joining data are not just limited to Kafka topics. There are a host of different metrics that the team investigates, such as, the number of street orders sent or the average price of a particular execution, which require complex join capabilities. The statistics are built in real-time, but the process of breaking them down on a per-order basis relies on a lot of 'static' data that may only change once or twice a day. Both forms of data -- streaming and reference -- need to be combined for a more complete analysis.

As an example, the team may choose to break down an execution per order, but also choose to aggregate on a per market basis or some other classification that is missing in the Kafka topic. The additional data that is needed to visualize or perform conditional averages, typically lives in a Postgres database. Since Materialize is Postgres wire-compatible, it is very easy to connect to a Postgres source through Change Data Capture (CDC). In other words, as data changes in Postgres, you can wire it directly to Materialize and keep materialized views updated in real-time. This is useful for speeding up queries in an overloaded database, or building event-driven applications.

When static datasets change (albeit infrequently), Materialize is prepared to react. As Jean-Francois described, "_With Materialize, we have the ability to source from a Postgres database, and then we're able to combine with a source from Kafka into a materialized view by joining data. Essentially you're streaming Postgres differences into Materialize, and then we can just address it like any other stream. You don't need to have batch jobs to react and insert data into Materialize. It really makes our lives easy._"

## Building Real-Time Analytics Dashboards with Materialize

Kepler Cheuvreux has a number of different dashboards and event-driven use cases that are a key use case for Materialize. As an example, incrementally-updated materialized views expose problematic orders that get picked up by Grafana, which analyzes the time series of orders and raises alerts. According to Jean-Francois, "_The source for Grafana in this case is Materialize. Materialize allows us to find interesting patterns. Whether they're good or bad, we can catch them and raise alerts, which get to us on different mobile solutions, email, chat, and things like that._"

The team also has dashboards established in Metabase for business insights and performance analysis in real-time, with Materialize serving as the underlying source of information. Since Materialize presents to downstream tools like any Postgres database, it simplifies the development of custom applications and the process of connecting existing data analysis tools.

"_It's really cool because at the end of the day, Materialize is picked up by every other tool we're using -- whether we are analyzing orders, raising alerts, or looking at performance numbers,_" said Jean-Francois, describing Materialize's ease of integration. "_Materialize became central to expose Kafka as just like any regular SQL database to all the downstream applications._"

<QuoteBlock text="Materialize became central to expose Kafka as just like any regular SQL database to all the downstream applications." attribution="Jean-Francois Perreton" />

## What's Next: Real-Time Machine Learning Models

As Materialize continues to work with Kepler Cheuvreux, Jean-Francois sees the platform as a data enhancement engine for machine learning models. One of the most challenging aspects of moving machine learning to production is ensuring that training data is consistently pre-aggregated across different models. The team sees Materialize as a potential middle layer that can then broadcast these pre-aggregations downstream to Kafka for consistent usage across deployment.

Powered by Timely Dataflow and Differential Dataflow, Materialize offers real-time computation that is correct, not just eventually consistent. In practice, downstream systems can rely on computations for accuracy -- critical for training ML models. As Jean-Francois described, "_I think that's a major benefit of having this middle layer that guarantees the consistency of aggregation._"

Working with Materialize, Jean-Francois described, *"We know we don't need any downstream database and we can save on disk space. The beauty of Materialize is that it also scales. We could just increase the number of CPUs that are used on a per-instance basis and we can increase RAM -- but in terms of complexity, it remains one process for us. It's very helpful for us to manage complexity.*"

Materialize is a streaming database for real-time analytics. Materialize simplifies how developers build with real-time data, using incremental computation to provide low latency, correct answers - all using standard SQL. With nearly a decade of technical research behind it, Materialize was launched to address the growing need for the ability to build real-time applications easily and efficiently on streaming data so that businesses can obtain actionable intelligence from streaming data.

We encourage you to try us out by [signing up for Materialize](https://materialize.com/register/) or [join](https://materializecommunity.slack.com/join/shared_invite/zt-ljdufufo-PTwVPmgzlZtI7RIQLDrAiA#/shared-invite/email) the discussion in our Community!
