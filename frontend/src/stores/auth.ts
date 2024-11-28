import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import flatry from 'flatry';

import type { IUser } from '@/types';
import { authRepository } from '@/repositories';

export const useAuthStore = defineStore('auth', () => {
	const STORAGE_USER_KEY = 'AIP_USER';
	const isPending = ref(false);
	const user = ref<IUser | null>(null);
	const isLoggedIn = computed(() => !!user.value);

	const authorize = async () => {
		const cachedUser: IUser | null = JSON.parse(localStorage.getItem(STORAGE_USER_KEY) ?? 'null');

		if (cachedUser) {
			user.value = cachedUser;

			// TODO remove param when api is presented
			const [err, isValid] = await flatry(authRepository.validate(true));

			if (err) {
				throw err;
			}

			// TODO consider possibility to get error text from server
			if (!isValid) {
				throw new Error('Session validation failed.<br /> Please log in');
			}
		}
	};

	const login = async () => {
		isPending.value = true;
		const [err, authUser] = await flatry(authRepository.login());
		isPending.value = false;

		if (err) {
			throw err;
		}

		user.value = authUser;
		localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(authUser));
	};

	const clearUser = () => {
		user.value = null;
		localStorage.removeItem(STORAGE_USER_KEY);
	};

	const logout = async () => {
		const [err] = await flatry(authRepository.logout());
		clearUser();

		if (err) {
			throw err;
		}
	};

	return {
		user,
		isPending,
		isLoggedIn,
		clearUser,
		authorize,
		login,
		logout,
	};
});
