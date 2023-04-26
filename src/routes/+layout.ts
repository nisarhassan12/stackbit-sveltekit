import { getConfig, getMetadataBySlug } from "$lib/utils/content";

export const prerender = true;

export const load = async ({ url }: any) => {
	const currentRoute = url.pathname;
	const metadata = await getMetadataBySlug(currentRoute);
	const featured_post = await getMetadataBySlug('blog/next-generation');

	return {
		metadata,
		currentRoute,
		config: getConfig(),
		featured_post
	}
}
