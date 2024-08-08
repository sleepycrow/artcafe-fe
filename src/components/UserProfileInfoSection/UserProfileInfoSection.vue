<script setup lang="ts">
import UserDisplayName from '../UserDisplayName/UserDisplayName.vue';
import { useI18n } from 'vue-i18n';
import type { Account, AccountField } from '@/types/api/Account';
import { htmlizeCustomEmoji, htmlSpecialChars } from '@/lib/utils/textUtils';

const props = defineProps<{
	userInfo: Account;
}>();
const { t } = useI18n();

const userInfo: Account = props.userInfo;

const [ username, userInstanceDomain ] = (userInfo.fqn as string).split('@');
const userBio: string = htmlizeCustomEmoji(userInfo.note, userInfo.emojis);
const userFields: AccountField[] = userInfo.fields.map(({name, value, verified_at}): AccountField => ({
	name: htmlizeCustomEmoji(htmlSpecialChars(name), userInfo.emojis),
	value: htmlizeCustomEmoji(value, userInfo.emojis),
	verified_at,
}));
</script>

<template>
	<section class="profile-info">
		<aside class="avatar-section">
			<img
				:src="userInfo.avatar"
				class="avatar"
				alt="alt"
			/>
		</aside>

		<main class="info-section">
			<header>
				<div class="header__username">
					<UserDisplayName :user-info="userInfo" />
				</div>
				<div class="header__handle">
					<span class="username">@{{ username }}</span>
					<span class="domain">@{{ userInstanceDomain }}</span>
				</div>
			</header>

			<main><bdi v-html="userBio"></bdi></main>

			<ul class="properties">
				<li
					v-for="field in userFields"
					class="property"
				>
					<div class="property__name"><bdi v-html="field.name" /></div>
					<div class="property__value">
						<bdi v-html="field.value" />
					</div>
					<div v-if="field.verified_at" class="property__verification-note">
						<span class="material-symbols-outlined icon">check</span>
						{{ t('user.verified') }}
					</div>
				</li>
			</ul>
		</main>
	</section>
</template>

<style lang="scss">
@use '@/assets/globals';

.profile-info {
	width: 100%;
	margin: 0 auto 2rem auto;
	display: flex;
	flex-direction: column;

	.avatar-section {
		flex: 1 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;

		img.avatar {
			width: 128px;
			height: 128px;
		}
	}

	.info-section {
		flex: 1 1 auto;

		header {
			margin-bottom: 1.25rem;
			text-align: center;

			.header__username {
				font-size: 2rem;
			}

			.header__handle {
				font-size: 1rem;
				text-transform: uppercase;
				font-weight: bold;

				.username { opacity: 0.9; }
				.domain { opacity: 0.6; }
			}
		}

		.properties {
			display: flex;
			flex-wrap: wrap;
			list-style-type: none;
			padding: 0;
			margin: 1.25rem 0 0 0;

			.property {
				flex: 0 0 auto;
				margin: 0 1rem 0.5rem 0;

				.property__name {
					font-size: 0.9rem;
					text-transform: uppercase;
					opacity: 0.75;
					font-weight: bold;
				}

				.property__value {
					font-size: 1.25rem;
					font-weight: lighter;
				}

				.property__verification-note {
					font-size: 0.9rem;
					text-transform: uppercase;
					font-weight: bold;
					color: var(--accent-color);
					
					.icon {
						font-size: 1em;
						vertical-align: middle;
					}
				}
			}
		}
	}

	@media screen and (min-width: globals.$responsive-breakpoint-s) {
		flex-direction: row;
		align-items: flex-start;

		.avatar-section {
			flex: 0 0 auto;
			width: 128px;
		}

		.info-section {
			margin: 0 0 0 16px;

			header {
				text-align: left;
			}
		}
	}
}
</style>