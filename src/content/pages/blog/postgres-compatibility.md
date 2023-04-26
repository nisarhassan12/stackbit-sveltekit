---
layout: Post
title: How and why is Materialize compatible with PostgreSQL?
description: >-
  As a streaming database, Materialize is fundamentally different on the inside,
  but it's compatible with PostgreSQL in a few important ways.
date: '2022-10-18'
people_refs:
  - andy-hattemer
image: https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/streaming-tail.webp
category: Key Concept
---

We often say Materialize "presents as Postgres" or that it's "Postgres wire-compatible" and (understandably) sometimes we get asked what that means.

<!-- :::note{.attention} -->
For context, Materialize is a streaming database used to build low-latency data applications.
While we present as Postgres externally, the insides are completely different:
Instead of using a query engine to compute point-in-time results, Materialize uses a streaming framework (Differential Dataflow) to continually and incrementally maintain query results. This means Materialize users can write complex SQL joins and aggregations that would take down their production DB and get low-latency reads on results that are always up-to-date.

If you're interested in learning more, start with the [Materialize intro](https://materialize.com/docs/overview/) in our docs.
<!-- ::: -->

There is no official criteria for Postgres compatibility, but it tends to take one of two routes:
Some new cloud databases like [Neon](https://neon.tech) and [AlloyDB](https://cloud.google.com/alloydb) strive to provide the exact same functionality and features of PostgreSQL and claim **full PostgreSQL compatibility.** Other databases (Materialize included) mainly want to make their systems more familiar and usable, and gain connection to the ecosystem of tooling already written for Postgres, these tend to use the term: **Postgres wire-compatible.**

There's a lot of gray area in Postgres wire-compatiblity, though, so to clear it up we'll talk about the details of Materialize Postgres Compatibility in two parts:

1. [**Materialize is PostgreSQL wire-compatible**](#1-postgresql-wire-compatibility)
2. [**Materialize aims for SQL consistency with PostgreSQL**](#2-postgresql-syntax-consistency)

<!-- :::note{.info} -->
For completeness, Materialize also **integrates** with PostgreSQL by **reading from the write-ahead log (WAL).** Essentially acting as a PostgreSQL read-replica. You can read about that in the [Materialize PostgreSQL Integration Docs](https://materialize.com/docs/integrations/cdc-postgres/).
<!-- ::: -->

## 1. PostgreSQL wire-compatibility

Materialize speaks Postgres wire protocol. You don't need custom drivers or SDKs to work with Materialize, just use Postgres drivers!

<!-- ![Materialize communicates via the Postgres wire protocol](/images/postgres-compatibility-wire-protocol.svg) -->

Every database needs a protocol to standardize communication with the outside world.
PostgreSQL has done a great job of implementing and documenting its own [Postgres Frontend/Backend Network Protocol](https://www.postgresql.org/docs/current/protocol.html).
The openness of its protocol, and the popularity of Postgres itself, led to a flourishing ecosystem of drivers, client libraries and tools that can manage, write to, and read from PostgreSQL databases.
The integration ecosystem itself now acts as a strong incentive for new databases to adopt Postgres wire protocol.

Materialize has other non-Postgres data input/output protocols like the [Sources](https://materialize.com/docs/overview/key-concepts/#sources) and [Sink](https://materialize.com/docs/overview/key-concepts/#sinks), but all management and all querying happens via Postgres wire protocol.

Almost any software that integrates with PostgreSQL can be pointed at Materialize and will know how to write, read and manage data without modification or custom code. Selfishly, this also means Materialize doesn't have to maintain client libraries and drivers. Just use the PostgreSQL ones, they've had years of real-world production usage.

### Benefits

By presenting as PostgreSQL, Materialize gets a massive number of mature and well-maintained integrations out of the box.

- Every language has existing [drivers that work well with Materialize](https://materialize.com/docs/integrations/#libraries-and-drivers), many frameworks integrate too.
- [DB Management tools and IDEs](https://materialize.com/docs/integrations/#database-management-tools) integrate with Materialize
- [Business Intelligence tools](https://materialize.com/docs/integrations/#business-intelligence-bi) like Metabase, Tableau, and Looker
- [New Data SaaS Tools](https://materialize.com/docs/integrations/#data-collaboration) like [Hex](https://hex.tech), [Cube.js](https://cube.dev) extend what you can build with Materialize.

### Limitations

Some tools like ORMs send configuration or introspection queries behind the scenes when they're told they're connecting to Postgres.
These are often queries to `pg_catalog`.
Materialize has not yet implemented the full range of `pg_catalog` features, so certain tools that rely on these will fail.
The status of the most often requested integrations is tracked [here](https://materialize.com/docs/integrations/).
If an integration you need is not listed on the page, file a [feature request](https://github.com/MaterializeInc/materialize/issues/new?assignees=&labels=A-integration&template=02-feature.yml), and we'll follow up.

## 2. PostgreSQL syntax consistency

Materialize uses an ANSI-standard (ANSI 92) SQL implementation similar to many other SQL databases.
More specifically, Materialize aims for consistency with PostgreSQL.

### Common Syntax between Materialize and PostgreSQL

Materialize has substantial coverage of PostgreSQL [functions, operators](https://materialize.com/docs/sql/functions/) and [data types](https://materialize.com/docs/sql/types/), for this shared SQL syntax, our rationale is:

> The same valid SQL, when given the same valid inputs, should produce the same outputs in Materialize and PostgreSQL.

This principle is useful for improved UX and SQL portability, but it also helps us with testing.
We use multiple automating testing approaches, including one ([pgtest](https://github.com/MaterializeInc/materialize/blob/main/doc/developer/guide-testing.md#pgtest)) that uses Postgres as a "trusted oracle" and checks that the same inputs and SQL produce the same outputs between PostgreSQL and Materialize.

<!-- :::note{.success} -->
**Side Note:** Our engineering team's "output diffing" workflow actually led to the discovery and resolution of PostgreSQL bugs.

If you're working with temporal data in PostgreSQL, chances are you've used the `INTERVAL` function.
Interval input values near the maximum acceptable inputs could cause overflows and fail or return bogus results.
You can test this yourself by running `select interval '0.5 months 2147483647 days';` ([db-fiddle link](https://www.db-fiddle.com/f/ijT76fsmL99bHvXxhAtf7j/0)) in PostgreSQL 14 or older.

The same engineer who discovered the bug was able to contribute the fix and it's already live in PostgreSQL 15.
You can read more about the bug on the commit message [here](https://git.postgresql.org/gitweb/?p=postgresql.git;a=commit;h=e39f9904671082c5ad3a2c5acbdbd028fa93bf35).
<!-- ::: -->

There are instances where fundamental differences in the engine (Differential Dataflow) powering Materialize result in subtle differences in the SQL layer, for example: [ all `numeric` types in Materialize have a precision of 39](https://materialize.com/docs/sql/types/numeric/#scale). But overall, we are committed to ensuring there are no Postgres-Materialize SQL differences that materially degrade the system's usability.

### PostgreSQL syntax not implemented in Materialize

Some parts of PostgreSQL will likely never be implemented:

- **Non-Deterministic Functions** like [`random()`](https://www.postgresql.org/docs/current/functions-math.html#FUNCTIONS-MATH-RANDOM-TABLE) devolve into chaos when used in a continually running query.
- **Certain Aggregate/Window Functions** where one input change forces a complete recalculation of output, like [`percentile_cont()`](<https://www.postgresql.org/docs/9.4/functions-aggregate.html#:~:text=percentile_cont(fraction)%20WITHIN%20GROUP%20(ORDER%20BY%20sort_expression)>) _(the aggregate function used in Postgres to get median-like metrics)_.

If there's other PostgreSQL syntax that would be useful in Materialize and is not implemented, it's likely either in progress or logged as an [open issue](https://github.com/MaterializeInc/materialize/issues?q=is%3Aopen+is%3Aissue+label%3AA-sql+label%3AC-feature), if not please let us know!

### New Syntax in Materialize

There are a few areas where we added SQL commands, functions, and data types to better serve new Materialize capabilities:

- **New Objects** - Materialize added a [`SOURCE`](https://materialize.com/docs/overview/key-concepts/#sources) object for continuous data input streams from Kafka and Postgres, [`SINK`](https://materialize.com/docs/overview/key-concepts/#sinks) is the counterpart for data output. [`SUBSCRIBE`](https://materialize.com/docs/sql/subscribe/) is a continuously running alternate to `SELECT`.
- **New Functions** - [`mz_now()`](https://materialize.com/docs/sql/functions/now_and_mz_logical_timestamp/) is a function similar to `now()`, but it runs continuously, giving users the ability to create useful [temporal filters](https://materialize.com/docs/sql/patterns/temporal-filters/).

Keep in mind that despite the differences called out above, the vast majority of SQL syntax is shared between Materialize and Postgres. This has a few benefits:

<!-- - **SQL portability** - Existing SQL queries and patterns can be ported to Materialize without rewrites, and without concern of unexpected changes in computations.
- **Familiarity/Maintainability** - How many variations of SQL can people really be expected to hold in their head? By replicating PostgreSQL syntax, if you know how to parse a date in PostgreSQL, you know how to parse a date in Materialize.
- **Reliability** - reduce the incidence of incorrect computation by using PostgreSQL as a "trusted oracle" -->

## Conclusion

The core principle of both the above aspects of Postgres compatibility is **accessibility**: We've made Materialize present as PostgreSQL to simplify real-time architectures, to put stream processing in the hands of more developers, and to help Materialize connect with a broader ecosystem of tools. If you have any ideas or questions about compatibility, [join us in the community](https://materialize.com/s/chat), we're always looking for ways to make Materialize more usable!
