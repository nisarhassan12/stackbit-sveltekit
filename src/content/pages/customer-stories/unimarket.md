---
layout: CustomerStory
label: Unimarket
date: '2021-10-26'
title: How Unimarket Built Real-Time Dashboarding with Materialize
excerpt: >-
  Materialize helped Unimarket easily build and maintain dashboards, enabling
  Unimarket to feel equipped to build new dashboards and enhance the customer
  experience. With Materialize, Unimarket dashboards update 2x faster and their
  OLAP code base has reduced by 60%.
logo: '/images/logos/unimarket.svg'
squareImage: >-
  https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/unimarket-square.webp
image: >-
  https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/unimarket-horizontal.webp
sidebar:
  - heading: At a Glance
    subheading: >-
      Unimarket is a 15-year-old New Zealand-based company offering an
      easy-to-use cloud-based procurement solution that connects an extensive
      supplier marketplace with purchasing, invoice management, and card payment
      functions in one integrated platform.
  - heading: Industry
    subheading: SaaS
  - heading: Challenges
    subheading: >-
      Unimarket was looking for a way to reduce the maintenance and overhead
      costs associated with its real-time customer dashboards while also
      improving dashboard latency.
  - heading: Use Case
    subheading: >-
      Unimarket is using Materialize for external dashboards that show customer
      spend allocation and procurement process performance in real-time.
  - heading: Results
    subheading: >-
      Materialize helped Unimarket easily build and maintain dashboards,
      enabling Unimarket to feel equipped to build new dashboards and enhance
      the customer experience. With Materialize, Unimarket dashboards update 2x
      faster and their OLAP code base has reduced by 60%.
---

## Building Real-Time Dashboards with a Lean Team

Unimarket is a SaaS company focused on simplifying and automating the procurement process for forward-thinking organizations. Their software provides customers visibility into procurement processes in real-time, enabling those organizations to be more strategic in managing their procurement processes, optimizing costs and saving time as a result.

As the co-founder and CIO of Unimarket, Damien Hollis was tasked with figuring out the technical requirements for building and maintaining such a service.

The Unimarket team was fairly lean, and they needed a way to build their product in a cost-effective manner and conserve development and maintenance time. Any time they spent maintaining dashboards was time they could not dedicate to the development of their product.

Unimarket was also very early in their journey with real-time data. They needed a tool that was easy to learn, worked with their existing skills, and was quick to add value.

According to Hollis, "_We had very limited experience with streaming data apart from what we built ourselves. We're very new to the streaming area and have never used Kafka, Flink, or Hadoop._"

<QuoteBlock text="Previously, maintenance costs were preventing us from building any new dashboards. We would de-prioritize feature requests because of our existing tooling and resources. Now, when the Product team arrives with new ideas, we're able to say 'Yes, we can do that' - rather than worrying about the cost." attribution="Damien Hollis" />

## Traditional Dashboards are Difficult to Maintain

The first iteration of the Unimarket dashboards were built on a custom star schema database. Data was sent from the Unimarket application to another Java application via JMS queues. Data was then written to a star Schema database and aggregates and snapshots of the data were created to support fast queries later.

According to Hollis, "_It was a real maintenance headache. Adding anything to it was difficult, and any errors would require us to reload all the data again from the source database, which would take hours or days. We couldn't build anything new, and we didn't really want to maintain it long-term._"

<CTABlock />

## How to Find the Right Solution for Real-Time Dashboards

As Unimarket set out to find a new solution, they assessed their options along five criteria -- the last two being the most critical:

1.  Cost
2.  Ease of getting data in
3.  Easy integration
4.  Data latency
5.  Maintainability

The dashboarding product needed to be fast. As changes happened in the main application, they needed to be visible to customers right away -- not an hour or so later.

It also needed to be easy to maintain. While the Unimarket team was lean, they all knew SQL -- and knew that a SQL-based approach would better enable easy maintenance and quick adjustments.

Traditional data warehouses were unable to meet Unimarket's needs for a low-latency, cost-effective solution. According to Hollis, "_It was going to be quite expensive just to load the data into a data warehouse, and it would have been an hour or so out of date -- not real-time. Running queries in a data warehouse is fine -- but that costs money, and we were unsure of the total costs of ownership._"

Third-party reporting solutions also proved to be too expensive and too slow. As Hollis described, "_We looked at that path quite a bit, but the costs were quite expensive. The timeliness of the data was a problem and trying to get data in an efficient manner was also an issue. It was going to be a lot of work to integrate a third-party reporting tool into our application._"

## Materialize as a Drop-in Solution for Real-Time Dashboards

After a thorough search, Unimarket used Materialize as a drop-in replacement for their star schema database to power real-time dashboards using standard SQL. According to Hollis, "_Real-time dashboards with easy maintenance were two things we couldn't do previously, and that's where Materialize looks great. With Materialize we can build new dashboards a lot more efficiently than we could previously._"

