import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getPeople, getPosts, getJobs, getPageDataBySlug, getMetadataBySlug, enrichMetaData, getPeopleByGroup } from "$lib/utils/content";

const loaderMap: any = {
	people: getPeople,
	posts: getPosts,
	jobs: getJobs,
}

import showdown from 'showdown';
import { kebabize } from "$lib/utils";

const { Converter } = showdown;
const converter = new Converter();


export const load = (async ({ params }) => {
	const data = await getPageDataBySlug(params.slug);

	const { metadata } = data;
	const hasSections = metadata && metadata.sections

	const sections_with_content = hasSections && metadata.sections.filter((section: any) => section.loader);
	const sections_with_item_refs = hasSections && metadata.sections.filter((section: any) => section.item_refs);
	const sections_with_people = hasSections && metadata.sections.filter((section: any) => section.employees);

	if (sections_with_people) {
		sections_with_people.forEach(async (section: any) => {
			section.employees.forEach(async (e: any) => {
				e.groups.map(async (group: any) => {
					const data = await getPeopleByGroup(group);
					e.people = data;
				})
			})
		});
	}

	if (sections_with_item_refs) {
		sections_with_item_refs.forEach(async (section: any) => {
			const item_refs = section.item_refs;

			item_refs.forEach(async (item_ref: any) => {
				const data = await getMetadataBySlug(item_ref);
				section.featured = await enrichMetaData(data);
			});
		})
	}

	if (sections_with_content) {
		sections_with_content.forEach(async (section: any) => {
			if (section.contentTypes) {
				let contents: any = [];
				section.contentTypes.forEach(async (type: string) => {
					const data = await loaderMap[section.loader](type)
					const enriched = await Promise.all(await data.map(async (item: any) => {
						const enrichedItem = await enrichMetaData(item)
						return enrichedItem;
					}));

					contents = [...contents, ...enriched]
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					metadata.sections.find((s: any) => s.contentTypes === section.contentTypes).data = contents.sort((a: string, b: string) => new Date(b.date) - new Date(a.date))
					metadata.sections.find((s: any) => s.contentTypes === section.contentTypes).layout = params.slug
				})
			} else {
				const data = await loaderMap[section.loader](section.contentType);
				const enriched = await Promise.all(data.map(async (item: any) => {
					return await enrichMetaData(item);
				}))
				section.data = enriched;
				section.layout = params.slug
			}
		})
	}

	const component_names = hasSections && metadata.sections.map((item: any) => kebabize(item.type))



	hasSections && metadata.sections.forEach((section: any) => {
		Object.keys(section).forEach((key) => {
			if (key === 'text') {
				section[key] = `${converter.makeHtml(section[key]).replace('<p>', '').replace('</p>', '')}`
			}
			if (Array.isArray(section[key])) {
				section[key].map((k: any) => {
					if (k.text) {
						k.text = converter.makeHtml(k.text).replace('<p>', '').replace('</p>', '');
					}
				})
			}
			if (section[key].text) {
				section[key].text = converter.makeHtml(section[key].text).replace('<p>', '').replace('</p>', '');
			}
			if (section[key].caption) {
				section[key].caption = converter.makeHtml(section[key].caption).replace('<p>', '').replace('</p>', '');
			}
		})
	})

	// if ((metadata && metadata.sections)) {
	// 	metadata.sections.map((item: any) => {
	// 		Object.keys(item).map(key => {
	// 			if (Array.isArray(item[key])) {
	// 				item[key].map((i: any) => {
	// 					Object.keys(i).map(async k => {
	// 						if (k === 'inlineSVG') {
	// 							const name = i[k];
	// 							i[k] = await import(`../../lib/components/svgs/${name}.svelte`).then((m) => m.default)
	// 						}
	// 					})
	// 				})
	// 			}

	// 		})
	// 	})
	// }

	return {
		metadata,
		component_names,
	}
}) satisfies PageServerLoad;
