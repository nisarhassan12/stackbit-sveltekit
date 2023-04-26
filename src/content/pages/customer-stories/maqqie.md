---
layout: CustomerStory
label: Maqqie
date: '2021-10-26'
title: How Maqqie Built a Real-Time Application as an Early-Stage Company
excerpt: >-
  Materialize was the solution that met their real-time requirements with the
  lowest overhead. One Maqqie developer manages Materialize on his own.
highlight: >-
  Materialize has consistency guarantees; it’s correct, and not just eventually
  consistent. The alternatives simply don’t support consistency, and you end up
  wasting a lot of time implementing and troubleshooting.
people_refs:
  - johan-stuyts
logo: '/images/logos/maqqie.svg'
squareImage: >-
  https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/maqqie-square.webp
image: >-
  https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/maqqie-horizontal.webp
sidebar:
  - heading: At a Glance
    subheading: >-
      Maqqie is a logistics application startup and one of their primary
      services focuses on matching supply and demand on the labor market based
      on smart algorithms.
  - heading: Industry
    subheading: Logistics
  - heading: Data Volume
    subheading: >-
      Maqqie customers plan work shifts requiring thousands of workers for
      consecutive days at a time. Materialize provides real-time insights for
      their thousands of active record sets.
  - heading: Challenges
    subheading: >-
      Maqqie needed a cost-effective and efficient way to build a real-time work
      shift application as a means of differentiating themselves amongst other
      HR companies.
  - heading: Use Cases
    subheading: >-
      Maqqie used Materialize to build their work planning application. This
      service is provided as a dashboard to Maqqie customers to see worker shift
      data in real time so that customers can quickly make alternative plans if
      a shift is not properly staffed.
  - heading: Results
    subheading: >-
      Materialize was the solution that met their real-time requirements with
      the lowest overhead. One Maqqie developer manages Materialize on his own.
---

Maqqie is a logistics application startup and one of their primary services focuses on matching supply and demand on the labor market based on smart algorithms. Their service automatically facilitates everything that is needed to establish cooperation within a few minutes, and also handles planning, time registration, and invoicing. Their goal is to be the work platform of choice throughout Europe, and part of that mission means delivering a real-time experience to their customers.

Many of Maqqie's customers are in the catering and hospitality sector, so coordinating groups of people --- such as 48 consecutive hours of work requiring thousands of workers --- is standard. Without a real-time solution like Maqqie, getting a reliable report on staffing was a challenge.

According to Stuyts, "_Our stakeholders are constantly looking for available workers, and it's just not useful if that information is not up to date. And no one wants to click 'refresh' on a dashboard 50 times a day or more. We would have customers calling people asking them to cover a shift when, unbeknownst to them, a project was already fully staffed._"

The Maqqie Product team needed a real-time architecture to build a planning application that automatically updated worker shift data. Johan Stuyts, Data Architect and Backend Developer at Maqqie, was responsible for bringing this idea to life.

<QuoteBlock text="In terms of integrations, the fact that we could use common languages, protocols and systems to talk to Materialize, ensured that we could start with building functionality instead of integration code." attribution="Johan Stuyts" />

## Building a Fast Application, Fast

With a lean team, Maqqie needed a solution for real-time data that was easy to learn, use, and maintain. The simplicity of Materialize appealed to Maqqie.

As Stuyts described, "_You put in complex data, specify how to derive information using simple SQL views -- and the information comes out in an efficient manner._"

Stuyts was able to set up Materialize by himself despite not having any prior experience building streaming applications. According to Stuyts, "_If we had to build the application ourselves without Materialize, the cost would be way higher in terms of engineering hours. There's no doubt there. If you need real-time information, this is a cost-effective solution._"

Materialize is wire-compatible with PostgreSQL, presenting to downstream tools like any Postgres database. This streamlines the process of building and integrating with existing data analysis tools.

The process of connecting Materialize to other tooling was straightforward. As Stuyts described, "_In terms of integrations, the fact that we could use common languages, protocols and systems to talk to Materialize, ensured that we could start with building functionality instead of integration code. If Materialize had its own interface and there wasn't an easy way to talk with Materialize, we would not have used it. The fact that we could use Kafka and that I wouldn't have to build my own driver in Java was key. Writing integrations is very costly, and not something we were willing to commit to._"

