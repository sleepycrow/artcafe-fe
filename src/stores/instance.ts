import { defineStore } from 'pinia'
import { fetchInstanceInformation, fetchNodeInfo } from '../lib/api/instance'
import { fetchAccountInfo } from '../lib/api/accounts'

export const useInstanceStore = defineStore('instance', {
	state: () => ({
		// NodeInfo
		nodeName: 'Community Name',
		nodeDescription: 'Just another part of the fediverse.',
		openRegistrations: true,
		localBubbleInstances: [] as string[],
		staff: [] as string[],
		softwareName: 'Artcafe',
		softwareVersion: '',
		softwareRepositoryURL: '',

		// MastoAPI instance info
		maxStatusLength: 5000,
		backgroundImage: '',
		thumbnailImage: '',
	}),

	actions: {
		async fetchInstanceInfo() {
			const [{data: instanceInfo}, {data: nodeInfo}] = await Promise.all([fetchInstanceInformation(), fetchNodeInfo()])

			// NodeInfo
			this._mapPropertiesDirectly(nodeInfo.metadata, ['nodeName', 'nodeDescription', 'openRegistrations', 'localBubbleInstances'])
			
			this.softwareName = nodeInfo.software.name
			this.softwareVersion = nodeInfo.software.version
			this.softwareRepositoryURL = nodeInfo.software.repository

			this.staff = (nodeInfo.metadata.staffAccounts || [])
				.map((acctUrl: string) => acctUrl.split('/').pop())

			// MastoAPI instance info
			this.maxStatusLength = instanceInfo.max_toot_chars
			this.backgroundImage = instanceInfo.background_image
			this.thumbnailImage = instanceInfo.thumbnail
		},

		_mapPropertiesDirectly(object: any, keys: string[]) {
			//@ts-ignore
			keys.forEach((key: string) => (this[key] = object[key]))
		},

		async fetchStaffAccountInfos() {
			return (await Promise.all(this.staff.map(fetchAccountInfo)))
				.map(({ data }) => data)
				.filter(acctInfo => acctInfo.pleroma.is_admin || acctInfo.pleroma.is_moderator) // exclude accounts with hidden ranks
				.sort((a, b) => getAccountRankForSorting(b) - getAccountRankForSorting(a))
		},
	}
})

const getAccountRankForSorting = (acctInfo: any) => acctInfo.pleroma.is_admin ? 1 : 0;