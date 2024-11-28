import { createRouter, createWebHistory } from 'vue-router';

import { authMiddleware } from '@/middlewares';
import { addChatsRoutes } from '@/modules/chats/router';
import { addSettingsRoutes } from '@/modules/settings/router';

import addAuthRoutes from './authRoutes';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: '/chats',
		},
	],
});

router.beforeEach(authMiddleware);

addAuthRoutes(router);
addChatsRoutes(router);
addSettingsRoutes(router);

router.addRoute({
	path: '/:pathMatch(.*)*',
	name: '404',
	// @ts-ignore
	component: () => import('@/pages/404Page.vue'),
});

export default router;
