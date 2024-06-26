<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';


// Pull in stuff from the outside
const stores = {
	auth: useAuthStore()
};


function onLogout(e: any){
	e.preventDefault();
	stores.auth.logoutUser()
		.then(console.log);
}
</script>

<template>
	<main>
    <h1>you are now being gay manually</h1>

    <fieldset v-if="stores.auth.isAppRegistered">
      <form v-if="stores.auth.isLoggedIn" @submit="onLogout">
        <h3>Logout</h3>

        <button class="btn">Log out</button>
      </form>
    </fieldset>
	</main>
</template>
