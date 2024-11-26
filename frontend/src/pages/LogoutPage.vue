<template>
	<AppLogo style="width: 50px; height: auto" />

	<p class="logout-text">Thank you for <br />being with us</p>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import AppLogo from '@/components/icons/AppLogo.vue';
import { authRepository } from '@/repositories';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const logout = async () => {
	await authRepository.logout();

	authStore.logout();
	await router.push({ name: 'login' });
};

logout();
</script>

<style scoped>
.logout-text {
	text-align: center;
	margin-top: 20px;
	margin-bottom: 24px;
}
</style>
