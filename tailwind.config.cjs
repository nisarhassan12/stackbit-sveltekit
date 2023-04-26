const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				bg: 'var(--bg)',
				'bg-nav': 'var(--bg-nav)',
				card: 'var(--card)',
				'card-light': 'var(--card-light)',
				divider: 'var(--divider)',
				'divider-light': 'var(--divider-light)',
				'divider-dark': 'var(--divider-dark)',
				important: 'var(--important)',
				sub: 'var(--sub)',
				body: 'var(--body)',
				orchid: 'var(--orchid)',
				orange: 'var(--orange)',
				lavender: 'var(--lavender)',
				'primary-gradient': 'var(--primary-gradient)',
				mz: {
					purple: {
						400: 'hsl(var(--hsl-mz-purple))',
						600: 'hsl(var(--hsl-mz-purple-dark))',
						700: 'hsl(var(--hsl-mz-purple-darker))',
						800: 'hsl(var(--hsl-mz-purple-darkest))'
					},
					orchid: 'hsl(var(--hsl-mz-orchid))',
					lavender: 'hsl(var(--hsl-mz-lavender))',
					charcoal: 'hsl(var(--hsl-mz-charcoal))',
					green: 'hsl(var(--hsl-mz-green))',
					turquois: 'hsl(var(--hsl-mz-turquois))'
				},
				default: {
					focus: 'hsl(var(--hsl-default-focus))'
				}
			},
			boxShadow: {
				default: 'var(--default)',
				'button-hover': 'var(--button-hover)',
				'button-ghost': 'var(--button-ghost)',
				l: 'var(--shadow-elevation-low)',
				m: 'var(--shadow-elevation-medium)',
				h: 'var(--shadow-elevation-high)',
				dissipate: 'var(--shadow-dissipate)'
			}
		}
	},

	plugins: []
};

module.exports = config;
