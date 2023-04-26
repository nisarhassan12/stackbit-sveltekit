---
layout: 'Post'
title: 'Introducing Materialize: the Streaming Data Warehouse'
date: '2020-02-18'
category: 'Company News'
image: 'https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/introducing-materialize-warehouse.webp'
description: 'Despite substantial progress, data still moves too slowly. The solution is a different paradigm: Streaming. Materialize is a streaming data warehouse built on principles of interoperability and consistency at millisecond latency.'
people_refs:
  - frank-mcsherry
  - arjun-narayan
---

Databases, and data infrastructure generally, have made substantial progress over the years.

We now have access to cloud-native infrastructure that allows just about anyone to set up, maintain, and query databases at substantial scale. This is a serious departure from the monolithic software of years past, where getting access to a database involved multiple people and several companies.

However, the data still doesn't move as fast as it should.

We believe that all information across an enterprise should be up-to-date, immediately. When a storefront accepts an order from a customer, this information should be visible everywhere: from portals used by customer service agents, to back-office inventory management and logistics, from mobile apps that consumers use to track their order, to business analysts optimizing their organization. There is little gained, and a great deal lost, by slowing down the movement of data. No data user wants to wait overnight for “jobs” to complete. Often even minutes can be too long. **Demand milliseconds**.

This shouldn't come at the cost of the gains made by data infrastructure over the years: analysts still want to use declarative query languages rather than directly programming applications. **Interoperability** is paramount: existing dashboards, visualization, and tooling use standards and protocols that cannot simply be jettisoned. Cloud-native deployment is non-negotiable. A viable solution should look and feel like much of existing infrastructure, except instantaneous.

We also cannot regress on delivering **strong consistency**. When there are moments between changes to your data and analysts observing the results, users should never be presented with incorrect information. All results should reflect correct answers at some point in time (which ideally moves forward as briskly as possible).

Given these requirements, how do we get there? Traditional data processing infrastructure, but faster, isn't the answer: it’s designed to repeatedly ask about the current state of the world, rather than to react to those changes that occur, as they occur. We need fundamentally new infrastructure based on **reactive** models of computation, that move new information through established dataflows as quickly as possible.

### Streaming without Compromises

We believe that streaming architectures are the **only** ones that can produce this ideal data infrastructure. Streaming is more than a different programming model, pivoting data processing from a query-based "polling" design - with staleness built in - to a reactive model that responds to changes the moment they happen. It also bypasses repeated work on unchanged data, which allows it to scale to substantially larger volumes of work.

To fully leverage streaming's potential, we need to rebuild the data warehouse from the inside out, so that users do not have to rebuild their data infrastructure themselves. Many people hoped that event-streaming itself would be the revolution. Cobbled together with free software, streaming is indeed an exciting development, but today requires huge sacrifices in interoperability, flexibility, and ease of use. Catering to data platform experts, it leaves millions of users who would benefit from real-time analytics behind. We believe the real solution looks a lot more like the familiar data warehouse that organizations have been used to for decades, modernized for the always-up-to-date real-time world of 2020, with industry-standard SQL as the interface.

Today we’d like to introduce Materialize: the first Streaming Data Warehouse. It connects directly to your existing event-streaming infrastructure, and to the client, it walks and quacks like Postgres, so that familiar tooling can plug-and-play with it exactly as if they’re talking to an analytics-capable read-replica of an OLTP database. Materialize builds on top of years of award-winning research and open-source development. Built on top of the Timely Dataflow research project, it gives users the power of cutting-edge streaming computation with the declarative ease of PostgreSQL.

We’re excited to take the wrapping off of Materialize today. [Download it](https://materialize.com/docs/get-started/) to play around on your laptop, check out the source [on GitHub](http://github.com/materializeinc/materialize), or sign up for regular updates to this blog!
