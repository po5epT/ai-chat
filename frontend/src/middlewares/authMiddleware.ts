import type { NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router';

import { useAuthStore } from '@/stores/auth';

export const authMiddleware = (
	to: RouteLocationNormalized,
	from: RouteLocationNormalizedLoaded,
	next: NavigationGuardNext,
) => {
	const authStore = useAuthStore();

	if (to.name !== 'login' && !authStore.isLoggedIn) {
		next({ name: 'login' });
	} else if (to.name === 'login' && authStore.isLoggedIn) {
		next({ name: 'home' });
	} else {
		next();
	}
};
