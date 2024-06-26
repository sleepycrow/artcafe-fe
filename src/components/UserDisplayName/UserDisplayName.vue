<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Account } from '@/types/api/Account';
import { htmlizeCustomEmoji, htmlSpecialChars } from '@/lib/utils/textUtils';

const props = defineProps<{
	userInfo: Pick<Account, 'display_name' | 'emojis' | 'pleroma' | 'bot'>;
	class?: string;
}>();
const { t } = useI18n();

const classes = props.class || '';
const userInfo = props.userInfo;

const displayName = htmlizeCustomEmoji(
	htmlSpecialChars(userInfo?.display_name),
	userInfo?.emojis
);
</script>

<template>
	<span :class="`user-display-name ${classes}`">
		<bdi v-html="displayName" />
		
		<span v-if="userInfo?.pleroma?.is_admin" class="badge">
			{{ t('user.role_badges.admin') }}
		</span>
		<span v-else-if="userInfo?.pleroma?.is_moderator" class="badge">
			{{ t('user.role_badges.moderator') }}
		</span>

		<span v-if="userInfo?.bot" class="badge">
			{{ t('user.role_badges.bot') }}
		</span>
	</span>
</template>

<style lang="scss">
.user-display-name {
	width: 100%;
	vertical-align: middle;

	.badge {
		display: inline-block;
		background: var(--accent-color);
		color: var(--accent-text-color);
		font-size: 0.7em;
		padding: 0 0.35em;
		margin-left: 0.5em;
	}
}
</style>
