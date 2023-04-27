import { kebabize } from "$lib/utils";

export async function load({ data }: any) {
	const { metadata, component_names, content } = data;

	const components = component_names && await Promise.all(
		component_names.map((name: any, i: number) =>
			import(`../../lib/components/${kebabize(name)}.svelte`).then(
				(m) => ({ props: metadata.sections[i], component: m.default })
			)
		)
	);

	console.log("Client Load Called.")

	return {
		metadata,
		content,
		components,
	};
}
