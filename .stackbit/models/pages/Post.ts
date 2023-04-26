import type * as Stackbit from '@stackbit/sdk'

export const Post: Stackbit.YamlPageModel = {
  type: 'page',
  urlPath: '/blog/{slug}',
  filePath: 'blog/{slug}.md',
  fields: [
      {
        "type": "string",
        "name": "title",
        "required": true
      },
      {
        "type": "string",
        "name": "description",
        "default": "Excerpt goes here ..."
      },
      {
        "type": "date",
        "name": "date",
        "required": true
      },
      {
        "type": "list",
        "name": "people_refs",
        "label": "Authors",
        "items": {
          "type": "reference",
          "models": [
            "Person"
          ]
        }
      },
      {
        "type": "image",
        "name": "image",
        "required": false
      },
      {
        "type": "enum",
        "name": "category",
        "default": "General",
        "options": [
          "Company News",
          "Product Update",
          "Technical Article",
          "Ecosystem & Integrations",
          "Key Concept"
        ]
      }
    ]
  }