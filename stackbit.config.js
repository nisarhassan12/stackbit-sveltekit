import * as models from './.stackbit/models';

export default {
	stackbitVersion: '~0.6.0',
	ssgName: 'custom',
	cmsName: 'git',
	pagesDir: 'src/content/pages',
	dataDir: 'src/content/data',
	assets: {
		referenceType: 'static',
		staticDir: 'static',
		uploadDir: 'images',
		publicPath: '/'
	},
	customContentReload: true,
	nodeVersion: 'v16.19.0',
	devCommand: './node_modules/.bin/vite --port {PORT}',
	experimental: {
		ssg: {
			name: 'sveltekit',
			logPatterns: { up: ' ready in ' },
			passthrough: ['/vite-hmr/**']
		}
	},
	models: models
};
