import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig, mergeConfig, type UserConfig } from 'vite'
import path from 'path'

const defaultConfig: UserConfig = {
	plugins: [sveltekit()]
}

const modeConfig: Record<string, UserConfig> = {
	development: {
		server: {
			port: 3000,
			fs: {
				allow: ['../../..'],
			},
		},
		optimizeDeps: {
			exclude: ['violet-lib'],
		},
		resolve: {
			alias: {
				$violet: path.resolve(__dirname, '../src/lib'),
				$components: path.resolve(__dirname, '../src/components'),
				$widgets: path.resolve(__dirname, '../src/widgets')
			}
		}
	},
}

export default defineConfig(({ mode }) =>
	mergeConfig(defaultConfig, modeConfig[mode] ?? {}, false)
)
