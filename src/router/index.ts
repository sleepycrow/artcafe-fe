import 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import LandingView from '@/views/LandingView/LandingView.vue';
import AboutView from '@/views/AboutView/AboutView.vue';
import DebugView from '@/views/DebugView/DebugView.vue';
import LoginView from '@/views/LoginView/LoginView.vue';

declare module 'vue-router' {
	interface RouteMeta {
		layout: ('DefaultLayout' | 'BlankLayout');
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
			path: '/login',
			name: 'login',
			component: LoginView,
		},
		{
			path: '/debug',
			name: 'debug',
			component: DebugView,
		}
	]
});

export default router;
