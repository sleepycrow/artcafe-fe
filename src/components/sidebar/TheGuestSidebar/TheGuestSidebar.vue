<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useInstanceStore } from '@/stores/instance';
import SidebarInstanceLogo from '../SidebarInstanceLogo/SidebarInstanceLogo.vue';

const stores = {
	instance: useInstanceStore(),
};
const { t } = useI18n();
</script>

<template>
	<aside class="main-sidebar">
		<!-- Instance info section -->
		<section class="instance-info-section">
			<header>{{ stores.instance.nodeName }}</header>
			<p>{{ stores.instance.nodeDescription }}</p>
		</section>

		<!-- Nav -->
		<nav>
			<ul>
				<li>
					<RouterLink to="/about">
						<span class="material-symbols-outlined icon">info</span>
						<span class="label">{{ t('nav.about') }}</span>
					</RouterLink>
				</li>
				<li>
					<RouterLink to="/login">
						<span class="material-symbols-outlined icon">login</span>
						<span class="label">{{ t('nav.login') }}</span>
					</RouterLink>
				</li>
			</ul>
		</nav>

		<!-- Branding section -->
		<SidebarInstanceLogo />
	</aside>
</template>

<style lang="scss" src="../sidebar.scss"></style>
