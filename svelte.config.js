import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';
import { h } from 'hastscript';
import { highlightCode } from './src/lib/utils/highlight.js';
import { mdsvexGlobalComponents } from './src/lib/utils/mdsvex-global-components.js';
import rehypeWrap from 'rehype-wrap-all';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		}),
		mdsvexGlobalComponents({
			dir: `$lib/components`,
			list: [
				['CTABlock', 'cta-block.svelte'],
				['CodeFence', 'code-fence.svelte'],
				['QuoteBlock', 'quote-block.svelte'],
				['InlineSvg', 'inline-svg.svelte']
			],
			extensions: ['.md']
		}),
		mdsvex({
			extensions: ['.md'],
			highlight: {
				highlighter: highlightCode
			},
			remarkPlugins: [
				remarkDirective,
				[
					() => {
						return (tree) => {
							visit(tree, (node) => {
								if (
									node.type === 'textDirective' ||
									node.type === 'leafDirective' ||
									node.type === 'containerDirective'
								) {
									if (node.name !== 'note') return;

									const data = node.data || (node.data = {});
									const tagName = node.type === 'textDirective' ? 'span' : 'div';

									data.hName = tagName;
									data.hProperties = h(tagName, node.attributes).properties;
								}
							});
						};
					}
				],
				remarkGfm
			],
			rehypePlugins: [
				[rehypeWrap, { selector: 'table', wrapper: 'div.overflow-auto' }],
				rehypeSlug,
				rehypeAutolinkHeadings
			]
		})
	],

	kit: {
		adapter: adapter(),
		prerender: {
			crawl: true,
			entries: [
				'/',
				'/use-cases/automation-and-alerting',
				'/use-cases/machine-learning-ops',
				'/use-cases/real-time-analytics',
				'/use-cases/segmentation-and-personalization',
				'/blog',
				'/events',
				'/guides',
				'/customer-stories',
				'/careers',
				'/about',
				'/about/news-and-press'
			]
		}
	}
};

export default config;
