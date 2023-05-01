import config from '../../content/data/config.json';
import { error, redirect } from "@sveltejs/kit";
import path from 'path';
import fs from 'fs';
import fm from 'front-matter';

const JOB_BOARD_URL = 'https://boards-api.greenhouse.io/v1/boards/materialize/jobs?content=true';

type postType = 'blog' | 'guides' | 'customer-stories' | 'events'

const getAllPosts = (type: string) => {
	const targetPath = path.join(process.cwd(), `/src/content/pages/${type}`);
	const filenames = fs.readdirSync(targetPath);

	const files = filenames.map((name: string) => {
		const fullPath = path.join(targetPath, `/${name}`);
		const file = fs.readFileSync(fullPath, "utf-8");
		return { path: `/${type}/${name.substring(0, name.length - 3)}`, ...(fm(file).attributes as object) };
	})

	return files;
}


export const getPosts = async (type: postType) => {
	const allPosts = getAllPosts(type);

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore	
	return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export const getPeople = async () => {
	const jsonFiles = import.meta.glob('/src/content/data/people/*.json');
	const iterablePeople = Object.entries(jsonFiles);

	const allPeople = await Promise.all(
		iterablePeople.map(async ([path, resolver]) => {
			const data: any = await resolver();
			return data.default;
		})
	)

	return allPeople
}

export const getPeopleByGroup = async (group: string) => {
	const people = await getPeople();

	const filtered = people.filter(person => person.team.toLowerCase() === group)

	return filtered;
}

export const getConfig = () => {
	return config;
}

const findTargetBySlug = (slug: string) => {
	const targetPath = slug.endsWith('/') ? slug.slice(0, -1) : slug.startsWith('/') ? slug.slice(0, 1) : slug;
	const all_pages = import.meta.glob('../../content/pages/**/**.md');
	const pageKeys = Object.keys(all_pages);

	const target_index = `${pageKeys.find(key => {
		const isSlugEmpty = targetPath === ''
		const simplifiedPath = key.replaceAll("../", "").replace("content/pages/", "").replace(".md", "");
		const isTheRootIndexFile = isSlugEmpty && simplifiedPath === 'index';

		if (isTheRootIndexFile) {
			return key
		} else if (targetPath === 'index') {
			throw redirect(302, '/');
		} else if (targetPath === simplifiedPath) {
			return key
		}
	})}`

	if (target_index === "undefined") {
		throw error(404, {
			message: 'Not found'
		})
	}

	return all_pages[target_index]
}

export const getAuthor = async (name: string) => {
	const allPeopleJSON = import.meta.glob('/src/content/data/people/*.json');
	const simplified_name: string = name.replace("src/data/people/", "").replace("/content/data/people", "").replace(".json", "")
	const target_key = Object.keys(allPeopleJSON).find(key => {
		return key.includes(simplified_name);
	})

	const author: any = target_key && await allPeopleJSON[`${target_key}`]();


	return author || {};
}

export const enrichMetaData = (metadata: any) => {
	Object.keys(metadata).forEach((key) => {
		if (key === "people_refs") {
			const target = metadata[key];
			const authors: any = []
			target.forEach(async (ref: any) => {
				const name = ref;
				const author = await getAuthor(name);
				authors.push(author.default);
			});
			metadata.authors = authors;
		}
	})

	return metadata
}

export const getPageDataBySlug = async (slug: string) => {
	const target: any = await findTargetBySlug(slug)()
	const metadata = enrichMetaData(target.metadata)

	return {
		metadata,
		content: target.default
	}
}

export const getMetadataBySlug = async (slug: string) => {
	const targetSlug = slug === '/' ? 'index' : slug.endsWith('/') ? slug.slice(0, -1) : slug;
	const all_pages = import.meta.glob('../../content/pages/**/**.md');
	const pageKeys = Object.keys(all_pages);

	const target_index = pageKeys.find(key => key.includes(targetSlug))

	if (target_index) {
		const data: any = await all_pages[target_index]();
		data.metadata.path = slug;
		return data.metadata;
	}
}

export const getJobs = async () => {
	const response = await fetch(JOB_BOARD_URL);
	const json = await response.json();
	const sorted_jobs = json.jobs.reduce((acc, job) => {
		const job_title = job.title.trim();
		job.departments.map((dept) => {
			if (!(dept.name in acc)) acc[dept.name] = {};
			if (!(job_title in acc[dept.name])) acc[dept.name][job_title] = [];
			acc[dept.name][job_title].push({ loc: job.location.name, url: job.absolute_url });
		});
		return acc;
	}, {});

	return sorted_jobs;
};

