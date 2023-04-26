import type * as Stackbit from '@stackbit/sdk'

export const InteractiveGraphicBlock: Stackbit.YamlObjectModel = {
  "type": "object",
  "extends": ['Block'],
  "label": "Interactive Graphic Block",
  "fields": [
    {
      "type": "enum",
      "name": "variant",
      "required": true,
      "options": [
        "shape-rotator"
      ]
    },
  ]
}