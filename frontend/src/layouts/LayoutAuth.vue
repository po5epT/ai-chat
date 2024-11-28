<template>
	<div class="auth-image"></div>

	<main class="auth-main">
		<slot />
	</main>
</template>

<script setup lang="ts"></script>

<style scoped>
.auth-image {
	width: 50vw;
	background-image: url('/img/login-bg.jpg');
	background-repeat: no-repeat;
	background-position: center top;
}

.auth-main {
	display: grid;
	place-items: center;
	place-self: center;
}
</style>
