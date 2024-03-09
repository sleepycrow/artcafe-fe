import axios from 'axios';
import { pinia } from '@/stores/index';
import { useAuthStore } from '@/stores/auth';
import { BASE_URL, apiAxios } from './commons';

const REGISTER_APP_ENDPOINT = `/api/v1/apps`;
const VERIFY_APP_CREDENTIALS_ENDPOINT = `/api/v1/apps/verify_credentials`;
const VERIFY_USER_CREDENTIALS_ENDPOINT = '/api/v1/accounts/verify_credentials';
const OAUTH_TOKEN_ENDPOINT = '/oauth/token';
const OAUTH_REVOKE_ENDPOINT = '/oauth/revoke';

const oauthAxios = axios.create({
	baseURL: BASE_URL,
	method: 'get',
	responseType: 'json',
	headers: {
		common: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	},
});

// Inject client ID & secret headers (if available) & convert request body into FormData
oauthAxios.interceptors.request.use((config) => {
	if (config.data) {
		const authStore = useAuthStore(pinia);
		const formData = new FormData();
	
		if (authStore.clientId && authStore.clientSecret) {
			formData.set('client_id', authStore.clientId);
			formData.set('client_secret', authStore.clientSecret);
		}

		for (const key in config.data) {
			formData.set(key, config.data[key]);
		}

		config.data = formData;
	}

	return config;
});

/**
 * Registers OAuth app using this app's information
 * @returns Information about the newly-registered OAuth app
 */
export function registerOauthApp() {
	return apiAxios.post(REGISTER_APP_ENDPOINT, {
		'client_name': 'TEST HI REPLACE ME',
		'redirect_uris': 'urn:ietf:wg:oauth:2.0:oob',
		'website': 'https://github.com/sleepycrow/artcafe-fe',
	});
}

/**
 * Gets a client auth token
 * @param [clientId] - The OAuth Client ID (if none given, the one in the Auth store will be used)
 * @param [clientSecret] - The OAuth Client Secret (if none given, the one in the Auth store will be used)
 * @returns The newly-obtained auth token
 */
export function getClientAuthToken(clientId?: string, clientSecret?: string) {
	const payload: Record<string, string> = { 'grant_type': 'client_credentials' };

	if (clientId && clientSecret) {
		payload['client_id'] = clientId;
		payload['client_secret'] = clientSecret;
	}

	return oauthAxios.post(OAUTH_TOKEN_ENDPOINT, payload);
}

/**
 * Gets a user auth token
 * @param username - The user's username
 * @param password - The user's password
 * @returns The newly-obtained auth token
 */
export function getUserAuthToken(username: string, password: string) {
	return oauthAxios.post(OAUTH_TOKEN_ENDPOINT, {
		'grant_type': 'password',
		username,
		password,
	});
}

/**
 * Verifies the client auth token, returning various information about the client if successful
 * @param token - The client's auth token
 * @returns The [non-sensitive] information about the client
 */
export function verifyClientAuthToken(token: string) {
	return apiAxios.get(VERIFY_APP_CREDENTIALS_ENDPOINT, {
		headers: {
			'Authorization': `Bearer ${token}`
		},
	});
}

/**
 * Verifies the user auth token, returning various information about the user if successful
 * @param token - The user's auth token
 * @returns The [non-sensitive] information about the user
 */
export function verifyUserAuthToken(token: string) {
	return apiAxios.get(VERIFY_USER_CREDENTIALS_ENDPOINT, {
		headers: {
			'Authorization': `Bearer ${token}`
		},
	});
}

/**
 * Revokes an OAuth auth token
 * @param token - The token to be revoked
 * @param [clientId] - The OAuth Client ID to be used (if none given, the one in the Auth store will be used)
 * @param [clientSecret] The OAuth Client Secret to be used (if none given, the one in the Auth store will be used)
 * @returns A successful response, if successfully revoked
 */
export function revokeAuthToken(token: string, clientId?: string, clientSecret?: string) {
	const payload: Record<string, string> = { token };

	if (clientId && clientSecret) {
		payload['client_id'] = clientId;
		payload['client_secret'] = clientSecret;
	}

	return oauthAxios.post(OAUTH_REVOKE_ENDPOINT, payload);
}