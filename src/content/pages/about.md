---
layout: Page
label: About
title: Meet Materialize
description: >-
  Meet the Materialize Team, learn about the principles and values that
  Materialize operates by, and see job openings.
image: https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/meta-about.webp
sections: [
  {
    type: "Section",
    headerAppearance: 'horizontal',
    variant: "tight",
    heading: "Incremental approach, {{transformative results.}}",
    text:  "You shouldn't have to throw away the database to build with fast-changing data. Keep the familiar SQL, keep the proven architecture of cloud warehouses, but swap the decades-old batch computation model for an **efficient incremental engine** to get complex queries that are always up-to-date.
    <br /> <br/> **That is Materialize,** the only true SQL streaming database built from the ground up to meet the needs of modern data products: Fresh, Correct, Scalable — all in a familiar SQL UI.",
    textSize: "medium",
  },
  {
    type: "Section",
    cards: [
      {
        "heading": "Built on Mature Technology",
        "text": "Built on [Timely Dataflow](https://github.com/TimelyDataflow/timely-dataflow) and [Differential Dataflow](https://github.com/TimelyDataflow/differential-dataflow), open source frameworks created by cofounder Frank McSherry at Microsoft Research.",
        "button": {
          "label": "View Timeline",
          "url": "#timeline"
        }
      },
      {
        "heading": "$100 Million Raised",
        "text": "Funded by firms with a track record of success in databases.",
        "button": {
          "label": "View Investors",
          "url": "#investors"
        }
      },
      {
        "heading": "Trusted in Production",
        "text": "Data and Engineering Teams at industry-leading companies run production workloads at scale in Materialize.",
        "button": {
          "label": "View Customer Stories",
          "url": "/customer-stories/"
        }
      },
      {
        "heading": "Get Access",
        "gradientBorder": true,
        "text": "Build real-time data products with unbounded scale on Materialize.",
        "button": {
          "label": "Register for Access",
          "url": "/register/",
          "classNames": "self-start",
          "variant": "cta"
        }
      },
    ]
  },
  {
    type: "Section",
    heading: "Founded from {Deep Technical Experience}",
    employees: [
      {
        heading: 'Cofounders',
        groups: ["founders"],
        layout: "detailed",
      },
      {
        heading: "Leadership Team",
        groups: ["leadership"],
        layout: "detailed",
      }
    ]
  },
  {
    type: "Investors"
  },
  {
    type: "Section",
    id: "timeline",
    heading: "Mature Technology, {Long-Term Vision}",
    text: "Materialize builds on frameworks originally developed at Microsoft Research.",
    items_appearance: "timeline",
    items: [
      {
        "eyebrow": "2013",
        "icon": "DocumentTextOutline",
        "heading": "Naiad: A Timely Dataflow System Paper published",
        "text": "Materialize cofounder Frank McSherry and his collaborators first share their work on Timely Dataflow, in a paper while working at Microsoft Research.",
        "button": {
          "label": "Read Paper",
          "url": "https://sigops.org/s/conferences/sosp/2013/papers/p439-murray.pdf",
          "variant": "text"
        }
      },
      {
        "eyebrow": "2015",
        "icon": "CodeSlashOutline",
        "heading": "Timely Dataflow in Rust",
        "text": "Frank begins an open source project on timely dataflow written in Rust, the foundational building block on which Materialize is built.",
        "button": {
          "label": "View Repo",
          "url": "https://github.com/TimelyDataflow/timely-dataflow",
          "variant": "text"
        }
      },
      {
        "eyebrow": "Jan 2019",
        "icon": "HomeOutline",
        "heading": "Company Founded",
        "text": "Materialize founded by Arjun Narayan and Frank McSherry."
      },
      {
        "eyebrow": "Feb 2019",
        "icon": "StatsChartOutline",
        "heading": "Series A",
        "text": "$8.5m Series A from Lightspeed, still in stealth"
      },
      {
        "eyebrow": "Feb 2020",
        "icon": "RibbonOutline",
        "heading": "First Public Release",
        "text": "First public release of Materialize as a source-available single binary, built in Rust."
      },
      {
        "eyebrow": "November 2020",
        "heading": "Series B",
        "icon": "StatsChartOutline",
        "text": "Materialize raises $32M Series B from Kleiner Perkins",

      },
      {
        "eyebrow": "Sep 2021",
        "icon": "StatsChartOutline",
        "heading": "Series C",
        "text": "Materialize Raises $60M Series C from Redpoint",
      },
      {
        "eyebrow": "Oct 2022",
        "icon": "CloudyOutline",
        "heading": "Cloud Platform",
        "text": "Materialize unbundles the single binary into a cloud-native distributed system to unlock the next phase of scale.",
        "button": {
          "label": "Read More",
          "url": "/blog/next-generation/",
          "variant": "text"
        }
      },
    ]
  },
  {
    type: "Section",
    heading: "Built on {Strong Principles}",
    cards: [
      {
        "heading": "Build to last",
        "text": "We build based on a well-researched, long-term vision, and we take the time to build it well."
      },
      {
        "heading": "Be frank",
        "text": "Transparency is central to our culture. We extend transparency to our customers: we show them our code, and give them realistic expectations about what is possible."
      },
      {
        "heading": "Take ownership",
        "text": "We actively own the success of the projects we’re working on and the teams we’re working with."
      },
      {
        "heading": "Default to trust",
        "text": "We put ego aside and give teammates and customers a level of trust that empowers them to take action."
      },
      {
        "heading": "Write things down",
        "text": "We take the time to write things down so that others can understand what we've done and how."
      }
    ]
  },
  {
    type: "Section",
    heading: "Join Our {Team}",
    text: "Help us build the next generation of streaming data tools.",
    buttons: [
      {
        label: "View Jobs",
        url: '/careers#jobs',
        size: "md",
        variant: "ghost"
      }
    ]
  }
]
---
