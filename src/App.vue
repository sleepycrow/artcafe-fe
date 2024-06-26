<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { useInstanceStore } from './stores/instance';
import { useInterfaceStore } from './stores/interface';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout.vue';
import BlankLayout from './layouts/BlankLayout/BlankLayout.vue';
import AppStartingOverlay from './components/AppStartingOverlay/AppStartingOverlay.vue';


const route = useRoute();
const stores = {
	auth: useAuthStore(),
	instance: useInstanceStore(),
	interface: useInterfaceStore(),
};

const layout = computed((): string => (route.meta.layout || 'DefaultLayout'));


const appLoading = ref(true);
const appReady = ref(false);

Promise.all([
	stores.instance.fetchInstanceInfo(),
	stores.auth.prepareAppCredentials().then(stores.auth.tryToRecoverSavedSession)
])
	.then(() => appReady.value = true)
	.catch(e => {
		console.error(e);
		window.alert('gamer situation :((\n' + e);
	})
	.finally(() => appLoading.value = false);


// Update document title whenever needed
function updateTitle(){
	document.title = [stores.interface.pageTitle, stores.instance.nodeName]
		.filter(Boolean)
		.join(' • ');
}

watch(() => stores.interface.pageTitle, updateTitle);
watch(() => stores.instance.nodeName, updateTitle);
</script>

<template>
	<AppStartingOverlay v-if="appLoading" />

	<h2 v-if="!appLoading && !appReady">failed :((</h2>

	<component v-if="appReady" :is="layout">
		<RouterView :key="route.fullPath" />
	</component>
</template>

<script lang="ts">
export default {
	components: { DefaultLayout, BlankLayout }
};
</script>

<style lang="scss" src="./assets/main.scss"></style>