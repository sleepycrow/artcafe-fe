import 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import LandingView from '@/views/LandingView/LandingView.vue';
import AboutView from '@/views/AboutView/AboutView.vue';
import DebugView from '@/views/DebugView/DebugView.vue';

declare module 'vue-router' {
	interface RouteMeta {
		layout: string
	}
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'landing',
			component: LandingView,
			meta: {
				layout: 'BlankLayout',
			},
		},
		{
			path: '/about',
			name: 'about',
			component: AboutView,
		},
		{
			path: '/debug',
			name: 'debug',
			component: DebugView,
		}
	]
});

export default router;
