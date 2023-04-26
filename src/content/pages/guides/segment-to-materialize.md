---
layout: 'Guide'
title: How to Connect Segment to Materialize
date: '2022-09-07'
last_reviewed: '2022-09-07'
category: 'Integration Guide'
image: 'https://res.cloudinary.com/mzimgcdn/image/upload/v1666704174/segment-materialize.png'
people_refs:
  - andy-hattemer
description: 'Connect a real-time stream of user-centric events from Segment to Materialize, using Kafka as the intermediary.'
---

[Segment](https://segment.com) is a customer data platform that operates as a sort of ingestion and routing middleware for real-time user-centric events.

Materialize is a streaming database that allows you to take the same SQL queries you run on traditional databases and create incremetally updated materialized views (i.e. standing SQL queries that update themselves in real-time).

When integrated, Segment and Materialize enable data teams to build real-time customer data API's, segmentation, automation and alerting.

This guide details how to send a live feed of events from Segment to Materialize.

## Architecture

Currently, the best option is to use the [Segment Webhooks destination](https://segment.com/docs/connections/destinations/catalog/webhooks/), which allows us to point the real-time stream of Segment events at any HTTP endpoint.

That presents a challenge:
Materialize doesn't currently have a Webhook (HTTP) Source. _Although one may be added in the future, there's a tracking issue for it [here](https://github.com/MaterializeInc/materialize/issues/1701)._
We need to use a connector service that accepts incoming HTTP webhooks and maps the payloads to either Kafka or PostgreSQL, the two sources that currently have production-level support on Materialize.

<!-- :::note{.warning} -->
<!-- **Note:** Materialize is [Postgres wire-compatible](/blog/postgres-compatibility/), but we can't use the [Segment Postgres destination](https://segment.com/docs/connections/storage/catalog/postgres/#postgres-warehouse-destination) because it is a [Warehouse Destination](https://segment.com/docs/connections/storage/warehouses/#:~:text=In%20Segment%2C%20a%20Warehouse%20is,you've%20sent%20to%20Segment.):
Instead of streaming updates, Warehouse destinations sync data in bulk at regular 6-24 hour intervals. -->
<!-- ::: -->

### Upstash Kafka

There are several intermediate services that can help map webhooks to Materialize, the easiest option we have found is to use [Upstash Kafka](https://upstash.com/).
Upstash offers a cloud-based [managed Kafka](https://docs.upstash.com/kafka) product with a generous free-tier, very reasonable pay-per-message pricing, and, most importantly, a simple webhook endpoint for every topic.

![Segment to Materialize Architecture Diagram](/svgs/segment-to-materialize.svg)

### Alternative: AWS API Gateway + Lambda Function

If your org is unable to use Upstash, or you're already using another Kafka provider, you can also use an AWS Lambda serverless function that is publicly addressable via an API Gateway configuration to route Segment events into your Kafka cluster that way.

![](/svgs/segment-lambda-kafka-materialize.svg)

For reference on configuring API Gateway and Lambda to produce messages to Kafka, see [Creating a serverless Apache Kafka publisher using AWS Lambda](https://aws.amazon.com/blogs/compute/creating-a-serverless-apache-kafka-publisher-using-aws-lambda/). The only additional configuration step: The public HTTP endpoint from your API Gateway will need to be added as a webhook destination from Segment.

## Configure Kafka

For the rest of this example, we'll use Upstash Kafka as the adapter between Segment and Materialize, it is serving as the message buffer that takes in the JSON payloads of all Segment events via an HTTP webhook, places them on a single partition topic with seven day retention, and allows them to be consumed via Materialize Kafka Source.

<!-- :::note{.info} -->
**Note:** In the latest version of Materialize, Kafka source records are immediately saved in storage, so seven day message retention in Kafka is not required, but it's a useful redundancy feature in the event of unforeseen issues.
<!-- ::: -->

Create a free Upstash account, then create a new Kafka Cluster and Topic. (For more guidance, see [**Upstash Docs**](https://docs.upstash.com/kafka))

Save the Webhook URL for later. _(Just the URL, not the entire curl statement.)_

![Upstash Kafka Webhook URL](/images/upstash-kafka-webhook-url.webp)

Save the **Endpoint**, **Username** and **Password** as well.

![Upstash Kafka Webhook URL](/images/upstash-kafka-creds.webp)

## Configure Segment to Write to Kafka

Back in the Segment admin panel, [create a new destination](https://segment.com/docs/getting-started/05-data-to-destinations/) and select [Webhooks](https://segment.com/docs/connections/destinations/catalog/webhooks/) as the destination type:

![](/images/segment-webhooks-destination.webp)

Add the Upstash Webhook URL in the Destination Settings page in Segment:

![](/images/segment-webhooks-form.webp)

Confirm that events are flowing by going back to the cluster in the Upstash console, navigating to the topics tab and clicking on the topic name to confirm that the topic has more than zero messages.

## Configure Materialize to Consume from Kafka

Now that we are streaming events from Segment to Upstash, we need to create a streaming input [`SOURCE`](https://materialize.com/docs/overview/key-concepts/#sources) in Materialize that consumes messages from Kafka:

```sql title="Current Materialize Version"
CREATE SECRET upstash_kafka_password AS '<UPSTASH_KAFKA_BROKER_PASSWORD>';

CREATE CONNECTION upstash_kafka_connection TO KAFKA (
    BROKER '<UPSTASH_KAFKA_BROKER_URL>',
    SASL MECHANISMS = 'SCRAM-SHA-256',
    SASL USERNAME = '<UPSTASH_KAFKA_BROKER_USERNAME>',
    SASL PASSWORD = SECRET kafka_password
);

CREATE SOURCE upstash_segment
  FROM KAFKA CONNECTION upstash_kafka_connection (TOPIC '<TOPIC_NAME>')
  FORMAT BYTES
  WITH (SIZE = '3xsmall');
```

In the latest versions of Materialize, we create separate reusable [`SECRET`](https://materialize.com/docs/sql/create-secret/) and [`CONNECTION`](https://materialize.com/docs/sql/create-connection/) objects that are referenced in the [`SOURCE`](https://materialize.com/docs/overview/key-concepts/#sources).
Additionally, upon creation of a SOURCE, Materialize immediately begins consuming events and saving them in storage.

`FORMAT BYTES` in the SQL above indicates Materialize is consuming the Segment events as raw bytes. The final step is to convert and parse them as JSON.

_If you're using the Materialize Binary, you'll need this syntax instead:_

```sql title="Materialize Binary"
CREATE SOURCE upstash_segment
  FROM KAFKA BROKER '<UPSTASH_KAFKA_BROKER_URL>' TOPIC '<TOPIC_NAME>'
  WITH (
      security_protocol = 'SASL_SSL',
      sasl_mechanisms = 'SCRAM-SHA-256',
      sasl_username = '<UPSTASH_KAFKA_BROKER_USERNAME>',
      sasl_password = '<UPSTASH_KAFKA_BROKER_PASSWORD>'
  )
FORMAT BYTES;
```

```sql title="Convert to JSON"
CREATE MATERIALIZED VIEW segment_events_json AS
  SELECT
    CAST(data AS jsonb) AS data
  FROM (
    SELECT convert_from(data, 'utf8') AS data
    FROM upstash_segment
  );
```

It is efficient to use a materialized view here because, since in current versions, [materialized views write output down to storage](https://materialize.com/docs/overview/key-concepts/#materialized-views:~:text=The%20results%20of%20a%20materialized%20view%20are%20persisted%20in%20durable%20storage), the above is a stateless dataflow, messages are individually pulled into the compute layer, converted to JSON, and written back down to storage. This means conversion only happens once, and all later SQL can reference pre-parsed JSON.

Keep in mind, the materialized view `segment_events_json` is still a single view of all types of segment events (pageviews, identifies, tracks, etc...) and it has a single column `data` of type `jsonb` containing the metadata of each event. You'll need to do further transformation to begin generating value from it.

<!-- :::note{.info} -->
**Tip:** Materialize implements the same JSON referencing features as Postgres, see [`jsonb` docs](https://materialize.com/docs/sql/types/jsonb/) for examples.
<!-- ::: -->

## Where to go from here

Now you have access to a real-time feed of Segment events in Materialize, with it, you can:

1. Build Customer Data Platform features
<!-- 2. [Monitor data for errors, anomalies or any other condition.](/blog/real-time-data-quality-tests-using-dbt-and-materialize/) -->
3. Create a push feed of notifications

If you have any questions or issues, join us in the [Materialize community](https://materialize.com/s/chat) where other users and Materialize engineers can help!
