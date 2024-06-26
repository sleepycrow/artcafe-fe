<script setup lang="ts">
import * as yup from 'yup';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';


// Pull in stuff from the outside
const stores = {
	auth: useAuthStore()
};


const genericFieldRules = yup.string().required();

function onSubmit({ username, password }, form){
	stores.auth.loginUser(username, password);

	form.setValues({ password: '' }, false);
	form.setFieldTouched('password', false);
}
</script>

<template>
	<Form
		v-if="stores.auth.isAppRegistered"
		@submit="onSubmit"
		class="simple-form"
	>
		<div class="simple-form__input">
			<label for="username-field">Username:</label>
			<Field
				name="username"
				id="username-field"
				type="text"
				:rules="genericFieldRules"
			/>
			<ErrorMessage name="username" />
		</div>

		<div class="simple-form__input">
			<label for="password-field">Password:</label>
			<Field
				name="password"
				id="password-field"
				type="password"
				:rules="genericFieldRules"
			/> 
			<ErrorMessage name="password" />
		</div>

		<div class="simple-form__actions">
			<button class="btn">Log in</button>
		</div>
	</form>
</template>
