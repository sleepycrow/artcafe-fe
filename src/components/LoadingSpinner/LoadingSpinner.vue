<template>
	<div class="generic-loading-spinner">
		<span class="material-symbols-outlined">progress_activity</span>
	</div>
</template>

<style lang="scss">
.generic-loading-spinner {
	width: 100%;
	padding: 1rem;
	text-align: center;

	span {
		font-size: 3rem;
		animation: generic-loading-spinner-spin 1s infinite;
	}
}

@keyframes generic-loading-spinner-spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>