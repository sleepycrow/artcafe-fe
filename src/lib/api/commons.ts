import axios from 'axios';
import { pinia } from '@/stores/index';
import { useAuthStore } from '@/stores/auth';

export const BASE_URL = 'https://critters.us.to'; // base url, without trailing slash; should probably be empty in production

export const apiAxios = axios.create({
	baseURL: BASE_URL,
	method: 'get',
	responseType: 'json',
	headers: {
		common: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	},
});

// Inject auth headers (if available) to API calls
apiAxios.interceptors.request.use((config) => {
	const authStore = useAuthStore(pinia);

	if (authStore.clientId && authStore.clientSecret) {
		config.headers = Object.assign({ 'Authorization': `Bearer ${authStore.sessionToken}` }, config.headers);
	}
	
	return config;
});