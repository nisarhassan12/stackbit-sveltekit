import type * as Stackbit from '@stackbit/sdk'

export const FormBlock: Stackbit.YamlObjectModel = {
  "type": "object",
  "extends": ['Block'],
  "label": "Form Block",
  "fields": [
    {
      "type": "string",
      "name": "formId",
      "required": true,
    },
  ]
}