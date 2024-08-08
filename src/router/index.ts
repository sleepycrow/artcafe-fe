import 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import LandingView from '@/views/LandingView/LandingView.vue';
import AboutView from '@/views/AboutView/AboutView.vue';
import DebugView from '@/views/DebugView/DebugView.vue';
import LoginView from '@/views/LoginView/LoginView.vue';
import { useAuthStore } from '@/stores/auth';
import { pinia } from '@/stores';
import { useInterfaceStore } from '@/stores/interface';
import ProfileView from '@/views/ProfileView/ProfileView.vue';

const stores = {
	auth: useAuthStore(pinia),
	interface: useInterfaceStore(pinia),
};

declare module 'vue-router' {
	interface RouteMeta {
		layout?: ('DefaultLayout' | 'BlankLayout');
		authRequired?: boolean;
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
		},

		// Profiles
		{
			path: '/users/:queriedUserId',
			name: 'profile',
			component: ProfileView,
		},
		{
			path: '/@:queriedUserId',
			name: 'local_user_profile',
			component: ProfileView,
		},
	]
});

router.beforeEach((to) => {
	if(to.meta.authRequired && !stores.auth.isLoggedIn)
		return '/';
});

router.afterEach((to, from) => {
	// Reset the page title everytime we navigate.
	if(to.fullPath !== from.fullPath)
		stores.interface.setPageTitle('');
});

export default router;
