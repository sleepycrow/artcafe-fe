<script setup lang="ts">
import type { Account } from '@/types/api/Account';
import { RouterLink } from 'vue-router';
import UserDisplayName from '../UserDisplayName/UserDisplayName.vue';

const props = defineProps<{
	userInfo: Account;
	class?: string;
}>();

const classes = props.class || '';
const userInfo = props.userInfo;
const isLocalUser = !userInfo.acct.includes('@');
const [ username, userInstanceDomain ] = (userInfo.fqn as string).split('@');
</script>

<template>
	<RouterLink
		:class="`user-display-card ${classes}`"
		:to="isLocalUser ? `/@${userInfo.acct}` : `/users/${userInfo.id}`"
	>
		<img
			class="avatar"
			:src="userInfo.avatar"
			:alt="userInfo.acct"
		/>

		<div class="names">
			<UserDisplayName :userInfo="userInfo" />
			
			<div class="handle">
				<span class="username">@{{ username }}</span>
				<span class="domain">@{{ userInstanceDomain }}</span>
			</div>
		</div>
	</RouterLink>
</template>

<style lang="scss">
.user-display-card {
	text-decoration: none;
	display: grid;
	grid-template-columns: 48px auto;
	overflow: hidden;
	margin-right: 8px;
	align-items: center;
	height: 48px;
	grid-gap: 8px;

	& > img.avatar {
		width: 48px;
		height: 48px;
	}

	& > .names {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;

		.user-display-name {
			font-size: 1.25rem;
		}

		.handle {
			font-size: 0.8rem;
			white-space: nowrap;
			text-overflow: ellipsis;
			text-transform: uppercase;
			font-weight: bold;
			overflow: hidden;

			& > .username {
				opacity: 0.9;
			}

			& > .domain {
				opacity: 0.6;
			}
		}
	}
}
</style>
