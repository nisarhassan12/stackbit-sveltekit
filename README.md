# Materialize Marketing Site

This is the site found at [materialize.com](https://materialize.com).

**Want to contribute?** There are several ways:

1. Clone the repo, develop locally, send a PR
2. Edit in CMS - LINK
3. Edit in GitHub - LINK

# Technology Overview

The site is built using [SvelteKit](https://kit.svelte.dev/) as the web framework, [TailwindCSS](https://tailwindcss.com/) as the CSS framework, [Stackbit](https://www.stackbit.com/) as the CMS (⚠️ **Note:** All content is also in this repo, Stackbit is just a UI for making changes without getting into the code), and it is deployed as static files on S3.

# Structure of this Repo

- **∟📁 `.stackbit`** - contains the content modelling config that tells the CMS (Stackbit) how to make the content in `src/content` editable in the Stackbit UI
- **∟📁 `scripts`** - utility scripts used during the build and deploy process.
- **∟📁 `src/content`** - markdown files corresponding to each page in the site.
- **∟📁 `src/content/blog`** - Blog posts are here!
- **∟📁 `src/data`** - JSON files containing structured data like employees, pricing, etc...
- **∟📁 `src/routes`** - JSON files containing structured data like employees, pricing, etc...
- **∟📁 `static`** - Everything in this directory (fonts, images, etc...) is shipped unmodified with the build to S3

# Anatomy of a Page Markdown File

The content and structure of pages is defined almost completely in the frontmatter of a markdown file. Some pages like legal and privacy policy pages will also have a block of markdown below the frontmatter. Most pages on the marketing site are horizontal stacks of `sections` which are also defined in the frontmatter.

Required frontmatter: See [`.stackbit/models/Page.ts`](.stackbit/models/Page.ts) for the schema of frontmatter on a Page.

# Anatomy of a Blog Post

A blog post is made up of some YAML frontmatter (wrapped in three hyphens `---` at the beginning of the file) followed by the content in markdown.

Required frontmatter: See [`.stackbit/models/Post.ts`](.stackbit/models/Post.ts) for the schema of frontmatter on a Post.

We support Github-flavored markdown, with a few additions:

- **Note Blocks:** Use the following syntax to generate specially highlighted notes blocks:
  ```
  :::note{.info}
  Your message here.
  :::
  ```
- **TBD** - @nisar we need to decide which inline components we want to support.

# Development principles:

## 1. Optimize for Shipping Speed

The faster we can iterate, the less time it takes to create new pages, new content, new messaging on the marketing site, the better.

### Reduce Ramp-Up Time for New Contributors

A new technical contributor should be able to quickly get up-to-speed on how to work on the marketing site.

- CONTRIBUTING.MD - This file should be up-to-date and include all information needed to get started with the repo locally, and all guidelines and process around submitting a PR.
- README.MD - This file should contain an overview of the structure of the repo, along with development principles to guide a contributor on how to structure changes or new contributions.

### Reduce Time for Iterative Development

Fast CI

### Make Editing Easy

Editing content, whether via CMS or in repo, should be easy, intuitive and low-risk.

## 2. Only render client-side when the content changes outside build-time.

Everything that can be rendered server side should be rendered server side.

**Render server-side:**

1. All content coming from the src/content and src/data directory.
2. All markdown.

**Render client-side:**

1. HubSpot forms - admins change these in Hubspot, outside the build process, so they should be rendered server side.
2. Job Listings - same as above


## 3. Strive for healthy division of content and code

There is not a hard and fast rule that "all content must be separated out into the `src/content` directory and editable via CMS, but doing so has two benefits:

1. **Empowers non-technical users** It expands the group of potential contributors for that content to everyone with access to Stackbit.
2. **Forces thoughtful content modeling** - If we take the time to define a content structure, we are forced to be more thoughtful about things like information hierarchy and rewarded for keeping things simple and consistent.

On the flip side, if we go too far and try to make everything editable in a CMS, we will just end up with a complicated CMS that nobody uses and an even more complicated codebase.

This is why we are looking for the happy middle ground. Here are some examples of what to make editable and what not to:

**Make it Editable:**

- Everything that a non-technical user might contribute: Events, Blog Posts, Promoted Posts, Guides, Customer Stories, etc...


**Keep it in Code:**

- Anything animated or interactive
- Things that are part of the interface, not the content. Like the Social Links.

