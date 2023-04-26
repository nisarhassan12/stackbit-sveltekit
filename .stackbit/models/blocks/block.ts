import type * as Stackbit from '@stackbit/sdk'

export const block: Stackbit.YamlObjectModel = {
  "type": "object",
  "label": "Generic Block",
  "labelField": "title",
  "groups": [
    "BlockComponents"
  ],
  "fields": [
    {
      "type": "string",
      "name": "title",
      "required": false,
    },
    {
      "type": "markdown",
      "name": "text",
      "required": false,
    },

  ]
}