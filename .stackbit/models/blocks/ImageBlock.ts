import type * as Stackbit from '@stackbit/sdk'

export const ImageBlock: Stackbit.YamlObjectModel = {
  "type": "object",
  "extends": ['Block'],
  "label": "Image",
  "fields": [
    {
      "type": "image",
      "name": "image",
      "label": "Image",
      "required": true
    },
    {
      "type": "markdown",
      "name": "text",
      "required": false,
      "label": "Caption"
    }
  ]
}