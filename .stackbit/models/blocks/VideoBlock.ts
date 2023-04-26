import type * as Stackbit from '@stackbit/sdk'

export const VideoBlock: Stackbit.YamlObjectModel = {
  "type": "object",
  "extends": ['Block'],
  "label": "Image",
  "fields": [
    {
      "type": "url",
      "name": "video_url",
      "label": "Video URL",
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