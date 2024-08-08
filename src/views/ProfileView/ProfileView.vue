<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import _capitalize from 'lodash/capitalize';
import _isEmpty from 'lodash/isEmpty';
import { useInstanceStore } from '@/stores/instance';
import { useCacheStore } from '@/stores/cache';
import { useInterfaceStore } from '@/stores/interface';
import { removeEmojiShortcodes } from '@/lib/utils/textUtils';
import UserProfileInfoSection from '@/components/UserProfileInfoSection/UserProfileInfoSection.vue';
import type { Account } from '@/types/api/Account';
import { computed } from 'vue';


const stores = {
	instance: useInstanceStore(),
	interface: useInterfaceStore(),
	cache: useCacheStore(),
};
const route = useRoute();


const loaded: Ref<boolean> = ref(false);
const userInfo: Ref<Account | null> = ref(null);
const usernameElements = computed(() => userInfo.value?.fqn.split('@') || []);

stores.cache.getAccountInfo(route.params.queriedUserId as string)
	.then(newUserInfo => {
		userInfo.value = newUserInfo;

		stores.interface.setPageTitle(removeEmojiShortcodes(userInfo.value.display_name));
	})
	.catch(e => {
		console.error('gammer', e);
		window.alert('fammer situationnnn :((' + e);
	})
	.finally(() => loaded.value = true);
</script>

<template>
	<h1 v-if="!loaded">loading...</h1>
	<h1 v-if="loaded && !userInfo">no loanded</h1>

	<template v-if="loaded && userInfo">
		<img
			class="faded-background-header-img"
			:src="userInfo.header"
			:alt="`${userInfo.display_name}'s banner image'`"
			aria-hidden="true"
		/>

		<div class="page-content-container page-content-container--l profile-page-content">
			<UserProfileInfoSection	:user-info="userInfo" />
		</div>
	</template>
</template>

<style lang="scss">
@use '@/assets/globals';

.profile-page-content {
	padding-top: 150px;
}
</style>
