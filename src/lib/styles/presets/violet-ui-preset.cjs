const customColors = require('./custom-colors.cjs')

module.exports = {
	content: [
		'./ui/**/*.scss',
		'./ui/**/*.svelte',
	],
	theme: {
		extend: {
			colors: {
				primary: customColors.cViolet,
				secondary: customColors.indigo,
				additional: customColors.cGray,
				error: customColors.red,
				danger: customColors.red,
				warning: customColors.yellow,
			},
		},
	},
}