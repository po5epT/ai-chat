<template>
	<nav class="nav">
		<slot name="title">
			<h2>AI Infuse</h2>
		</slot>

		<AUserProfile
			:user="authStore.user!"
			class="nav__user"
			@logout="handleLogout"
		/>
	</nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import AUserProfile from '@/components/user-profile/AUserProfile.vue';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
	return router.push({ name: 'logout' });
};
</script>
