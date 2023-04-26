import type * as Stackbit from '@stackbit/sdk'

export const IndexSection: Stackbit.YamlObjectModel = {
  "type": "object",
  "groups": [
    "SectionComponents"
  ],
  "extends": ['Section'],
  "fields": [
        {
          "type": "list",
          "name": "contentTypes",
          "items": {
            "type": "enum",
            "options": ['Page', 'Post', 'CustomerStory', 'Guide', 'UseCase', 'Integration', 'Event', 'PressRelease']
          }
    },
    {
      "type": "boolean",
      "name": "searchEnabled",
      "required": true,
      default: false
    }
  ]
}