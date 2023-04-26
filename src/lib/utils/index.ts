import * as HeroIcons from "svelte-hero-icons";
import * as SvelteIonIcons from "svelte-ionicons";

export const kebabize = (str: string) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());

export const getIcon = (icon_name: string) => {
	const icons = { ...HeroIcons, ...SvelteIonIcons };
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	if (icons[icon_name]) return icons[icon_name];
}

export const getImagePath = (p: string) => {
	if (p.startsWith('https://res.cloudinary.com')) {
		return p;
	}
	return `${process.env.basePath}${p}`;
}

export const prettyDate = (d_in: string) => {
	const d_p1 = new Date(d_in);
	const d_p2 = new Date(d_p1.getTime() + Math.abs(d_p1.getTimezoneOffset() * 60000));
	return d_p2.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export const showHideOverflowY = (bool: boolean) => {
	const html = document.querySelector("html") as HTMLElement;
	if (bool) {
		html.classList.add("overflow-y-hidden");
	} else {
		html.classList.remove("overflow-y-hidden");
	}
};

export const renderPostLayout = (route: string) => {
	const pagesUsingPostLayout = ['blog', 'guides', 'customer-stories', 'events', 'press-releases']

	return pagesUsingPostLayout.some(page => route.includes(`/${page}/`));
}

export const isBackgroundWhite = (route: string) => {
	const pagesWithWhiteBackground = ['blog', 'guides', 'press-releases'];

	return pagesWithWhiteBackground.some(page => route.includes(`/${page}/`));
}

export const removeTrailingSlash = (str: string) => {
	return str.charAt(str.length - 1) === '/' ? str.slice(0, -1) : str;
};

export const isAVideoByExtension = (url: string) => {
	const commonFormats = ['mp4', 'mov', 'webm'];

	const split = url.toLowerCase().split('.');
	const extension = split[split.length - 1];

	return commonFormats.includes(extension);
};

export const getPostTypeByLayout = (route: string) => {
	return route.split("/")[1]
}

export function eventInPast(d: string) {
	const today = new Date();
	let event = new Date(d);
	event = event.setDate(event.getDate() + 1);
	return today > event;
}

