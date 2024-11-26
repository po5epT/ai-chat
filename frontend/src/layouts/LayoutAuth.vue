<template>
	<div class="login-image"></div>

	<main class="login-main">
		<slot />
	</main>
</template>

<script setup lang="ts"></script>

<style scoped>
.login-image {
	width: 50vw;
	background-image: url('/img/login-bg.jpg');
	background-repeat: no-repeat;
	background-position: center top;
}

.login-main {
	display: grid;
	place-items: center;
	place-self: center;
}
</style>
