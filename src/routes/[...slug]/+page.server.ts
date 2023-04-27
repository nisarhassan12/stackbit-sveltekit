import { getPageDataBySlug } from '$lib/utils/content.js';
import { kebabize } from '$lib/utils/index.js';
import showdown from 'showdown';

const { Converter } = showdown;
const converter = new Converter();

export const load = async ({ params }) => {
	const data: any = await getPageDataBySlug(params.slug);

	const metadata = data.metadata;
	const content = data.content.render().html;

	const hasSections = metadata && metadata.sections;

	const component_names = hasSections && metadata.sections.map((item: any) => kebabize(item.type));

	hasSections &&
		metadata.sections.forEach((section: any) => {
			Object.keys(section).forEach((key) => {
				if (key === 'text') {
					section[key] = `${converter
						.makeHtml(section[key])
						.replace('<p>', '')
						.replace('</p>', '')}`;
				}
				if (Array.isArray(section[key])) {
					section[key].map((k: any) => {
						if (k.text) {
							k.text = converter.makeHtml(k.text).replace('<p>', '').replace('</p>', '');
						}
					});
				}
				if (section[key].text) {
					section[key].text = converter
						.makeHtml(section[key].text)
						.replace('<p>', '')
						.replace('</p>', '');
				}
				if (section[key].caption) {
					section[key].caption = converter
						.makeHtml(section[key].caption)
						.replace('<p>', '')
						.replace('</p>', '');
				}
			});
		});

	return {
		metadata,
		component_names,
		content
	};

};
