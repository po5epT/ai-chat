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
import flatry from 'flatry';

import LayoutAuth from '@/layouts/LayoutAuth.vue';
import AppLogo from '@/components/icons/AppLogo.vue';
import { authRepository } from '@/repositories';
import { useAuthStore } from '@/stores/auth';
import { errorNotify } from '@/services/notify';

const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
	authStore.isPending = true;
	const [err, user] = await flatry(authRepository.login());

	if (err) {
		errorNotify(err.message ?? err);
		return;
	}

	authStore.login(user);

	return router.push({ path: '/' }).finally(() => (authStore.isPending = false));
};
</script>

<style scoped>
.login-text {
	text-align: center;
	margin-top: 20px;
	margin-bottom: 24px;
}
</style>
