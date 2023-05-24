const preprocess = require('svelte-preprocess');
const { mergeConfig } = require('vite');
const path = require('path');
module.exports = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-svelte-csf',
		'storybook-addon-theme-changer',
		'storybook-addon-sass-postcss',
		'@storybook/addon-mdx-gfm',
		'@storybook/addon-postcss'
	],
	staticDirs: ['../static'],
	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
		}
	},
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	},
	async viteFinal(config, { configType }) {
		// return the customized config
		return mergeConfig(config, {
			server: {
				fs: {
					allow: ['../../..'],
				},
			},
			resolve: {
				alias: {
					$violet: path.resolve(__dirname, '../src/lib'),
					$components: path.resolve(__dirname, '../src/components'),
					$widgets: path.resolve(__dirname, '../src/widgets')
				}
			}
		});
	},
	docs: {
		//👇 See the table below for the list of supported options
		theme: {
			base: 'light',
			brandTitle: 'Violet UI'
		},
		autodocs: false,
		defaultName: 'Documentation'
	}
};
