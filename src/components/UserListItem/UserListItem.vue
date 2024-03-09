<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Account } from '@/types/api/Account';
import UserDisplayName from '../UserDisplayName/UserDisplayName.vue';

const props = defineProps<{
	userInfo: Account;
}>();

const userInfo = props.userInfo;
const [ username, userInstanceDomain ] = (userInfo.fqn as string).split('@');
</script>

<template>
	<div class="user-list-item">
		<RouterLink
			class="user-list-item__info"
			to="debug"
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

		<div class="user-list-item__action">
			<button>Follow</button>
		</div>
	</div>
</template>

<style lang="scss">
.user-list-item {
	width: 100%;
	display: flex;
	align-items: center;

	&__info {
		flex: 2 1 100%;
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

	&__action {
		flex: 1 0 auto;
		text-align: right;
	}
}
</style>
