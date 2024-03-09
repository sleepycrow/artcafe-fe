<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import SidebarInstanceLogo from '../SidebarInstanceLogo/SidebarInstanceLogo.vue';
import { RouterLink } from 'vue-router';
import UserDisplayName from '../../UserDisplayName/UserDisplayName.vue';

const stores = {
	auth: useAuthStore()
};
const { userInfo } = stores.auth;

const [ username, userInstanceDomain ] = (userInfo.fqn as string).split('@');
</script>

<template>
	<aside class="main-sidebar">
		<!-- User section -->
		<section class="user-section">
			<img
				class="avatar"
				:src="userInfo.avatar"
				:alt="userInfo.acct"
			/>
			<div class="user-section__info">
				<UserDisplayName :user-info="userInfo" />
				
				<div class="handle">
					<span class="username">@{{ username }}</span>
					<span class="domain">@{{ userInstanceDomain }}</span>
				</div>
			</div>

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
						<span class="label">Feeds</span>
					</RouterLink>
				</li>

				<li><a href="#">
					<span class="material-symbols-outlined icon">notifications</span>
					<span class="label">Notifications</span>
				</a></li>

				<li><a href="#">
					<span class="material-symbols-outlined icon">mail</span>
					<span class="label">Messages</span>
				</a></li>

				<li><a href="#">
					<span class="material-symbols-outlined icon">demography</span>
					<span class="label">Lists</span>
				</a></li>

				<li><a href="#">
					<span class="material-symbols-outlined icon">collections_bookmark</span>
					<span class="label">Albums</span>
				</a></li>

				<li><a href="#">
					<span class="material-symbols-outlined icon">campaign</span>
					<span class="label">Community Announcements</span>
				</a></li>

				<li><a href="#">
					<span class="material-symbols-outlined icon">search</span>
					<span class="label">Search</span>
				</a></li>

				<li><a class="nav-button" href="#">
					<span class="material-symbols-outlined icon">edit_square</span>
					<span class="label">Post</span>
				</a></li>
			</ul>
		</nav>

		<!-- Branding section -->
		<SidebarInstanceLogo />
	</aside>
</template>

<style lang="scss" src="@/assets/sidebar.scss"></style>
