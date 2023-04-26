import type * as Stackbit from '@stackbit/sdk'

export const ItemBlock: Stackbit.YamlObjectModel = {
  "type": "object",
  "extends": ['Block'],
  "label": "Default Item",
  "fields": [
    {
      "type": "string",
      "name": "eyebrow",
      "required": false
    },
    {
      "type": "enum",
      "name": "icon",
      "required": false,
      "label": "Icon (view at heroicons.com)",
      "options": []
    },
    {
      "type": "list",
      "name": "callouts",
      "label": "Callouts",
      "required": false,
      "items": {
        "type": "model",
        "models": [
          "ItemBlock"
        ]
      }
    },
    {
      "type": "model",
      "name": "button",
      "models": [
        "Button"
      ],
      "required": false
    }
  ]
}
