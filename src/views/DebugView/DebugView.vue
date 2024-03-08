<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'


// Pull in stuff from the outside
const stores = {
	auth: useAuthStore()
}


var elUsr = ref(null)
var elPwd = ref(null)

function onLogin(e){
	e.preventDefault()
	stores.auth.loginUser(elUsr.value.value, elPwd.value.value)
    .then(console.log)

	elUsr.value.value = ''
	elPwd.value.value = ''
}

function onLogout(e){
	e.preventDefault()
	stores.auth.logoutUser()
    .then(console.log)
}
</script>

<template>
	<main>
    <h1>you are now being gay manually</h1>

    <fieldset v-if="stores.auth.isAppRegistered">
      <form v-if="!stores.auth.isLoggedIn" @submit="onLogin">
        <h3>Login</h3>

        <label for="username-field">Username:</label> <input type="text" ref="elUsr" id="username-field" /><br>
        <label for="password-field">Password:</label> <input type="password" ref="elPwd" id="password-field" /><br>
        <button @click="onLogin">Log in</button>
      </form>

      <form v-if="stores.auth.isLoggedIn" @submit="onLogout">
        <h3>Logout</h3>

        <button>Log out</button>
      </form>
    </fieldset>
	</main>
</template>
