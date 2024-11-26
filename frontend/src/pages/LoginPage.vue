<template>
	<LayoutAuth>
		<AppLogo style="width: 50px; height: auto" />

		<p class="login-text">Enter with your <br />Microsoft account</p>

		<ElButton
			type="primary"
			:loading="authStore.isPending"
			@click="handleLogin"
		>
			Login
		</ElButton>
	</LayoutAuth>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ElButton } from 'element-plus';

import LayoutAuth from '@/layouts/LayoutAuth.vue';
import AppLogo from '@/components/icons/AppLogo.vue';
import { authRepository } from '@/repositories';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
	authStore.isPending = true;
	const user = await authRepository.login();
	authStore.isPending = false;

	authStore.login(user);
	await router.push({ path: '/' });
};
</script>

<style scoped>
.login-text {
	text-align: center;
	margin-top: 20px;
	margin-bottom: 24px;
}
</style>
