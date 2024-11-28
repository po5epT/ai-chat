import type { Router, RouteRecordRaw } from 'vue-router';

const authRoutes: RouteRecordRaw[] = [
	{
		path: '/login',
		name: 'login',
		// @ts-ignore
		component: () => import('@/pages/LoginPage.vue'),
	},
	{
		path: '/logout',
		name: 'logout',
		// @ts-ignore
		component: () => import('@/pages/LogoutPage.vue'),
	},
];

export default (router: Router) => {
	authRoutes.forEach(router.addRoute);
};
