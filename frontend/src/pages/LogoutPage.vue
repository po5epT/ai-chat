<template>
	<LayoutAuth>
		<AppLogo style="width: 50px; height: auto" />

		<p class="logout-text">Thank you for <br />being with us</p>
	</LayoutAuth>
</template>

<script setup lang="ts">
import flatry from 'flatry';
import { useRouter } from 'vue-router';

import LayoutAuth from '@/layouts/LayoutAuth.vue';
import AppLogo from '@/components/icons/AppLogo.vue';
import { authRepository } from '@/repositories';
import { useAuthStore } from '@/stores/auth';
import { errorNotify } from '@/services/notify';

const router = useRouter();
const authStore = useAuthStore();

const logout = async () => {
	const [err] = await flatry(authRepository.logout());

	if (err) {
		errorNotify(err.message ?? err);
		return;
	}

	authStore.logout();

	return router.push({ name: 'login' });
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
