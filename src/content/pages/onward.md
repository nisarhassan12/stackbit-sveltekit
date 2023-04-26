---
layout: CustomerStory
label: Onward
date: '2023-03-27'
title: Real-Time Delivery Tracking UI in a single sprint at Onward
excerpt: >-
  Using Materialize gave Onward the ability to provide a real-time delivery tracking UI in two weeks of work with minimal ongoing maintenance.
highlight: >-
  I never have to think about Materialize, which is great for a one-person data engineering team.
people_refs:
  - content/data/people/clayton-van-hovel.json
logo: '/images/logos/onward.png'
squareImage: >-
  https://res.cloudinary.com/mzimgcdn/image/upload/v1679938191/onward-square.webp
image: >-
  https://res.cloudinary.com/mzimgcdn/image/upload/v1679937470/onward-customer-story-header.webp
sidebar:
  - heading: At a Glance
    subheading: >-
      Onward is a white-glove marketplace for final mile big and bulky shipping.
  - heading: Industry
    subheading: Logistics
  - heading: Challenge
    subheading: >-
      They needed to serve real-time delivery status in customer-facing UI and notifications with a lean team of one data-engineer.
  - heading: Results
    subheading: >-
      Real-Time delivery tracking, **implemented in two weeks of work,** is a key selling point for new retail partners and an important user experience benefit for delivery customers.
---

## Summary

Onward is a white-glove marketplace for final mile big and bulky shipping. They needed a way to serve real-time delivery status in customer-facing UI and notifications. After choosing Materialize, they went from zero to fully operational **in less than two weeks of work.**

![Onward delivery status UI example](https://res.cloudinary.com/mzimgcdn/image/upload/v1679933741/onward-delivery-ui-example.png)

Today, Materialize is joining and transforming real-time delivery and customer data, and serving results to a reactive UI that updates using real-time subscriptions.

## Company Background

Onward succeeds by providing a better experience for the retailer and the customer. A key lever they have in that mission is technology. For example, from the beginning, they were able to drive efficiencies by using matchmaking algorithms to assign deliveries to trucks with compatible routes.

They knew that real-time tracking and notifications would be a key differentiator on both sides of their marketplace. This feature would be useful in winning over the business of new retailers, and even more useful in improving the experience of the delivery recipient.

Companies like Amazon and Uber have raised the bar for real-time UI in regular e-commerce and delivery. Real-time logistics for last-mile delivery of big and bulky items like furniture and mattresses is arguably more important, _you can’t exactly leave a couch on someone’s doorstep,_ but the state of technology in the industry is typically much worse.

## The Challenge

Onward needed to provide best-in-class real-time delivery tracking on par with Uber, but with a much smaller budget and a team of **one data engineer!**

## Potential Solutions

Real-time location tracking is well-suited to an append-only log like Kafka, so Clayton had already done the work to get active deliveries and location pings from delivery trucks streaming into Kafka.

Next they needed a solution for the transforming and serving steps.

Clayton first explored using ksqlDB, but configuring and managing it proved too labor-intensive for a team of one: “We got data flowing into ksqlDB locally, but we needed something managed and we hit dead-ends getting the joins, transformations and queries we needed working in ksqlDB cloud, so we decided to try Materialize.”

## Materialize

“Getting Data flowing in from Kafka was a breeze.” Clayton was able to quickly set up a secure [connection from Materialize to Upstash](https://materialize.com/docs/integrations/upstash-kafka/), which they were using for managed Kafka.

![Onward Materialize Architecture](https://res.cloudinary.com/mzimgcdn/image/upload/v1679933741/onward-delivery-materialize-architecture.png)

From there, Clayton was able to grant the necessary read privileges to his application team, who then used the [SUBSCRIBE](https://materialize.com/docs/sql/subscribe/) primitive in Materialize in their API layer to efficiently route live location updates to active sessions in the client application.

The application team got running without any hiccups, due in part to the fact that the API’s they were using were standard PostgreSQL. No new dependencies, no SDK’s, just [stable PostgreSQL drivers](https://materialize.com/docs/integrations/#client-libraries-and-orms).

<CTABlock />

At that point, customers watching delivery status were seeing a map with live location tracking of their delivery, powered by Materialize.

As impressive as the customer-facing capabilities was the time to ship: “Only about two weeks worth of work was required to go from first conversation about Materialize to customer-facing location tracking.”

## Conclusion and Future Use Cases

<QuoteBlock text="I never have to think about Materialize, which is great for a one-person data engineering team." attribution="Clayton Van Hovel" />

The biggest highlight for Clayton came after the initial setup: “I never have to think about Materialize, which is great for a one-person data engineering team.” Materialize has proven to be incredibly low-maintenance once set up, a vital attribute for a tool operated by a one-person data engineering team.

Clayton and the team at Onward see new business cases for Materialize around user-facing notifications, as well as a potential replacement for certain batch workflows like internal analytics and dashboards, especially as the managed streaming data ecosystem matures to provide capabilities on-par with batch.
