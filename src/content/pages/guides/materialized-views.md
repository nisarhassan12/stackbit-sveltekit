---
layout: 'Guide'
title: 'What is a Materialized View?'
date: '2020-03-24'
last_reviewed: '2020-03-24'
category: 'Key Concept'
image: 'https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/Why-Use-Materialized-View.webp'
people_refs:
  - andy-hattemer
description: 'What is a materialized view, where can you use them, and how are they useful?'
---

Depending on how you work with databases, materialized views might mean different things (or nothing) to you. This article is meant to provide a general introduction to materialized views at a conceptual and practical level. The information below is not specific to [Materialize](https://materialize.com/), which is a Postgres-compatible streaming database that maintains materialized views.

## What is a view?

Let's first define regular views, and build up to materialized views:

View definition:

A view is a derived relation defined in terms of base (stored) relations. A view defines a SQL transformation from a set of base tables to a derived table; this transformation is typically recomputed every time the view is referenced.

You can think of a view as a saved query on your database. Future `SELECT` queries can reference the view by name.

### View Example

Imagine a database with two tables: `users` and `purchases`, here is the SQL statement (in PostgreSQL syntax) we use to create a view that summarizes user purchases:

```sql
CREATE VIEW user_purchase_summary AS SELECT
  u.id as user_id,
  COUNT(*) as total_purchases,
  SUM(purchases.amount) as lifetime_value
FROM users u
JOIN purchases p ON p.user_id = u.id;

```

As you can see, it's a select query with `CREATE VIEW [my_view_name] AS` prepended to it. Upon creating the view, the database doesn't compute any results or make any changes to how data is stored or indexed. But now queries can reference the view as if it were a table:

```sql
SELECT
  user_id
FROM user_purchase_summary
WHERE
  lifetime_value > 500;

```

Every time the database gets a query referencing a view, it needs to first compute the results of the view, and then compute the rest of the query using those results.

In almost all modern databases, you can also "stack" views: You can create a view that references another view.

## What is a materialized view?

A materialized view takes the regular view described above and materializes it by proactively computing the results and storing them in a "virtual" table.

Materialized View definition:

A view can be "materialized" by storing the tuples of the view in the database. Index structures can be built on the materialized view. Consequently, database accesses to the materialized view can be much faster than recomputing the view. A materialized view is like a cache --- a copy of the data that can be accessed quickly.

If a regular view is a saved query, a materialized view is a saved query plus its results stored as a table.

There are a few important implications of a view being "materialized:"

1.  When referenced in a query, a materialized view doesn't need to be recomputed. -- The results are stored, so querying materialized views tends to be faster.
2.  Because it's stored as if it were a table, indexes can be built on the columns of a materialized view.
3.  A new problem of "view maintenance" arises. -- Once a view is materialized, it is only accurate until the underlying base relations are modified. The process of updating a materialized view in response to these changes is called *view maintenance.*

### Should materialized views update automatically?

In practice: It would seem there is no consensus. Some databases have materialized views that must be manually refreshed. A few have implemented automatic updates, albeit with long lists of limitations. *See the [table below](https://materialize.com/what-is-a-materialized-view#how-do-materialized-views-work-in-specific-databases) for more details.*

In principle: Materialized views should update automatically. A "view" implies an anchored perspective on changing inputs. Think back to how regular views work: results are constantly changing as the underlying data changes. Materialization just implies that the transformation is done proactively.

In defining a materialized view, we have given the database all the information necessary to continually maintain the results as underlying data changes. Databases should keep materialized views updated by default, but this has so far proven impossible to deliver on.

## Materialized view example

Here is the `user_purchase_summary` view from before, turned into a materialized view:

```sql
CREATE MATERIALIZED VIEW user_purchase_summary AS SELECT
  u.id as user_id,
  COUNT(*) as total_purchases,
  SUM(CASE when p.status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_purchases
FROM users u
JOIN purchases p ON p.user_id = u.id;

```

In terms of SQL, all that has changed is the addition of the `MATERIALIZED` keyword. But when executed, this statement instructs the database to:

1.  Execute the SELECT query within the materialized view definition.
2.  Cache the results in a new "virtual" table named `user_purchase_summary`
3.  Save the original query so it knows how to update the materialized view in the future.

## How do materialized views work in specific databases?

Not every database supports materialized views, and those that do each handle them a little differently, especially when it comes to the approach to view maintenance.

<table role="table">
    <thead>
    <tr>
    <th>Database</th>
    <th>Materialized Views?</th>
    <th>View Maintenance</th>
    <th>Notes</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>PostgreSQL</td>
    <td><a href="https://www.postgresql.org/docs/9.3/rules-materializedviews.html" rel="nofollow">Yes, in v9.3+</a></td>
    <td>Manual</td>
    <td>Materialized views are populated at time of creation and must be manually refreshed via <code class="notranslate">REFRESH MATERIALIZED VIEW</code> statements that recompute the entire view.</td>
    </tr>
    <tr>
    <td>MySQL</td>
    <td>No</td>
    <td>N/A</td>
    <td></td>
    </tr>
    <tr>
    <td>Microsoft SQL Server</td>
    <td><a href="https://docs.microsoft.com/en-us/sql/relational-databases/views/create-indexed-views?view=sql-server-ver15" rel="nofollow">Yes</a></td>
    <td>Automatic</td>
    <td>SQL Server calls them "Indexed Views" because the materialization step is a matter of creating an index on a regular view. SQL Server limits indexed views to <a href="https://docs.microsoft.com/en-us/sql/relational-databases/views/create-indexed-views?view=sql-server-ver15#additional-requirements" rel="nofollow">basic SQL queries</a>.</td>
    </tr>
    <tr>
    <td>Oracle</td>
    <td><a href="https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_6002.htm" rel="nofollow">Yes</a></td>
    <td>Multiple Options</td>
    <td>Materialized views in Oracle databases can be set to manually refresh, refresh on a schedule, or, if the SQL query <a href="https://docs.oracle.com/database/121/DWHSG/basicmv.htm#GUID-932B8CD4-BF60-419A-9202-8A9FD5D24024" rel="nofollow">meets these requirements</a>, automatically refreshed.</td>
    </tr>
    <tr>
    <td>Snowflake</td>
    <td><a href="https://docs.snowflake.com/en/user-guide/views-materialized.html" rel="nofollow">Yes</a></td>
    <td>Automatic</td>
    <td>Materialized views in Snowflake are updated automatically. This automated approach results in <a href="https://docs.snowflake.com/en/user-guide/views-materialized.html#limitations-on-creating-materialized-views" rel="nofollow">SQL limitations</a>, and a <a href="https://docs.snowflake.com/en/user-guide/views-materialized.html#deciding-when-to-create-a-materialized-view-or-a-regular-view" rel="nofollow">limited set of use cases</a> where a materialized view is recommended over a view or a table.</td>
    </tr>
    <tr>
    <td>Redshift</td>
    <td><a href="https://docs.aws.amazon.com/redshift/latest/dg/materialized-view-overview.html" rel="nofollow">Yes</a></td>
    <td>Multiple Options</td>
    <td>By default, materialized views in Redshift must be manually refreshed, but an <code class="notranslate">AUTO REFRESH</code> option will attempt to update the view when base data changes. When a <code class="notranslate">REFRESH MATERIALIZED VIEW</code> call is made, <a href="https://docs.aws.amazon.com/redshift/latest/dg/materialized-view-refresh.html" rel="nofollow">certain types of views</a> can be updated incrementally.</td>
    </tr>
    <tr>
    <td>MongoDB</td>
    <td><a href="https://docs.mongodb.com/manual/core/materialized-views/" rel="nofollow">Yes, in 4.2+</a></td>
    <td>Manual</td>
    <td>MongoDB has a NoSQL equivalent of materialized views in the form of aggregation functions.</td>
    </tr>
    <tr>
    <td>Materialize</td>
    <td>Yes</td>
    <td>Automatic</td>
    <td>Materialize can incrementally maintain views that other databases cannot: Views with complex joins and aggregations, CTEs, views on views. The biggest SQL gap is WINDOW functions.</td>
    </tr>
    </tbody>
    </table>

## How are materialized views useful?

Note: See [why use a materialized view](https://materialize.com/why-use-a-materialized-view/) for a complete explanation, summary below.

The limitations of materialized views in popular databases discussed above have historically made them a relatively niche feature, used primarily as a way to cache the results of complex queries that would bring down the database if run frequently as regular views. But if we set aside historic limitations and think about the idea of materialized views: They give us the ability to define (using SQL) any complex transformation of our data, and leave it to the database to maintain the results in a "virtual" table.

This makes materialized views great for use cases where:

1.  The SQL query is known ahead of time and needs to be repeatedly recalculated.
2.  It's valuable to have low end-to-end latency from when data originates to when it is reflected in a query
3.  It's valuable to have low-latency query response times, high concurrency, or high volume of queries.

We see these requirements most often in areas of analytics and data-intensive applications.

### Materialized views for analytics

The extract-load-transform (ELT) pattern where raw data is loaded in bulk into a warehouse and then transformed via SQL typically relies on alternatives to materialized views for the transform step. In dbt, these are referred to as [materializations](https://docs.getdbt.com/docs/building-a-dbt-project/building-models/materializations). A materialization can use a regular view (where nothing is cached) or cached tables built from the results of a SELECT query, or an incrementally updated table where the user is responsible for writing the update strategy. Historically, support for materialized views in data warehouses has been so bad that SQL modelling services like dbt don't even have the syntax to allow users to create them. However, the [dbt-materialize adapter](https://materialize.com/introducing-dbt-materialize/) allows dbt users building on Materialize to use materialized views. Here's the standard advice given to dbt users on when to use the different types of materializations available to them:

> 1. If using a view isn't too slow for your end-users, use a view.
> 2. If a view gets too slow for your end-users, use a table.
> 3. If building a table with dbt gets too slow, use incremental models in dbt.

[Reference](https://stackoverflow.com/questions/64489772/materialized-view-vs-table-using-dbt)

Proper automatically updated materialized views are a fourth approach that takes the simplicity of a regular view (the analytics engineer need only write the SQL transformation) and the query latency of a cached table (because results are stored, no computation is done on SELECT queries).

Materialized views are a particularly more compute-efficient alternative to regular views when the dataset is large and the view is queried often. They are a more up-to-date, more automated and less error-prone alternative to cached tables because they remove the burden of deciding when and how to update from the end-user.

Stacks of Views: A common pattern in analytics tools like [dbt](https://www.getdbt.com/) is to define "stacks" of views that transform and aggregate the data in steps. Converting stacked views to either: (1) Stacks of materialized views or (2) stacks of regular views with a materialized view at the end simplifies the job of the user or the external tool by shifting the responsibility of orchestrating the order and frequency of updates into the database engine.

### Materialized views for applications

Incrementally updated materialized views can replace the caching and denormalization traditionally done to "guard" OLTP databases from read-side latency and overload.

They do this by moving the computation work from read to write-side of your database: Instead of waiting for a query and doing computation to get the answer, we are now asking for the query upfront and doing the computation to update the results as the writes (creates, updates and deletes) come in. This inverts the constraints of traditional database architectures, allowing developers to build data-intensive applications without complex cache invalidation or denormalization.
