import { apiAxios } from './commons'

const ACCOUNT_ENDPOINT = (id: string) => `/api/v1/accounts/${id}`

/**
 * Fetches account info
 * @param id - Account ID
 * @returns Account info response
 */
export function fetchAccountInfo(id: string) {
	return apiAxios.get(ACCOUNT_ENDPOINT(id))
}