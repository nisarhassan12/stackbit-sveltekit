---
layout: CustomerStory
label: Drizly
eyebrow: From Batch to Streaming for Reduced Cart Abandonment
title: >-
  How Ecommerce Company Drizly uses Materialize for Real-Time Notifications,
  Alerting, and Personalization
excerpt: >-
  Once a Drizly customer abandons their cart, they are notified of their pending
  order in a 30-minute window, rather than a 24-hour window, which was
  previously the case. By easily transitioning from batch processing to stream
  processing, Drizly reduced cart abandonment, increased revenue, and provided
  customers with a more seamless experience.
logo: /images/logos/drizly.svg
date: '1970-1-1'
squareImage: >-
  https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/drizly-square.webp
image: >-
  https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/drizly-horizontal.webp
highlight: >-
  "With Materialize, we can write real-time SQL, the same way as we already are
  in Snowflake with batch while continuing to use dbt."
people_refs:
  - emily-hawkins
sidebar:
  - heading: At a Glance
    subheading: >-
      Founded in 2012 in Boston, and acquired by Uber in 2021 for $1.1B, Drizly
      is the largest online marketplace for alcohol in North America, partnering
      with thousands of retailers in over 1,500 cities. Today 100M+ customers
      across 31 states use Drizly for alcohol delivery in under 60 minutes
      through its website and app.
  - heading: Industry
    subheading: Retail / Ecommerce
  - heading: Challenges
    subheading: >-
      Drizly sought to reduce cart abandonment amongst its online shoppers.
      Drizly’s previous infrastructure struggled to trigger a notification in
      the absence of an event, which is a requirement to solve for cart
      abandonment. Additionally, Drizly had tried several existing solutions but
      they each had limited functionality with complex joins. Lastly, their
      batch infrastructure couldn’t meet the timing demands of shoppers.
  - heading: Use Cases
    subheading: >-
      Drizly uses Materialize to deliver real-time cart abandonment
      notifications. Looking forward, Drizly will use Materialize to improve
      dynamic experiences, build real-time personalization and recommendation
      services, such as automated wine suggestions for first-time shoppers.
  - heading: Results
    subheading: >-
      With Materialize, once a Drizly customer abandons their cart, they are
      notified of their pending order in a 30-minute window, rather than a
      24-hour window, which was previously the case. By easily transitioning
      from batch processing to stream processing, Drizly reduced cart
      abandonment, increased revenue, and provided customers with a more
      seamless experience.
---

## Drizly: reinventing the alcohol shopping experience

Drizly is an Ecommerce platform that allows consumers to buy alcohol online and get it delivered right to their door in under 60 minutes. In an industry predicated upon speed of delivery and ease of shopping, Drizly is committed to providing a first-class customer experience.

## Reducing cart abandonment: triggering a notification in the absence of an event

The likelihood that an online shopper will not purchase goods added to their cart increases as more time passes. This holds even more true in the context of spirits and entertainment, where day-of planning and spur-of-the-moment events are part of Drizly's target persona.

<QuoteBlock text="Working with Materialize has been an incredibly seamless process as we can continue to write real-time SQL, exactly the same way as we already are in Snowflake with batch, so it was a much lower barrier to entry..." attribution="Emily Hawkins" />

Drizly sought to reduce the time required to generate a cart abandonment notification using real-time data. This is a common challenge across ecommerce companies－triggering a notification in the absence of an event is difficult. In Drizly's case, existing solutions like ksqlDB and Faust were not able to solve this problem due to limited functionality with joining a high number of data streams.

The ability to join various event types is required for tracking cart abandonment as you need to join data such as user actions (add to cart, remove from cart), session status (active inactive), and checkouts. Additionally, it's stateful because you need to know the history of a user's orders to take action.

<table>
<thead>
<tr><th>Before Materialize</th><th>After Materialize</th></tr>
</thead>
<tbody>
<tr><td>

When a Drizly shopper abandoned their cart, they received a shopping cart notification the next day, as batch processing in Snowflake required a 24-hour window.

Cart abandonment was highly likely, resulting in lost revenue and a suboptimal user experience.

</td>
<td>

Once a Drizly customer abandons their cart, they are notified of their pending order in a 30-minute window, enabled by streaming data into Materialize.

By easily switching from batch processing to streaming data with Materialize, Drizly was able to reduce cart abandonment, increase revenue, and provide a more seamless customer experience.

</td></tr>
</tbody>
</table>

## Easily moving from batch to streaming from an Architectural View

