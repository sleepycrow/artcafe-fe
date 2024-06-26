<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth';
import SidebarInstanceLogo from '../SidebarInstanceLogo/SidebarInstanceLogo.vue';
import UserCard from '../../UserCard/UserCard.vue';
import type { Account } from '@/types/api/Account';

const stores = {
	auth: useAuthStore()
};
const { t } = useI18n();

const userInfo = stores.auth.userInfo as Account;
</script>

<template>
	<aside class="main-sidebar">
		<!-- User section -->
		<section class="user-section">
			<UserCard :userInfo="userInfo" />

			<div style="text-align: center;">
				<span class="material-symbols-outlined">arrow_drop_down</span>
			</div>
		</section>

		<!-- Nav -->
		<nav>
			<ul>
				<li>
					<RouterLink to="/debug">
						<span class="material-symbols-outlined icon">rss_feed</span>
						<span class="label">{{ t('nav.timelines') }}</span>
					</RouterLink>
				</li>

				<li><a href="#">
					<span class="material-symbols-outlined icon">notifications</span>
					<span class="label">{{ t('nav.notifications') }}</span>
				</a></li>

				<li><a href="#">
					<span class="material-symbols-outlined icon">mail</span>
					<span class="label">{{ t('nav.messages') }}</span>
				</a></li>

				<li><a href="#">
					<span class="material-symbols-outlined icon">demography</span>
					<span class="label">{{ t('nav.lists') }}</span>
				</a></li>

				<li><a href="#">
					<span class="material-symbols-outlined icon">collections_bookmark</span>
					<span class="label">{{ t('nav.albums') }}</span>
				</a></li>

				<li><a href="#">
					<span class="material-symbols-outlined icon">campaign</span>
					<span class="label">{{ t('nav.announcements') }}</span>
				</a></li>

				<li><a href="#">
					<span class="material-symbols-outlined icon">search</span>
					<span class="label">{{ t('nav.search') }}</span>
				</a></li>

				<li><a class="nav-button" href="#">
					<span class="material-symbols-outlined icon">edit_square</span>
					<span class="label">{{ t('nav.post') }}</span>
				</a></li>
			</ul>
		</nav>

		<!-- Branding section -->
		<SidebarInstanceLogo />
	</aside>
</template>

<style lang="scss" src="../sidebar.scss"></style>
