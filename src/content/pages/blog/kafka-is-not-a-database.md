---
layout: 'Post'
title: 'Kafka is not a Database'
date: '2020-12-08'
category: 'Key Concept'
image: 'https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/kafka-not-database.webp'
people_refs:
  - arjun-narayan
  - george-fraser
description: 'In principle, it is possible to use Kafka as a database. But in doing so you will confront every hard problem that database management systems have faced for decades.'
---

**_This post is co-authored by George Fraser, the CEO of [Fivetran](http://fivetran.com), and Arjun Narayan, the CEO of Materialize. This blog post is cross-posted [on the Fivetran blog](https://fivetran.com/blog/kafka-is-not-a-database)._**

It's important to understand the uses and abuses of streaming infrastructure.

Apache Kafka is a message broker that has rapidly grown in popularity in the last few years. Message brokers have been around for a long time; they're a type of datastore specialized for "buffering" messages between producer and consumer systems. Kafka has become popular because it's open-source and capable of scaling to very large numbers of messages.

Message brokers are classically used to decouple producers and consumers of data. For example, at Fivetran, we use a message broker similar to Kafka to buffer customer-generated webhooks before loading them in batches into your data warehouse:

![A Message Broker Used as a buffer before loading into a data warehouse](https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/kafka_overview.webp)

In this scenario, the message broker is providing durable storage of events between when a customer sends them, and when Fivetran loads them into the data warehouse.

However, Kafka has occasionally been described as something much more than just a better message broker. Proponents of this viewpoint position Kafka as a fundamentally new way of managing data, where [Kafka replaces the relational database as the definitive record of what has happened](https://www.confluent.io/blog/okay-store-data-apache-kafka/). Instead of reading and writing a traditional database, you append events to Kafka, and read from downstream views that represent the present state. This architecture has been described as "[turning the database inside out](https://www.confluent.io/blog/turning-the-database-inside-out-with-apache-samza/)".

In principle, it is possible to implement this architecture in a way that supports both reads and writes. However, during that process you will eventually confront every hard problem that database management systems have faced for decades. You will more or less have to write a full-fledged DBMS in your application code. And you will probably not do a great job, because databases take years to get right. You will have to deal with dirty reads, phantom reads, write skew, and all the other symptoms of a hastily implemented database.

## Tripping (Up) on ACID

The fundamental problem with using Kafka as your primary data store is it provides no isolation. Isolation means that, globally, all transactions (reads and writes) occur along some consistent history. Jepsen provides a [guide](https://jepsen.io/consistency) of isolation levels (inhabiting an isolation level means that the system will never encounter certain anomalies).

Let's consider a simple example of why isolation is important: suppose we’re running an online store. When a user checks out, we want to make sure all their items are actually in stock. The way to do this is to

1. Check the inventory level for each item in the user’s cart.
2. If an item is no longer available, abort the checkout.
3. If all items are available, subtract them from the inventory and confirm the checkout.

Suppose we are using Kafka to manage this process. Our architecture might look something like this:

![A microservice workflow for processing checkouts](https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/kafka_checkout.webp)

The web server reads the inventory level from a view downstream from Kafka, but it can only commit the transaction **_upstream_** in the checkouts topic. The problem is one of **concurrency control**: if there are two users racing to buy the last item, **_only one must succeed_**. We need to read the inventory view and confirm the checkout at **_a single point in time_**. However, there is no way to do this in this architecture.

The problem we now have is called [write skew](http://justinjaffray.com/what-does-write-skew-look-like/). Our reads from the inventory view can be out of date by the time the checkout event is processed. If two users try to buy the same item at nearly the same time, they will both succeed, and we won't have enough inventory for them both.

Event-sourced architectures like these suffer many such isolation anomalies, which constantly gaslight users with “time travel” behavior that [we’re all familiar with](https://www.google.com/search?q=facebook+unread+notification+glitch). Even worse, research shows that anomaly-permitting architectures create outright security holes that allow hackers to steal data, as covered in [this excellent blog post](https://www.cockroachlabs.com/blog/acid-rain/) on [this research paper.](http://www.bailis.org/papers/acidrain-sigmod2017.pdf)

## Using Kafka **_Alongside_** a Database

These problems can be avoided if you use Kafka as a **_complement_** to a traditional database:

![kafka used for Change Data Capture from an OLTP database](https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/kafka_oltp_flow.webp)

OLTP databases perform a crucial task that message brokers are not well suited to provide: admission control of events. Rather than using a message broker as a receptacle for “fire and forget” events, forcing your event schema into an “intent pattern”, an OLTP database can **_deny_** events that conflict, ensuring that only a single consistent stream of events are ever emitted. OLTP databases are really good at this core **concurrency control** task - scaling to many millions of transactions per second.

Using a database as the point-of-entry for writes, the best way to extract events from a database is via streaming **change-data-capture**. There are several great open CDC frameworks like [Debezium](http://debezium.io) and [Maxwell](http://maxwells-daemon.io/), as well as native CDC from [modern](https://www.cockroachlabs.com/docs/stable/change-data-capture.html) [SQL](https://docs.oracle.com/cd/B28359_01/server.111/b28313/cdc.htm) [databases](https://docs.yugabyte.com/latest/architecture/docdb-replication/change-data-capture/). Change-data-capture also sets up an elegant operational story. In recovery scenarios, everything can be purged downstream and rebuilt from the (very durable) OLTP database.

## Don't Accidentally Misbuild A Database

The database community has learned (and re-learned) several important lessons over decades. Each one of these lessons was obtained at the high prices of data corruption, data loss, and numerous user-facing anomalies. The last thing you want to do is to find yourself relearning these lessons because you [accidentally misbuilt a database](https://www.oreilly.com/library/view/strata-hadoop/9781491944608/video244677.html).

Real-time streaming message brokers are a great tool for managing high-velocity data. But you will still need a traditional DBMS for isolating transactions. The best reference architecture for “turning your database inside out” is to use OLTP databases for admission control, use CDC for event generation, and model downstream copies of the data as materialized views.

## Kafka and Materialize

If you're interested in getting fully consistent views of your Kafka data updated in realtime, [try Materialize out](https://materialize.com/quickstart/) to see if it's the right solution for you!
