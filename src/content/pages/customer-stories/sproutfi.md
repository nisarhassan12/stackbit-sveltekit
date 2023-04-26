---
layout: CustomerStory
label: Sproutfi
date: '2021-10-26'
title: >-
  How Fintech Startup SproutFi uses Materialize to Power LATAM’s first Social
  Brokerage
excerpt: >-
  SproutFi cut their development time by 50% with the services built by
  Materialize while saving 10% of data management and migration time.
  Materialize also enabled SproutFi to eventually eliminate Cassandra from their
  infrastructure, simplifying their data stack. Overall, because Materialize
  helped SproutFi save on maintenance costs, it’s changed how SproutFi is
  developing their product. The SproutFi team feels empowered to economically
  and easily try new projects.
logo: '/images/logos/sproutfi.svg'
squareImage: >-
  https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/sproutfi-square.webp
image: >-
  https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/sproutfi-horizontal.webp
highlight: >-
  “With Materialize we don't have to worry about avoiding complex joins with
  streaming data; we just do them very easily.”
people_refs:
  - tyler-richie
sidebar:
  - heading: At a Glance
    subheading: >-
      SproutFi is on a mission to make investing in US markets accessible and
      fair to everyone in Latin America. In addition to buying and selling
      assets, SproutFi users share investment ideas and learn from each other as
      they access thousands of US stocks and ETFs with as little as $1.
  - heading: Industry
    subheading: Fintech
  - heading: Challenges
    subheading: >-
      As a lean start-up looking to differentiate itself in the brokerage space,
      SproutFi was looking for the easiest and quickest way to build a social
      feed application that could handle complex joins.
  - heading: Use Case
    subheading: >-
      In using Materialize to build SproutFi’s social feed, SproutFi also found
      Materialize to be very useful in streamlining their infrastructure when it
      came to maintaining state while also solving duplicative data issues.
      Lastly, SproutFi uses several sinks connected to Materialize.
  - heading: Results
    subheading: >-
      SproutFi cut their development time by 50% with the services built by
      Materialize while saving 10% of data management and migration time.
      Materialize also enabled SproutFi to eventually eliminate Cassandra from
      their infrastructure, simplifying their data stack. Overall, because
      Materialize helped SproutFi save on maintenance costs, it’s changed how
      SproutFi is developing their product. The SproutFi team feels empowered to
      economically and easily try new projects.
---

## SproutFi: Investing for Everyone through Social Networking

