<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import TheSidebar from '@/components/sidebar/TheSidebar/TheSidebar.vue'
import TheGuestSidebar from '../../components/sidebar/TheGuestSidebar/TheGuestSidebar.vue'

const stores = {
	auth: useAuthStore(),
}
</script>

<template>
	<TheSidebar v-if="stores.auth.isLoggedIn" />
	<TheGuestSidebar v-else />

	<div class="view-wrapper view-wrapper--has-sidebar">
		<slot />
	</div>
</template>