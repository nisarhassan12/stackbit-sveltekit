import type * as Stackbit from '@stackbit/sdk'

export const CTABlock: Stackbit.YamlObjectModel = {
  "type": "object",
  "extends": ['Block'],
  "label": "CTA Block",
  "fields": [
    {
      "type": "list",
      "name": "buttons",
      "required": false,
      "items": {
        "type": "model",
        "models": [
          "Button"
        ]
      }
    },
  ]
}