[SproutFi](https://www.sproutfi.com/) -- described by its co-founder Tyler Richie as "_Twitter meets Robinhood_" -- is a brokerage startup offering US equities and ETFs to Brazilian retail investors through a mobile app. SproutFi provides investors with a community-led platform that promotes financial literacy so that users are empowered to invest intelligently without needing a lot of money to begin.

## Laying the Groundwork for Modern Data Processing

Prior to Materialize, SproutFi had been using Apache Cassandra as their primary database with Redpanda for streaming data. Their social application required a focus on stateful processing -- that is, "remembering" events that happened in the past as new events are processed. The team immediately encountered limitations with Cassandra on some complex queries.

Richie explained, "_Cassandra isn't built to track state when you have to run a query across all the shards. It's not appropriate for that._" The team needed two different systems to keep track of the state on certain queries, which "_seemed like total overkill._"

This wasn't just architecturally complex -- it required complex joins to maintain. Running a real-time social feed requires joining several different types of data from various topics, such as user profile information and a user's respective comments.

Since Cassandra does not support joins, the joining logic was handled using a custom application based on key-value lookups --- which made the operation unnecessarily expensive. As a result, the engineering team found themselves compromising on functionality and leaving critical capabilities unaddressed.

<QuoteBlock text="What we found is that we were trying to specify data models not based on what we thought was the most correct, but what would avoid joins the most. With Materialize, this is no longer the case." attribution="Tyler Richie" />

## Building a Real-Time Social Application with Materialize

It was around this time that Richie hired DevOps Architect Michael Francis, who led the test of Materialize for real-time data processing.

One of SproutFi's core differentiators in the brokerage space is its social learning network. As SproutFi's first-ever service requiring joining multiple streams from different sources, SproutFi's social feed was built from the start using Materialize.

SproutFi encourages users to talk about why they've purchased or sold a particular asset. When a user purchases or sells an asset, a trigger will prompt SproutFi to ask a user why they made this choice. At the same time, this trigger also sends a notification to the Partner associated with the purchase or sale.

All these events are pushed into Redpanda, and then joined with a separate comments data stream using Materialize. From an end user perspective, this translates as real-time events on each user's personal feed.

Support for complex joins in Materialize made building SproutFi's social feed a seamless process. Unlike other stream processing tools, Materialize has broad support for the most common types of joins -- including inner, left (outer), right, full, cross, and lateral joins, and it is built to efficiently handle otherwise prohibitively expensive operations over streaming data, like n-way joins and unbounded joins.

According to Richie, "_There was nothing stopping us before from doing it, but it would have been a fairly bigger undertaking._"

## SproutFi Architectural Diagram

![](https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/sproutfi-materialize-architectural-diagram.webp)

_Pictured Above: Kafka topics are treated as the main output and boundary of a SproutFi service. Materialized views are used to expose data through a GraphQL API and for querying necessary data of other services. Sinks are used to combine event sources that can freely combine and await data._

## Building a 360-degree view of a customer with Materialize sinks

With this initial use case established, real-time joins were used to establish a 360-degree view of a customer within the SproutFi product -- in combination with Kafka sinks.

The start of SproutFi's unified view into a customer profile was rather straightforward. Using a lateral join in Materialize, SproutFi could obtain a real-time view into customer profile information, even as users changed or updated the underlying information.

As Michael states, "_Every time the materialized view updates, we would push the latest object into Kafka with a sink. Things can be triggered off of that while guaranteeing we always have the latest view -- in this case, we call them profiles._"

Thereafter, SproutFi used Materialize sinks to overhaul their 'Know Your Customer' process. SproutFi wanted to have an easy way to continue requesting information from a customer after the onboarding process. This could be simple inputs, such as a business address change.

According to Richie, "_There are a lot of these common corner cases. Before Materialize, KYC was a flow of information during the account onboarding phase. Now, it's more like a service that can be queried. The mobile app queries and says, 'What details do I need to collect from this user?' And that same service that answers that query with those details also makes the decision about whether that user has already been KYC'd. The logic is fairly complex. We're bringing data from several different topics together, joining them, and then deciding what to do. And we use the Materialize sink for that. You have all these places across the system where that data can be changing. We essentially have a view that updates, and every time the inputs are all valid, the service pushes that into a topic and then into a sink that we can retrieve and say 'Here's all the versions of X customer's KYC information.'_"

<CTABlock />

## KYC Data Flow

![](https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/sproutfi-materialize-kyc-dataflow.webp)

_Pictured Above: Combining materialized views and sinks allows SproutFi to decouple and freely combine their services. By doing this they remove the dependence on specific domain logic and easily transform and derive new data. SproutFi treats the new data as independent facts and combines them with the canonical sources of truth to reason about their system._

## Building fast with a small team

Given the lean-sized team of 17 employees at SproutFi, saving development time was essential. The team was hoping to produce the first social investing app in LatAm.

According to Michael, "_A typical service would take us about two weeks to build. Since we've started using Materialize, it's gone down probably to two, maybe three days. Materialize saved us at least 50 percent in terms of time saved building services._"

Troubleshooting time was also a consideration, according to Richie: "_In terms of engineering time, I'd say more than 10% was spent dealing with these types of general issues, like data management and migrations before Materialize._"

He continued, "_I would say for the same service built with Materialize we had somewhere between two and three times the amount of code and the operational overhead was pretty significant._"

With the success of the initial test, SproutFi started to rapidly build additional features using Materialize. According to Richie, "_We were able to push really complex features out quickly while not taking on a significant amount of tech debt. Events were all in Redpanda and we weren't trying to manage state in two places like we were before._"

Materialize has gone on to be an enabler of new business products at SproutFi and empowers their engineering team to move faster with more confidence. According to Richie, "_Materialize has changed how we think about building our social functionality. We're trying new things fearlessly._"

<QuoteBlock text="We are less afraid to build entirely new things with the size team that we have because the maintenance costs are so much lower with Materialize. Materialize has made it so cheap and easy for us to just try things. It's changed how we are developing our product. We don't need to plan as much." attribution="Tyler Richie" />

## Reducing infrastructure costs

Not only is the team able to iterate more quickly, they are saving money on data infrastructure. According to Michael, "_Before Materialize, we would build these little services that would read from Kafka and write to Cassandra. The best way to keep the Cassandra data forever is to pay for the hosted service_" -- which the team no longer needed to do with Materialize.

SproutFi plans to eliminate Cassandra entirely from their infrastructure. According to Michael, "_We save quite a bit of money by moving off of hosted Cassandra. Switching to Materialize did not increase our cost of running the cluster, and getting rid of Cassandra decreased our costs._"

## Easy to try...

According to Michael, "_Materialize is very easy to set up and get started with. I really like that it's a single binary that you can just run on your own machine and it works. You actually don't need very much infrastructure just to kick the tires on Materialize, which is a really good onboarding experience. Materialize mapped to my mental model of taking something like Kafka and turning all the events into rows in the database -- and then you can pair it with SQL. It was pretty easy to figure out the concepts and give it a shot._"

Materialize speaks standard SQL and connects directly to various external sources of data, including streaming sources like Kafka, data stores such as S3, databases like Postgres, and local files.

Michael added, "\_My first time using Materialize I would say that I got value out of it within a handful of hours. The ability to just start Materialize, point it at Kafka, do a SELECT \_ and see all your data enabled us to get value out of it immediately. It's really easy to try. It's super easy to download and run it on your laptop... and you can figure it out pretty quickly.\*"

On working with Materialize, Richie states "_I think that Materialize is probably the service provider that we're having the best experience with right now. They've been great. They're super transparent about what's going on, on their side of things. The team seems eager to help us solve our problems._"

Richie has been impressed with how collaborative the Partnership with Materialize has been, stating, "_The relationship we have with you is a bit different than the other Cloud providers in that it feels like we're building alongside you._"

## ...and easy to integrate

Materialize is specifically designed to handle a wide range of input sources and integrates with the broad ecosystem of Postgres tooling. As Richie described: "_We chose Materialize because it was the easiest to integrate. All the other tools required or had some expectations of how your data should be, the other tools you're using, or the languages you're using._"

Getting data into Materialize is simple. According to Richie, "_Materialize and Redpanda are an event-sourcing match made in heaven! Over and over again we find that we can use Materialize in places where we otherwise would have relied on using a database. This has dramatically reduced the amount of state we need to manage -- with the complexity on our backend reduced, we're delivering customer-facing value faster than ever._"

Developers can build with Materialize like they would with a standard Postgres database. As Michael described, "_With Materialize, everything speaks Postgres. Everything has a Postgres database adapter, and all it cares about is that you have some stream of data. It's super easy to just drop into pretty much any architecture. I think for us that was actually the biggest benefit of Materialize, that it speaks Kafka on all these different streams but it also speaks Postgres._"

<QuoteBlock text="We chose Materialize because it was the easiest to integrate. All the other tools required or had some expectations of how your data should be, the other tools you're using, or the languages you're using. With Materialize, everything speaks Postgres. Everything has a Postgres database adapter, and all it cares about is that you have some stream of data. It's super easy to just drop into pretty much any architecture." attribution="Michael Francis" />

---

## Want to learn more about Materialize?

Materialize is a streaming database for real-time analytics. Materialize simplifies how developers build with real-time data, using incremental computation to provide low latency, correct answers -- all using standard SQL. With nearly a decade of technical research behind it, Materialize was launched to address the growing need for the ability to build real-time applications easily and efficiently on streaming data so that businesses can obtain actionable intelligence from streaming data.

If you'd like to see how Materialize and Redpanda can be used together to implement the workflows that SproutFi used for handling duplicative data and streamlining their stack, you can watch the [Redpanda + Materialize webinar](https://materialize.com/resources/community-meetup-redpanda/) and you can also check out our blog post [Taking streaming analytics further faster with Redpanda + Materialize](https://materialize.com/taking-streaming-analytics-further-faster-with-redpanda-materialize/).

If you're interested in testing out Redpanda + Materialize, you can [sign up for Materialize](https://materialize.com/register/) or [join](https://materialize.com/s/chat) us in the Community!
