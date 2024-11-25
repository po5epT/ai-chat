import { createRouter, createWebHistory } from 'vue-router';

import { addChatsRoutes } from '@/modules/chats/router';
import { addSettingsRoutes } from '@/modules/settings/router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [],
});

router.beforeResolve((to, from, next) => {
	if (to.fullPath === from.fullPath) {
		return false;
	}

	next();
});

addChatsRoutes(router);
addSettingsRoutes(router);

router.addRoute({
	path: '/:pathMatch(.*)*',
	name: 'page404',
	// @ts-ignore
	component: () => import('@/pages/Page404.vue'),
});

export default router;
