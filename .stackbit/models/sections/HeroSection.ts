import type * as Stackbit from '@stackbit/sdk'

export const HeroSection: Stackbit.YamlObjectModel = {
  "type": "object",
  "label": "Hero Section",
  "groups": [
    "SectionComponents"
  ],
  extends: ['Section']
}