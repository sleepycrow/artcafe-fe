<script setup lang="ts">
import { htmlizeCustomEmoji, htmlSpecialChars } from '@/lib/utils/textUtils'

const props = defineProps(['userInfo', 'class'])

const classes = props.class || ''
const userInfo = props.userInfo

const displayName = htmlizeCustomEmoji(
	htmlSpecialChars(userInfo?.display_name),
	userInfo?.emojis
)
</script>

<template>
	<span :class="`user-display-name ${classes}`">
		<bdi v-html="displayName" />
		
		<span v-if="userInfo?.pleroma?.is_admin" class="badge">
			Admin
		</span>
		<span v-else-if="userInfo?.pleroma?.is_moderator" class="badge">
			Mod
		</span>

		<span v-if="userInfo?.bot" class="badge">
			Bot
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
