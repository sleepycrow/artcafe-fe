<script setup lang="ts">
import { useInstanceStore } from '@/stores/instance';

const stores = {
	instance: useInstanceStore(),
};
const LOGO_PATH = __APP_LOGO_PATH__;
</script>

<template>
	<section class="branding-section">
		<RouterLink to="/about">
			<img
				:src="LOGO_PATH"
				:alt="stores.instance.nodeName"
				:title="stores.instance.nodeName"
			/>
		</RouterLink>
	</section>
</template>

<style lang="scss">
.branding-section {
	padding: 6px 6px;
	flex: 0 0 auto;
	min-height: 92px;

	img {
		height: 92px;
		width: 100%;
		object-fit: contain;
	}
}
</style>
