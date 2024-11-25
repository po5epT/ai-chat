<template>
	<nav class="nav">
		<slot name="title">
			<h2>AI Infuse</h2>
		</slot>

		<AUserProfile
			:user="userStore.user!"
			class="nav__user"
		/>
	</nav>
</template>

<script setup lang="ts">
import AUserProfile from '@/components/user-profile/AUserProfile.vue';
import { useUserStore } from '@/stores/auth';

const userStore = useUserStore();
</script>
