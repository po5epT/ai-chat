<template>
	<LayoutAuth>
		<AppLogo style="width: 50px; height: auto" />

		<p class="logout-text">Thank you for <br />being with us</p>

		<ElButton
			type="primary"
			disabled
		>
			Login
		</ElButton>
	</LayoutAuth>
</template>

<script setup lang="ts">
import flatry from 'flatry';
import { useRouter } from 'vue-router';
import { ElButton } from 'element-plus';

import LayoutAuth from '@/layouts/LayoutAuth.vue';
import AppLogo from '@/components/icons/AppLogo.vue';
import { useAuthStore } from '@/stores/auth';
import { errorNotify } from '@/services/notify';

const router = useRouter();
const authStore = useAuthStore();

const logout = async () => {
	const [err] = await flatry(authStore.logout());

	if (err) {
		errorNotify(err.message ?? err);
		return;
	}

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
