import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { IUser } from '@/types';

export const useAuthStore = defineStore('auth', () => {
	const isPending = ref(false);
	const user = ref<IUser | null>();

	const login = (candidate: IUser) => {
		user.value = candidate;
	};

	const logout = () => {
		user.value = null;
	};

	return {
		user,
		isPending,
		login,
		logout,
	};
});
