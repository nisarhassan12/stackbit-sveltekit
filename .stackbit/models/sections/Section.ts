import type * as Stackbit from '@stackbit/sdk'

export const Section: Stackbit.YamlObjectModel = {
  "type": "object",
  "name": "Section",
  "label": "Section",
  "labelField": "title",
  "fieldGroups": [
    {
      "name": "content",
      "label": "Content",
      "icon": "memo"
    },
    {
      "name": "styles",
      "label": "Styles",
      "icon": "palette"
    },
    {
      "name": "advanced",
      "label": "Advanced",
      "icon": "gear"
    }
  ],
  "groups": [
    "SectionComponents"
  ],
  "fields": [
    {
      "type": "string",
      "name": "eyebrow",
      "required": false
    },
    {
      "type": "string",
      "name": "title",
      "required": false
    },
    {
      "type": "markdown",
      "name": "text",
      "required": false
    },
    {
      "type": "list",
      "name": "items",
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
      "name": "featuredItem",
      "groups": [
        "BlockComponents"
      ],
      "required": false
    },
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
    {
      "type": "enum",
      "name": "layout",
      "required": false,
      "group": "styles",
      "options": [
        "default",
        "compact",
        "bigFeature",
        "itemsOnSide"
      ]
    },
    {
      "type": "enum",
      "name": "itemType",
      "required": false,
      "group": "styles",
      "options": [
        "Default",
        "Tiny",
        "CircleIcon",
        "Alternating",
        "GradientBorder",
        "SolidBackground",
        "LinkSet"
      ]
    },
    {
      "type": "enum",
      "name": "itemColumns",
      "required": false,
      "group": "styles",
      "options": [
        "auto",
        "one",
        "two",
        "three",
        "four"
      ]
    },
    {
      "type": "enum",
      "name": "theme",
      "label": "Theme (light or dark)",
      "required": false,
      "controlType": "button-group",
      "options": [
        "dark",
        "light"
      ],
      "group": "styles"
    },
    {
      "type": "enum",
      "name": "width",
      "label": "Width",
      "required": false,
      "group": "styles",
      "controlType": "button-group",
      "options": [
        "tight",
        "wide",
        "max"
      ]
    },
    {
      "type": "enum",
      "name": "spacing",
      "label": "Vertical Spacing",
      "required": false,
      "group": "styles",
      "controlType": "button-group",
      "options": [
        "normal",
        "tight",
        "screen",
        "negative"
      ]
    },
    {
      "type": "enum",
      "name": "featureSize",
      "options": [
        "normal",
        "half",
        "small",
        "large"
      ],
      "required": false,
      "group": "styles"
    },
    {
      "type": "boolean",
      "name": "swap",
      "label": "Swap Left and Right",
      "required": false,
      "group": "styles"
    },
    {
      "type": "enum",
      "name": "gradientOffsetBackdrop",
      "required": false,
      "options": [
        "normal",
        "inverse",
        "transparent",
        "half"
      ],
      "group": "styles"
    },
    {
      "type": "enum",
      "name": "backgroundStyle",
      "required": false,
      "group": "styles",
      "options": [
        {
          "label": "Materialize",
          "value": "bg-materialize"
        },
        {
          "label": "Triangles",
          "value": "bg-triangles"
        },
        {
          "label": "Circles",
          "value": "bg-circles"
        },
        {
          "label": "Dots",
          "value": "bg-dots"
        },
        {
          "label": "Lines",
          "value": "bg-lines"
        },
        {
          "label": "Lines and Circles",
          "value": "bg-linesAndCircles"
        },
        {
          "label": "Concentric Circles",
          "value": "bg-concentricCircles"
        },
        {
          "label": "Stripes",
          "value": "bg-stripes"
        },
        {
          "label": "Grid",
          "value": "bg-grid"
        }
      ]
    }
  ]
}