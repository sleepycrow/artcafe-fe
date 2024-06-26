<script setup lang="ts">
// @ts-ignore
const LOGO_PATH = __APP_LOGO_PATH__;
</script>

<template>
	<div class="app-starting-overlay">
		<img
			:src="LOGO_PATH"
			alt="App logo"
		/>
	</div>
</template>

<style lang="scss">
@use '@/assets/globals';

.app-starting-overlay {
	position: fixed;
	top: 0;
	left: 0;
	z-index: globals.$overlay-layer;
	width: 100%;
	height: 100vh;

	background-color: var(--body-background-color);
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		width: 50%;
		height: auto;
		max-width: 256px;
		animation: app-starting-logo-blink 1s infinite linear;
	}
}

@keyframes app-starting-logo-blink {
	0% { opacity: 1; }
	50% { opacity: 0.25; }
	100% { opacity: 1; }
}
</style>