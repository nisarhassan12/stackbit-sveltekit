import type * as Stackbit from '@stackbit/sdk'

export const TableBlock: Stackbit.YamlObjectModel = {
  "type": "object",
  "extends": ['Block'],
  "label": "Table Block",
  "fields": [
    {
      "type": "markdown",
      "name": "text",
      "required": true,
      "label": "Table Markdown/HTML"
    },
  ]
}