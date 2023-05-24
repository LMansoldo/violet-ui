const heliosPreset = require('../../lib/styles/presets/violet-ui-preset.cjs')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.html', './src/**/*.svelte', ...heliosPreset.content],
	presets: [heliosPreset],
	theme: {
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: []
}