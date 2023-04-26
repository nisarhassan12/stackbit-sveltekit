import type * as Stackbit from '@stackbit/sdk'

export const Event: Stackbit.YamlPageModel = {
  type: 'page',
  urlPath: 'events/{slug}',
  filePath: 'events/{slug}.md',
  extends: ['Post'],
  fields: [
    {
      "type": "enum",
      "name": "category",
      "default": "Community Meetup",
      "required": true,
      "options": [
        "Community Meetup",
        "Conference",
        "Webinar",
        "Hack Day"
      ]
    },
    {
      "type": "text",
      "name": "time",
      "required": true
    },
    {
      "type": "text",
      "name": "location",
      "required": true,
      "default": "Virtual"
    },
    {
      "type": "number",
      "name": "formId",
      "required": true,
      "default": 1007
    },
    {
      "type": "list",
      "name": "people_refs",
      "label": "Presenters",
      "items": {
        "type": "reference",
        "models": [
          "Person"
        ]
      }
    }
  ],
}