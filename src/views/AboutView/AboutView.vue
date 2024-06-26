<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';
import _capitalize from 'lodash/capitalize';
import _isEmpty from 'lodash/isEmpty';
import { useInstanceStore } from '@/stores/instance';
import UserCard from '@/components/UserCard/UserCard.vue';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.vue';
import type { Account } from '@/types/api/Account';
import { useInterfaceStore } from '@/stores/interface';


const stores = {
	instance: useInstanceStore()
};
const appInfo = {
	// @ts-ignore
	name: __APP_NAME__,
	// @ts-ignore
	version: __APP_VERSION__,
	// @ts-ignore
	repoURL: __APP_REPO_URL__,
	// @ts-ignore
	commitHash: __APP_COMMIT_HASH__,
};
const { t } = useI18n();


onMounted(() => useInterfaceStore().setPageTitle(t('nav.about')));


const isAboutContentLoading = ref(true);
const aboutContent: Ref<string | null> = ref(null);
axios.get('/static/about-instance.html', { responseType: 'text' })
	.then(({ data }) => (aboutContent.value = data))
	.catch(() => window.alert('GAMER SITUATION :(('))
	.finally(() => (isAboutContentLoading.value = false));


const areStaffAccountInfosLoading = ref(true);
const staffAccountInfos: Ref<Account[] | null> = ref(null);
stores.instance.fetchStaffAccountInfos()
	.then(infos => (staffAccountInfos.value = infos))
	.then(() => console.log(staffAccountInfos.value))
	.catch(() => window.alert('GAMER SITUATION :(('))
	.finally(() => (areStaffAccountInfosLoading.value = false));


const bubbleInstances = stores.instance.localBubbleInstances || [];
</script>

<template>
	<img
		class="faded-background-header-img"
		:src="stores.instance.backgroundImage"
		:alt="stores.instance.nodeName"
	/>

	<div class="page-content-container page-content-container--m about-page-content">
		<!-- Instance info -->
		<section class="about-instance">
			<LoadingSpinner v-if="isAboutContentLoading" />
			<h2 v-if="!isAboutContentLoading && !aboutContent">failed to load :(</h2>
			<div
				v-if="aboutContent"
				class="about-card-content"
				v-html="aboutContent"
			></div>
		</section>

		<!-- Staff infos -->
		<section v-if="areStaffAccountInfosLoading || !_isEmpty(staffAccountInfos)" class="staff-accounts">
			<h1>{{ t('about.staff') }}</h1>

			<LoadingSpinner v-if="areStaffAccountInfosLoading" />
			<ul class="staff-accounts-list">
				<li v-for="acctInfo of staffAccountInfos" :key="acctInfo.id">
					<UserCard :userInfo="acctInfo" />
				</li>
			</ul>
		</section>

		<!-- Bubble instances -->
		<section v-if="!_isEmpty(bubbleInstances)" class="bubble-instances">
			<h1>{{ t('about.bubble_instances') }}</h1>
			<p>{{ t('about.bubble_instances_description') }}</p>

			<ul class="bubble-instances-list">
				<li v-for="instance of bubbleInstances" :key="instance">
					<a :href="`https://${instance}`">{{ instance }}</a>
				</li>
			</ul>
		</section>

		<!-- Federation details -->
		<section class="federation-details">
			<details>
				<summary>{{ t('about.federation_details') }}</summary>

				<h2>MRF Policies</h2>
				<p>Media Rewrite Facility (MRF) policies change the way in which a community federates with others. This community has the following policies enabled:</p>
				<p>Sucking dick</p>

				<h2>Community-specific Policies</h2>
				<p>The staff of this community has chosen to apply specific policies to the </p>
				<p>Sucking dick</p>
			</details>
		</section>

		<!-- Tech info -->
		<footer>
			<p>
				This community is powered by
				<a :href="stores.instance.softwareRepositoryURL">{{ _capitalize(stores.instance.softwareName) }} {{ stores.instance.softwareVersion }}</a>
				and its contents are being (lovingly) presented by
				<a :href="appInfo.repoURL">{{ appInfo.name }} {{ appInfo.version }} ({{ appInfo.commitHash }})</a>
				&lt;3
			</p>
		</footer>
	</div>
</template>

<style lang="scss">
.about-page-content {
	margin-top: 2rem;
	
	& > section {
		margin-bottom: 2rem;
	}

	.staff-accounts, .bubble-instances {
		& > h1 {
			font-size: 2rem;
			font-weight: normal;
			margin: 0;
		}
	}

	.federation-details {
		h2 {
			font-weight: 1.5rem;
			font-weight: normal;
			margin: 1rem 0;
		}
	}

	ul.staff-accounts-list {
		padding: 0;
		list-style-type: none;

		li {
			margin-bottom: 0.5rem;
		}
	}

	ul.bubble-instances-list {
		padding: 0;
		list-style-type: none;

		li {
			display: inline-block;
			margin: 0 1rem 0.5rem 0;
		}

		a {
			font-size: 1.25rem;
			text-decoration: none;
			opacity: 0.5;
			transition: opacity 0.1s;

			&:hover {
				opacity: 1;
			}
		}
	}

	& > footer {
		opacity: 0.5;
		text-align: center;
	}
}
</style>
