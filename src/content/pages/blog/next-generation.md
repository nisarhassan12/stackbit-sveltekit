---
layout: 'Post'
title: 'Announcing the next generation of Materialize'
date: '2022-10-03'
category: 'Product Update'
image: 'https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/materialize-public-launch.webp'
description: 'Today, we’re excited to announce a product that we feel is transformational: a persistent, scalable, cloud-native Materialize.'
people_refs:
  - arjun-narayan
  - frank-mcsherry
---

[Over two years ago](https://materialize.com/blog/introduction/), we announced the initial release of Materialize: a single binary that ingested data from Kafka and let users query, transform, and join their streaming data, all in standard SQL. This initial version of Materialize was our fastest path to clearly demonstrate our biggest value proposition: **incremental view maintenance as a technique for SQL over fast changing data.**

But the nature of the binary meant that this initial version came with technical limitations. Chiefly, that - until now - Materialize was only ever a compute engine. We relied on upstream systems to be the persistent source of truth for the data we were processing. Incorporating persistence into Materialize was the biggest ask from folks who wanted to build business-critical, production-ready applications on top of Materialize.

We have been hard at work rearchitecting the components of our binary into something very different. And today, we’re excited to announce a product that we feel is transformational: a **persistent, scalable, cloud-native Materialize**.

![Comparison of binary vs distributed versions of Materialize](/svgs/binary-vs-distributed-materialize.svg)

We’ve done a lot of things we’re excited to tell you more about. Many of them fall out of the most fundamental change we’ve made in moving to the cloud: a scalable, economical storage layer that allows us to **separate compute from storage**. As you create tables, sources, materialized views, and introduce data to them, we will durably record and maintain that data, and make both snapshots and update streams immediately available to all of your Materialize computers.

This means that instead of just one Materialize compute engine, you can now have as many simultaneous engines as you’d like, across multiple computers, all working cooperatively and with consistent views of the same underlying data. Each of these engines can be actively replicated, so that transient hiccups, rescaling events, and version upgrades don’t present as unavailability. And, each of these replicas can be scaled horizontally across multiple processes to handle even the largest of workloads.

If this is enough to excite you, these features are all already live in early access, which you can [sign up](https://materialize.com/register/) for now! And our database code is [available on GitHub](https://github.com/MaterializeInc/materialize), so feel free to look behind the scenes.

If you want to know more, we’re going to take a quick tour through our most significant new features. We’ve been using the framing of “Consistency, Scalability, Low Latency: Pick Three” for the new revision of Materialize. Let’s unpack what is new with each of them.

## Consistency

We took the opportunity to have Materialize provide [strict serializable](https://jepsen.io/consistency/models/strict-serializable) behavior by default. Despite spanning a large number of threads, processes, and computers, Materialize presents to all users as if it handles each command one at a time. You get to avoid all of the anomalies of eventual consistency, dual writes, and the other defects you didn’t know you needed to know about. You can also always drop down to [serializable](https://jepsen.io/consistency/models/serializable) behavior, if you know that you can handle it.

The mechanism underlying these guarantees is [virtual time](https://materialize.com/blog/virtual-time-consistency-scalability/). Materialize’s storage layer brands all changes to your data with a timestamp: the moment at which Materialize will treat the change as having occurred. We make sure that these timestamps respect transactional changes in the data: all changes happen in the same order as presented, and at the same timestamp for all changes within a transaction. This all happens automatically, as soon as you issue your first [`CREATE TABLE`](https://materialize.com/docs/sql/create-table/) or [`CREATE SOURCE`](https://materialize.com/docs/sql/create-source/) command.

Whenever you query Materialize, it gives you the exactly correct answer at some specific timestamp.

This is true even for multiple users independently working with the same data. The data itself record the times at which changes occur, and users can get consistent answers out without any further coordination. If two teams in your organization build out independent views over shared data, they will remain always consistent. If a third team wants to build on both of them, there is no reconciliation to perform; they just use the other teams’ views and see consistent, always up to date results.

## Scalability

We are introducing a new abstraction to Materialize: the [`CLUSTER`](https://materialize.com/docs/overview/key-concepts/#clusters).

```sql
-- create a cluster `prod` backed by a medium instance.
CREATE CLUSTER prod REPLICAS (r1 (SIZE = 'medium'));
```

A cluster is an isolated set of compute resources, which can be used to compute and maintain SQL views. This is what Materialize already does best, and what is new here is that you can create as many of them as you like.

There are many ways to scale with clusters, but I thought I’d call out three patterns that correspond almost exactly to [task-](https://en.wikipedia.org/wiki/Task_parallelism), [data-](https://en.wikipedia.org/wiki/Data_parallelism), and [pipeline-](<https://en.wikipedia.org/wiki/Pipeline_(computing)>)parallelism.

- Clusters allow you to add in new compute resources as you have new tasks, without disrupting any existing work. You can safely experiment with new use cases without the risk that you might overwhelm your production clusters. All the while, consistency (mentioned above) ensures you see the same results as if all the work was fit into one process.
- Clusters can scale up horizontally to multiple processes across multiple computers, increasing the aggregate memory, compute, and network proportionately. You can also scale _down_ to single-core clusters, and smaller, managing your costs when you know you have less work to do.

  ```sql
  -- Two very differently sized clusters.
  CREATE CLUSTER chonk REPLICAS (r1 (SIZE = 'xlarge'));
  CREATE CLUSTER smol REPLICAS (r1 (SIZE = 'xsmall'));
  ```

- Clusters not only read from the storage layer, they can write back to it too! The [`CREATE MATERIALIZED VIEW`](https://materialize.com/docs/sql/create-materialized-view/) command takes a view definition and writes its changes back to the shared storage layer, where they can be read by other clusters. This allows some clusters to do valuable pre-work on data, with their results fanning out to downstream consumer clusters.

There are many other great idioms for clusters. You can have serving clusters that just contain indexes and are always available for fast responses. You can have ad-hoc clusters that perform from-scratch queries, without the risk of bogging down higher priority clusters. They are also just a great way to introduce more autonomy: you don’t have to get buy-in from your DBA to spin one up as you aren’t consuming a scarce shared resource.

## Low Latency

Materialize has always been fast.

When your input data change, we promptly update all views that depend on this data, doing work proportional to the change in the view. The results are maintained in memory or streamed to persistent storage, either of which can be directly queried.

Materialize is now more _consistently_ fast, through a technique called active replication. Clusters (above) can be backed by multiple replicas that each perform the same work, each created with the [`CREATE CLUSTER REPLICA`](https://materialize.com/docs/sql/create-cluster-replica/) command. Materialize can respond to a query or produce a streamed output as soon as the first replica responds. Active replication is traditionally used to smooth out hiccups, and mask failures should they happen, but it provides low latency over other types of disruptive events as well.

As an example, active replication enables seamless cluster rescaling. Let’s say you need to increase the sizing of a cluster, because your workload was so successful the volume increased ten-fold. You can spin up a new replica with the right size, wait until it is caught up, and then tear down the old replica. There is no interruption while you rescale; your cluster stays continually interactive.

```sql
-- Rescaling a cluster in Materialize:
CREATE CLUSTER REPLICA my_cluster.new SIZE = 'large';
-- The new replica hydrates with existing maintained views.
-- All queries now go to both replicas.
DROP CLUSTER REPLICA my_cluster.old;
-- We are now cut over to the new replica, and are rescaled!
```

Active replication opens many new doors, and you should expect these features to roll out in Materialize soon. You can turn off a cluster by removing its replicas, and rehydrate it in the morning without having to replay the evening’s changelogs. You can do seamless version upgrades by bringing new versions up to speed as a new replica, before removing old-versioned replicas. You can deploy new query plans, reflecting optimizer improvements or better statistics, without interrupting your ongoing work.

Across the board, active replication makes good on the promise of low latency in the face of operational disruptions.

## The same SQL you already know

A lot about Materialize has changed. The good news is that one of our best qualities hasn’t: our SQL support. You can expect full ANSI SQL support, so you won’t have to learn custom dialects or new query languages. Materialize is still Postgres wire-compatible, which means that you can bring along all of the data tools you already use. And, perhaps best yet, with the fully-managed, cloud-based Materialize, you don’t need to learn how to operate a new system. All you need to know is SQL.

Together, this all means that developing on top of real-time data has never been so easy, performant, or correct. We couldn’t be more excited to share this new generation of Materialize with you.

<!-- :::note{.success} -->
If you are interested in Materialize and being part of our early access program you can [register here](http://materialize.com/register) to connect with our team.
<!-- ::: -->

_This post has benefited from great input from many helpful colleagues, in particular Jessica Laughlin!_
