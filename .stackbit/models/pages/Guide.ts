import type * as Stackbit from '@stackbit/sdk'

export const Guide: Stackbit.YamlPageModel = {
  type: 'page',
  urlPath: '/guides/{slug}',
  filePath: 'guides/{slug}.md',
  extends: ['Post']
  }