import type * as Stackbit from '@stackbit/sdk'

export const PeopleSection: Stackbit.YamlObjectModel = {
  "type": "object",
  "groups": [
    "SectionComponents"
  ],
  extends: ['Section'],
  "fields": [
        {
          "type": "enum",
          "name": "layout",
          "default": "default",
          "options": [
            {
              "label": "Default",
              "value": "default"
            },
            {
              "label": "Detailed",
              "value": "detailed"
            }
          ]
        },
        {
          "type": "list",
          "name": "groups",
          "items": {
            "type": "enum",
            "options": [
              "Leadership",
              "Engineering & Product",
              "Sales, Marketing & Operations",
              "Developer Experience"
            ]
          }
    }
  ]
}