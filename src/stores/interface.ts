import { defineStore } from 'pinia';

export const useInterfaceStore = defineStore('interface', {
	state: () => ({
		pageTitle: '',
	}),

	actions: {
		setPageTitle(title: string) {
			this.pageTitle = (typeof title === 'string' ? title : '');
		},
	}
});