Unimarket's main database is Google Cloud SQL. Debezium is used to pull data from binary logs, where it is made available on a file system. Materialize picks up the data from the file system and summarizes the data in the form of materialized views. The data is then made available to Unimarket via a microservice which talks directly to Materialize instead of the star schema database.

<QuoteBlock text="Real-time dashboards with easy maintenance were two things we couldn't do previously, and that's where Materialize looks great. With Materialize we can build new dashboards a lot more efficiently than we could previously." attribution="Damien Hollis" />

## Unimarket Architecture Diagram - Before Materialize

![](https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/diagram-1_2x.svg)
_Pictured Above: When data that needs to go to the OLAP system is created, updated, and deleted, Unimarket automatically generates events containing the current state of the data and publishes them on JMS queues. A microservice picks up those events and writes the corresponding data to the OLAP star schema database. The microservice also generates aggregates and snapshots to support known dashboard queries. If Unimarket needs to query something else, they either query the raw star schema database or create new aggregates and snapshots. The call from Unimarket to the OLAP system and microservice called 'Query Dashboard Data' is where they get the data out of the OLAP system for rendering on the dashboards._

### Unimarket Architecture Diagram - After Materialize

![](/svgs/diagram-2@2x.svg)

Pictured above: Unimarket writes to CloudSQL with no knowledge that certain data is of interest to the OLAP system. TB (Debezium) is configured to read from CloudSQL and make the data available to Materialize. The OLAP server defines several sources and views that it creates in Materialize when it starts up. When Unimarket requests data 'Query Dashboard Data,' the microservice queries the materialized views that it defined. From Unimarket's perspective nothing has changed -- the API is identical. The microservice code is a lot simpler because they removed all the code that read from JMS and wrote to the star schema database.\*

## Improving Dashboard Update Speed by 2x

With Materialize, the dashboards operate in the same fashion from an end-user UI perspective. No learning or ramp-up time was necessary for customers to get acquainted with the new technology powering their dashboards. The only noticeable difference from the end-user perspective was faster updates as Materialize improved dashboard update speed by 2x.

The dashboards provide two actionable pieces of information to customers: spend allocation by supplier and category and procurement process performance. The former dashboard can be used to consolidate inventory and shipping costs while the latter dashboard can be used to reduce the time it takes to obtain procurement approvals. Both dashboards are now built on top of Materialize.

![](/svgs/b-a@2x.svg)

Before Materialize, whenever the dashboard stopped working (roughly every month) Unimarket was forced to dedicate an engineer's entire week on dashboard maintenance. This process entailed reloading the data for Unimarket's affected customers which meant customers could not use their dashboard for this period of time while the reload occurred. According to Hollis, "_Reloads were also a bit of work to set up and always made us nervous if the same issue happened again. Because we knew we wanted to replace what we had, we didn't feel like spending a lot of time tracking down obscure bugs. With Materialize it's a much easier process than previously was the case._" After Materialize, the team has been able to substantially reduce maintenance costs and reprioritize developer resources towards higher priority projects.

Additionally, fixing OLAP code was a multi-day process. "_With Materialize, if this problem occurs, fixing it is much simpler because we just need to redefine some views and restart the system. It's up and running again in a few hours versus several days._"

As Hollis summarizes, "_We're saving on engineering costs with Materialize. We don't have to spend time and energy maintaining something fragile and difficult -- we can use that time on more important things -- like building new dashboards more efficiently._"

With a new framework for analytics, the Unimarket engineering team can take on additional, higher value projects. As Hollis described, "_Previously, maintenance costs were preventing us from building any new dashboards. We would de-prioritize feature requests because of our existing tooling and resources. Now, when the Product team arrives with new ideas, we're able to say 'Yes, we can do that' -- rather than worrying about the cost._"

<QuoteBlock text="We're saving on engineering costs with Materialize. We don't have to spend time and energy maintaining something fragile and difficult - we can use that time on more important things - like building new dashboards more efficiently." attribution="Damien Hollis" />

---

## Want to learn more about Materialize?

Materialize is a streaming database for real-time analytics. Materialize simplifies how developers build with real-time data, using incremental computation to provide low latency, correct answers -- all using standard SQL. With nearly a decade of technical research behind it, Materialize was launched to address the growing need for the ability to build real-time applications easily and efficiently on streaming data so that businesses can obtain actionable intelligence from streaming data.

We encourage you to try us out by [signing up for Materialize](https://materialize.com/register/) or [join](https://materializecommunity.slack.com/join/shared_invite/zt-ljdufufo-PTwVPmgzlZtI7RIQLDrAiA#/shared-invite/email) the discussion in our Community!
