import type * as Stackbit from '@stackbit/sdk'

export const Page: Stackbit.YamlPageModel = {
  type: 'page',
  urlPath: '/{slug}',
  filePath: '/{slug}.md',
  hideContent: true,
  fields: [
    { name: 'label', type: 'string', required: true, label: "Internal Label" },
    { name: 'title', type: 'string', required: true },
    { name: 'description', type: 'string', required: true },
    { name: 'image', type: 'image', required: false, label: 'Preview Image' },
    {
      name: 'sections',
      type: 'list',
      items: {
        type: 'model',
        groups: ['SectionComponents']
      },
    },
    { name: 'noindex', type: 'boolean', required: true, default: false },
  ],
}