import _isEmpty from 'lodash/isEmpty';
import { defineStore } from 'pinia';
import { getClientAuthToken, getUserAuthToken, registerOauthApp, revokeAuthToken, verifyClientAuthToken, verifyUserAuthToken } from '../lib/api/auth';
import type { Account } from '@/types/api/Account';

const CLIENT_ID_STORAGE_ITEM_NAME = 'clientId';
const CLIENT_SECRET_STORAGE_ITEM_NAME = 'clientSecret';
const SESSION_TOKEN_STORAGE_ITEM_NAME = 'sessionToken';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		clientId: null as (string | null),
		clientSecret: null as (string | null),

		sessionToken: null as (string | null),
		userInfo: null as (Account | null),
	}),

	getters: {
		isAppRegistered: ({ clientId, clientSecret }) => !_isEmpty(clientId) && !_isEmpty(clientSecret),
		isLoggedIn: ({ sessionToken }) => !_isEmpty(sessionToken)
	},

	actions: {
		/** APP AUTHENTICATION SECTION ***********************************************************/

		async prepareAppCredentials(): Promise<void> {
			const recovered = await this._tryToRecoverExistingAppCredentials();

			if (!recovered)
				await this._registerApp();
		},

		async _tryToRecoverExistingAppCredentials(): Promise<boolean> {
			const clientId = window.localStorage.getItem(CLIENT_ID_STORAGE_ITEM_NAME);
			const clientSecret = window.localStorage.getItem(CLIENT_SECRET_STORAGE_ITEM_NAME);

			if ((clientId && clientId.length > 0) && (clientSecret && clientSecret.length > 0)) {
				console.log('Attempting recovery of existing app credentials...');
				
				try {
					if (await this._verifyAppCredentials(clientId, clientSecret)) {
						console.log("Recovered app credentials!");
						this.clientId = clientId;
						this.clientSecret = clientSecret;
						return true;
					}
				} catch (e) {
					console.log('An error occurred while recovering existing app credentials', e);
					window.localStorage.removeItem(CLIENT_ID_STORAGE_ITEM_NAME);
					window.localStorage.removeItem(CLIENT_SECRET_STORAGE_ITEM_NAME);
				}
			}

			return false;
		},
	
		async _registerApp(): Promise<void> {
			console.log('Registering new OAuth app...');

			const {data} = await registerOauthApp();

			if (!data['client_id'] || !data['client_secret'])
				throw new Error('An error occured while registering the app');

			console.log("Got app credentials!");
			window.localStorage.setItem(CLIENT_ID_STORAGE_ITEM_NAME, data['client_id']);
			window.localStorage.setItem(CLIENT_SECRET_STORAGE_ITEM_NAME, data['client_secret']);
		},

		async _verifyAppCredentials(clientId: string, clientSecret: string): Promise<boolean> {
			console.log('Verifying app credentials...');

			let token;
			try {
				const {data} = await getClientAuthToken(clientId, clientSecret);
				token = data['access_token'];
				await verifyClientAuthToken(token);
			} catch (e) {
				console.log('An error occurred while verifying app credentials', e);
				return false;
			}

			revokeAuthToken(token, clientId, clientSecret); // try to revoke token (as it's no longer necessary), but don't worry too much about the result~
			return true;
		},

		/** USER AUTHENTICATION SECTION **********************************************************/

		async tryToRecoverSavedSession(): Promise<void> {
			const token = window.localStorage.getItem(SESSION_TOKEN_STORAGE_ITEM_NAME);
			if (token && token.length > 0) {
				try {
					await this._fetchUserInfo(token);
				} catch (e) {
					window.localStorage.removeItem(SESSION_TOKEN_STORAGE_ITEM_NAME);
				}
			}
		},

		async loginUser(username: string, password: string): Promise<void> {
			try {
				const resp = await getUserAuthToken(username, password);
				this._fetchUserInfo(resp.data.access_token);
			} catch (e) {
				console.error(e);
			}
		},
	
		async logoutUser(): Promise<void> {
			window.localStorage.removeItem(SESSION_TOKEN_STORAGE_ITEM_NAME);

			if (this.sessionToken)
				revokeAuthToken(this.sessionToken); // we don't care too much if it succeeds or not

			this.sessionToken = null;
			this.userInfo = null;
		},
	
		async _fetchUserInfo(token: string): Promise<void> {			
			const {data} = await verifyUserAuthToken(token);
	
			// Make sure the token is saved into local storage for future reference
			window.localStorage.setItem(SESSION_TOKEN_STORAGE_ITEM_NAME, token);
			this.sessionToken = token;  
			this.userInfo = data;
		},
	}
});
