<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useInstanceStore } from '@/stores/instance';
import LoginForm from '@/components/LoginForm/LoginForm.vue';


const stores = {
	instance: useInstanceStore(),
};
const { t } = useI18n();
</script>

<template>
	<img
		class="faded-background-header-img"
		:src="stores.instance.backgroundImage"
		alt="The instance's background image"
		aria-hidden="true"
	/>

	<div class="login-page-content-wrapper">
		<div class="login-page-content">
			<div class="row">
				<h1>{{ t('login.login') }}</h1>
				<LoginForm />
			</div>

			<div class="row">
				<h1>{{ t('login.signup') }}</h1>

				<div v-if="stores.instance.openRegistrations">
					regs are open!!
				</div>
				<p v-else>
					Sorry, signups are closed at this time.
				</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@use '@/assets/globals';

.login-page-content-wrapper {
	width: 100%;
	height: 100vh;


	display: flex;
	align-items: center;
	justify-content: center;
}

.login-page-content {
	display: grid;
	width: 100%;
	max-width: 768px;
	grid-template-columns: 1fr 1fr;
	gap: 0 1rem;

	.row {
		flex: 1 1 auto;
		
		h1 {
			font-size: 2rem;
			font-weight: normal;
			margin: 1rem 0;
		}

		form {
			width: 75%;
		}
	}
}
</style>
