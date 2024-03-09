import { fileURLToPath, URL } from 'node:url';
import { execSync } from 'child_process';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { VitePWA } from 'vite-plugin-pwa';

const getCommitHash = () => {
	try {
		return execSync('git rev-parse --short HEAD').toString().trim();
	} catch (e) {
		return '??????';
	}
};

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		VitePWA({ registerType: 'autoUpdate' }),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	define: {
		__APP_NAME__: JSON.stringify('Artcafe-FE'),
		__APP_REPO_URL__: JSON.stringify('https://github.com/sleepycrow/artcafe-fe'),
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
		__APP_COMMIT_HASH__: JSON.stringify(getCommitHash()),
		__APP_LOGO_PATH__: JSON.stringify('/static/logo.svg'),
	},
});