![Drizly Materialize Architecture Diagram](https://res.cloudinary.com/mzimgcdn/image/upload/v1670437371/drizly-graph.jpg)

_Pictured Above: Drizly Architecture Diagram (Stream infrastructure = Kafka, Stream Processing = Materialize, Stream Modeling = dbt)_

Drizly uses Confluent Cloud to manage their schema registries and Kafka topics. User actions including "Add to Cart" and "Checkout" are streamed as events into Kafka and then read into Materialize as sources. The Drizly team writes SQL (managed in dbt) to join and transform data as needed to identify a user with an abandoned cart -- that is, the absence of a corresponding checkout event after 30 minutes of adding items to their cart. Flagged users are added into an incrementally-updated materialized view.

Each flagged user is then streamed by Materialize into a separate Kafka topic. Those enriched Kafka topics trigger downstream services that generate reminder notifications to users to complete the purchase remaining in their cart.

## Materialize + dbt offer standard SQL for streaming data

Whereas other solutions were not able to provide this kind of workflow, Materialize and dbt offered an out-of-the-box connection. Drizly was an established dbt user － and as both services utilize standard SQL, Drizly was able to significantly reduce the time required to build the service and quickly ramp the team on new infrastructure changes. Leveraging standard SQL allowed Drizly to avoid engineering bottlenecks commonly associated with tools that required learning a new programming language. Both data scientists and analysts could also use Materialize and dbt, empowering their data teams to own more of the transformation logic rather than relying on engineering efforts.

As Emily Hawkins, Data Infrastructure Lead at Drizly best states, "_Working with Materialize has been an incredibly seamless process as we can continue to write real-time SQL, exactly the same way as we already are in Snowflake with batch, so it was a much lower barrier to entry. It was also a huge plus for us that we could continue using dbt within the real-time platform to help us address our online cart conversion challenges where customers can be reminded of a pending purchase in the span of minutes versus hours._"

From a Drizly presentation on their streaming decision:

<table>
<thead><tr><th>Why Materialize?</th><th>Why dbt?</th></tr></thead>
<tbody><tr><td>

- We can write real-time SQL almost exactly the same as batch SQL (lower barrier to entry)
- Dbt compatibility
- Centralizes streaming logic in the same way we have for batch in Snowflake
- Applications can connect directly to Materialize or we can send data out using sinks

</td><td>

- Continuity between processes
- Analysts and data scientists will be able to quickly ramp up on our real-time infrastructure
- Deploying a new real-time model is as easy as writing a new dbt model (a SQL query

</td></tr></tbody></table>

<CTABlock />

## What's next for Drizly and Materialize?

## Building real-time personalization and recommendation services

As the service matures, Drizly plans to implement more data science models for increased personalization in their real-time customer alerts -- including recommendations for related items based on their selections or past purchases.

Drizly will also use Materialize to improve their real-time dynamic experiences through customer triggered workflows/actions. For example, a first-time browser of wine might receive a quiz for wine preferences and tastes -- which would then suggest specific wines in real-time for the customer's first Drizly purchase.

"Abandon browse" is another example of customer triggered workflows, in which Drizly will send notifications to users who view products on-site, but don't add anything to cart, and then leave the site. In this case, Drizly will send a notification after "abandon browse" takes place to predict three items a user might be interested in given their recent session and any other sessions preceding that.

### Moving to Materialize Cloud

Drizly plans to transition to Materialize Cloud to spin up multiple deployments within the same account and have Materialize hold both development and production instances. This would alleviate Drizly from having to host and manage all their data themselves.

## Want to learn more about Materialize?

Materialize is a streaming database for real-time analytics. Materialize simplifies how developers build with real-time data, using incremental computation to provide low latency, correct answers -- all using standard SQL. With nearly a decade of technical research behind it, Materialize was launched to address the growing need to build real-time applications easily and efficiently on streaming data so that businesses can obtain actionable intelligence.

For a how-to-guide on how to implement the workflows that Drizly used for real-time notifications and alerting, you can read our [Temporal Filters](https://materialize.com/temporal-filters/) blog post here. Temporal Filters, also known as "windowed" or time-sensitive queries, is the mechanism Drizly used to 'flag a user if idle for 30 minutes.' You can also check out our blog post on the [Materialize-dbt integration](https://materialize.com/introducing-dbt-materialize/) ​​here, which shows how the adapter is a useful way to manage your models and SQL for both batch and streaming.

We encourage you to try us out by [signing up for Materialize](https://materialize.com/register/) or [join](https://materializecommunity.slack.com/join/shared_invite/zt-ljdufufo-PTwVPmgzlZtI7RIQLDrAiA#/shared-invite/email) the discussion in our Community!

\*_\*\*Update: When Materialize was implemented Drizly was using Confluent Cloud to manage their schema registries and Kafka topics. However, they recently migrated from Confluent Cloud to Amazon MSK. Materialize continues to work seamlessly, powering Drizly's abandoned cart services, regardless of their choice of Kafka service._