<QuoteBlock text="With alternatives you can get some data out, but it doesn't relate to the actual data input. Materialize has consistency guarantees; it's correct, and not just eventually consistent. If the alternatives simply don't support consistency, you end up wasting a lot of time implementing and troubleshooting." attribution="Johan Stuyts" />

## Materialize offers ease and sophistication in streaming

With Materialize in place, Maqqie was successfully able to reduce the load on their production database. According to Stuyts, "_Without Materialize, the same functionality would not have been built. We could have done some query indexing, but we probably would have ended up overloading our database and servers because of all the heavy queries._"

"_When you think about your business and what you want to get out of your data, if you think that something is important, that should always be up to date. And it is possible to do this even with very complex data. Materialize is a testament of this._"

The process for building a real-time application with Materialize was also much faster due to its strong consistency guarantees. As Stuyts described, "_With alternatives you can get some data out, but it doesn't relate to the actual data input. Materialize has consistency guarantees; it's correct, and not just eventually consistent. If the alternatives simply don't support consistency, you end up wasting a lot of time implementing and troubleshooting. You run the risk of having to start all over with something else._"

<QuoteBlock text="When you think about your business and what you want to get out of your data, if you think that something is important, that should always be up to date. And it is possible to do this even with very complex data. Materialize is a testament of this." attribution="Johan Stuyts" />

## Building the Real-Time Data Stack at Maqqie

Vert.x was chosen to fit in Maqqie's data stack alongside Materialize because it has a reactive framework and its event bus can be extended to the front end, allowing for server push. While server push is possible with other technologies, Vert.x is unique as it provides an addressing mechanism allowing multiplexing of requests to multiple services. Maqqie uses the Materialize [SUBSCRIBE](https://materialize.com/docs/sql/subscribe/) function because it's reactive just like Vert.x, so the Maqqie application is only activated if Materialize has new information.

As soon as Materialize processes new data, SUBSCRIBE will capture updates instead of the complete result set. These updates flow through Vert.x (as the Postgres driver) to the browser, providing a real-time and reactive architecture through a minimal exchange of messages. The final materialized views are built from intermediate views to reduce the number of records Materialize needs to maintain to calculate the results.

<CTABlock />

In other words, Maqqie builds materialized views and stores them in Materialize. For each data point, which may consist of multiple values, a materialized view is managed. The browser subscribes to updates for each materialized view. Updates are aggregated until Materialize tells Maqqie all source changes have been processed. User actions are handled using JSON RPC (Spring).

As shown in the diagram below, these actions update the database and Materialize (through Kafka). Using SUBSCRIBE, any changes in the results of the demand-driven queries are sent from Materialize to the browser (through Vert.x as the Postgres driver). For each materialized view, Maqqie's components compute the final result set based on the sequence of Materialize updates for that materialized view.

## Maqqie Architecture Diagram

![](https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/diagram-maggie.webp)

## A seamless, real-time experience for Maqqie Customers

From an end-user perspective, Maqqie customers visualize the worker shift data from the planning application through a dashboard.

Maqqie customers see all projects of their client, including locations, assigned number of workers, work shifts and respective dates still needing workers (highlighted in red), full shifts and respectives dates, etc. Whenever somebody signs up for a work shift, that signup is reflected the moment the sign-up occurs. Given this data volume, Materialize handles thousands of active record sets at any given time for Maqqie.

![](/svgs/grid.svg)

By building the planning application with Materialize, Maqqie provided a valuable new service to their customers. Maqqie not only was able to use this service as a competitive differentiator, but they also opened a new revenue stream for their business.

Maqqie sees Materialize as opening the door to other real-time services in their business. Over time, they plan to explore other ways to present real-time data to their customers, by integrating Materialize into new and existing Maqqie products.

<QuoteBlock text="If we had to build the application ourselves without Materialize, the cost would be way higher in terms of engineering hours. There's no doubt there. If you need real-time information, this is a cost-effective solution." attribution="Johan Stuyts" />

Materialize is a streaming database for real-time analytics. Materialize simplifies how developers build with real-time data, using incremental computation to provide low latency, correct answers - all using standard SQL. With nearly a decade of technical research behind it, Materialize was launched to address the growing need for the ability to build real-time applications easily and efficiently on streaming data so that businesses can obtain actionable intelligence from streaming data.

We encourage you to try us out by [signing up for Materialize](https://materialize.com/register/) or [join](https://materializecommunity.slack.com/join/shared_invite/zt-ljdufufo-PTwVPmgzlZtI7RIQLDrAiA#/shared-invite/email) the discussion in our Community!
