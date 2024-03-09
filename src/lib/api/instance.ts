import { apiAxios } from './commons';

const INSTANCE_INFORMATION_ENDPOINT = `/api/v1/instance`;
const NODEINFO_ENDPOINT = `/nodeinfo/2.1.json`;

/**
 * Fetches instance info from NodeInfo
 * @returns Information about the instance from the NodeInfo endpoint
 */
export function fetchNodeInfo() {
	return apiAxios.get(NODEINFO_ENDPOINT);
}

/**
 * Fetches instance info from the Mastodon API's "Instance Information" endpoint
 * @returns Information about the instance from the Mastodon API "Instance Information" endpoint
 */
export function fetchInstanceInformation() {
	return apiAxios.get(INSTANCE_INFORMATION_ENDPOINT);
}