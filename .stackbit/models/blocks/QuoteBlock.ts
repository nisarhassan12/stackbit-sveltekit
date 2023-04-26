import type * as Stackbit from '@stackbit/sdk'

export const QuoteBlock: Stackbit.YamlObjectModel = {
  "type": "object",
  "extends": ['Block'],
  "label": "CTA Block",
  "fields": [
    {
      "type": "reference",
      "name": "person",
      "required": false,
      "models": ["Person"]
    },
    {
      "type": "markdown",
      "name": "text",
      "required": true,
      "label": "Quote Text"
    },
    {
      "type": "string",
      "name": "attribution",
      "required": false,
      "label": "Attribution (optional)"
    },
  ]
}