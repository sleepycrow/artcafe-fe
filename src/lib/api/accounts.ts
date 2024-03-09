import type { Account } from '@/types/api/Account';
import { apiAxios } from './commons';
import type { AxiosPromise } from 'axios';

const ACCOUNT_ENDPOINT = (id: string) => `/api/v1/accounts/${id}`;

/**
 * Fetches account info
 * @param id - Account ID
 * @returns Account info response
 */
export function fetchAccountInfo(id: string): AxiosPromise<Account> {
	return apiAxios.get(ACCOUNT_ENDPOINT(id));
}