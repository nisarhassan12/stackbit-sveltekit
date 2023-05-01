import { kebabize } from "$lib/utils";
import { getPageDataBySlug } from "$lib/utils/content";

export async function load({ data, params }: any) {
	const { metadata, component_names } = data;
	const { content } = await getPageDataBySlug(params.slug);

	const components = component_names && await Promise.all(
		component_names.map((name: any, i: number) =>
			import(`../../lib/components/${kebabize(name)}.svelte`).then(
				(m) => ({ props: metadata.sections[i], component: m.default })
			)
		)
	);

	return {
		metadata,
		content,
		components,
	};
}
