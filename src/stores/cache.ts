import { defineStore } from 'pinia';
import { fetchAccountInfo } from '../lib/api/accounts';
import type { CachedAccount } from '@/types/api/Account';

const CACHE_TIME_LIMIT = 1000 * 60 * 30; // consider objects stale after half-an-hour

export const useCacheStore = defineStore('cache', {
	state: () => ({
		accounts: {} as Record<string, CachedAccount>,
	}),

	actions: {
		// ACCOUNTS
		getCachedAccountInfo(id: string): CachedAccount {
			return this.accounts[id];
		},

		async fetchAccountInfo(id: string): Promise<CachedAccount> {
			try {
				const {data} = await fetchAccountInfo(id);
				const acctData = {...data, cachedAt: Date.now()};

				this.accounts[acctData.id] = acctData;
				// If it's a local account, also make it accessible by username
				if (!acctData.acct.includes('@'))
					this.accounts[acctData.acct] = acctData;

				return acctData;
			} catch (e) {
				throw new Error('SHITTFER FACKER');
			}
		},

		async getAccountInfo(id: string): Promise<CachedAccount> {
			const cachedAccountInfo = this.getCachedAccountInfo(id);

			if (cachedAccountInfo) {
				if (cachedAccountInfo.cachedAt > CACHE_TIME_LIMIT)
					this.fetchAccountInfo(id);
				return cachedAccountInfo;
			}

			return await this.fetchAccountInfo(id);
		},
	}
});