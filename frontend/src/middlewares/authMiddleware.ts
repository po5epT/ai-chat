import type { NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router';

import { useAuthStore } from '@/stores/auth';

export const authMiddleware = (
	to: RouteLocationNormalized,
	from: RouteLocationNormalizedLoaded,
	next: NavigationGuardNext,
) => {
	const authStore = useAuthStore();

	if (to.name !== 'login') {
		if (authStore.isLoggedIn) {
			next();
		} else {
			next({ name: 'login' });
		}
	} else {
		if (authStore.isLoggedIn) {
			next({ path: '/' });
		} else {
			next();
		}
	}
};
