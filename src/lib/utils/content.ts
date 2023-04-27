
const findTargetBySlug = (slug: string) => {
	const all_pages = import.meta.glob('../../content/pages/**/**.md');
	const pageKeys = Object.keys(all_pages);

	return all_pages[pageKeys[0]]
}

export const getPageDataBySlug = async (slug: string) => {
	const target: any = await findTargetBySlug(slug)()
	const metadata = target.metadata

	return {
		metadata,
		content: target.default
	}
}

