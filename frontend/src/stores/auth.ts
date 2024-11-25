import { ref } from 'vue';
import { defineStore } from 'pinia';

import { getUserMock } from '../mocks';
import type { IUser } from '../types';

export const useUserStore = defineStore('user', () => {
	const user = ref<IUser>();
	user.value = getUserMock();

	return {
		user,
	};
});
