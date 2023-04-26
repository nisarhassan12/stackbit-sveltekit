import type * as Stackbit from '@stackbit/sdk'

export const Person: Stackbit.YamlDataModel = {
  type: 'data',
  filePath: 'people/{slug}.json',
  labelField: 'name',
  fields: [
      {
        "type": "enum",
        "name": "team",
        "options": [
          "Leadership",
          "Engineering",
          "Product",
          "Sales Engineering",
          "Developer Experience",
          "Marketing",
          "Operations",
          "External"
        ],
        "required": true
      },
      {
        "type": "image",
        "name": "image",
        "default": ""
      },
      {
        "type": "string",
        "name": "name",
        "required": true
      },
      {
        "type": "string",
        "name": "role",
        "required": true
      },
      {
        "type": "url",
        "name": "linkedin",
        "default": ""
      },
      {
        "type": "url",
        "name": "twitter",
        "default": ""
      },
      {
        "type": "url",
        "name": "github",
        "default": ""
      },
      {
        "type": "text",
        "name": "bio",
        "default": ""
      }
    ]
}
