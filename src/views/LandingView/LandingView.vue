<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import { useInstanceStore } from '@/stores/instance';


// Pull in stuff from the outside
const stores = {
	instance: useInstanceStore()
};
const { t } = useI18n();
// @ts-ignore
const LOGO_PATH = __APP_LOGO_PATH__;
</script>

<template>
	<img
		:src="stores.instance.backgroundImage"
		class="landing-page-background"
		alt="Instance background shit idk"
	/>
	
	<div class="landing-page-content">
		<main>
			<img
				:src="LOGO_PATH"
				:alt="stores.instance.nodeName"
				:title="stores.instance.nodeName"
			/>

			<header>{{ stores.instance.nodeName }}</header>
			<div class="description">{{ stores.instance.nodeDescription }}</div>
			<div class="actions">
				<RouterLink class="btn btn--arrow" to="/about">
					{{ t('nav.about') }}
				</RouterLink>

				<RouterLink class="btn btn--primary btn--arrow" to="/login">
					{{ t('nav.login') }}
				</RouterLink>
			</div>
		</main>
	</div>
</template>

<style lang="scss">
@use '@/assets/globals';

.landing-page-background {
	position: fixed;
	top: 0;
	left: 0;
	z-index: -1;
	width: 100%;
	height: 100vh;
	object-fit: cover;
}

.landing-page-content {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.25);

	main {
		position: absolute;
		bottom: 4rem;
		left: 4rem;
		width: 600px;

		img {
			width: 20%;
			height: auto;
		}

		header, .description, .actions {
			margin: 0.75rem 0;
		}

		header {
			font-size: 3rem;
			margin-top: 0;
		}

		.description {
			font-size: 1.25rem;
		}

		.actions .btn {
			margin-right: 0.5rem;
		}
	}
}
</style>
