<script setup lang="ts">
import { ref, type Ref } from 'vue';
import _capitalize from 'lodash/capitalize';
import _isEmpty from 'lodash/isEmpty';
import { useInstanceStore } from '@/stores/instance';


const stores = {
	instance: useInstanceStore()
};
</script>

<template>
	<img
		class="faded-background-header-img"
		:src="stores.instance.backgroundImage"
		alt="The instance's background image"
	/>

	<div class="login-page-content-wrapper">
		<div class="login-page-content">
			<div class="row">
				<h1>Log in</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad minus sit tenetur quae doloremque itaque, ratione magni natus reprehenderit eius nostrum corporis praesentium doloribus, voluptatibus soluta. Accusantium, ullam? Pariatur, eius.</p>
			</div>

			<div class="row">
				<h1>Sign up</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad minus sit tenetur quae doloremque itaque, ratione magni natus reprehenderit eius nostrum corporis praesentium doloribus, voluptatibus soluta. Accusantium, ullam? Pariatur, eius.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad minus sit tenetur quae doloremque itaque, ratione magni natus reprehenderit eius nostrum corporis praesentium doloribus, voluptatibus soluta. Accusantium, ullam? Pariatur, eius.</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@use '@/assets/globals';

.login-page-content-wrapper {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;


	display: flex;
	align-items: center;
	justify-content: center;
}

.login-page-content {
	display: grid;
	max-width: 768px;
	grid-template-columns: 1fr 1fr;
	gap: 0 1rem;

	.row {
		h1 {
			font-size: 2rem;
			font-weight: normal;
			margin: 1rem 0;
		}
	}
}
</style>
