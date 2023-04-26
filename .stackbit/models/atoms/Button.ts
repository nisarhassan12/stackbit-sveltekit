import type * as Stackbit from '@stackbit/sdk'

export const Button: Stackbit.YamlObjectModel = {
  "type": "object",
  "labelField": "text",
  "fields": [
    {
      "type": "string",
      "name": "text",
      "default": "Click Me",
      "required": true
    },
    {
      "type": "url",
      "name": "href",
      "default": "/",
      "required": true
    },
    {
      "type": "enum",
      "name": "variant",
      "controlType": "dropdown",
      "default": "cta",
      "options": [
        {
          "label": "Primary",
          "value": "cta"
        },
        {
          "label": "Secondary",
          "value": "ghost"
        },
        {
          "label": "Tertiary",
          "value": "text"
        }
      ]
    },
    {
      "type": "enum",
      "name": "size",
      "controlType": "dropdown",
      "default": "sm",
      "options": [
        {
          "label": "Small",
          "value": "sm"
        },
        {
          "label": "Medium",
          "value": "md"
        }
      ]
    },
    {
      "type": "boolean",
      "name": "shadow",
      "label": "Add Drop Shadow",
      "required": false
    },
    {
      "type": "boolean",
      "name": "gradient",
      "label": "Add Gradient",
      "required": false
    },
    {
      "type": "boolean",
      "name": "arrow",
      "label": "Add Arrow",
      "required": false
    },
    {
      "type": "boolean",
      "name": "download",
      "label": "Download File?",
      "required": false
    }
  ]
}




