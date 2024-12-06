import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import ElementPlus from 'unplugin-element-plus/vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), vueDevTools(), ElementPlus({})],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		proxy: {
			'/api/v1': {
				target: 'https://p1oq5lij1c.execute-api.eu-central-1.amazonaws.com',
				changeOrigin: true,
			},
		},
	},
});
