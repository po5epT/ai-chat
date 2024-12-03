<template>
	<div class="wrapper">
		<RouterView name="sidebar" />

		<RouterView />
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth';
import { errorNotify } from '@/services/notify';

const router = useRouter();
const authStore = useAuthStore();

authStore.authorize().catch((err: Error) => {
	errorNotify(err.message ?? err, { dangerouslyUseHTMLString: true });

	return router.push({ name: 'logout' });
});
</script>
