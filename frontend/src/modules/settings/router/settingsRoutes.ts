import type { Router, RouteRecordRaw } from 'vue-router';

const settingsRoutes: RouteRecordRaw[] = [
	{
		path: '/settings',
		name: 'settings',
		// @ts-ignore
		component: () => import('../pages/SettingsPage.vue'),
	},
];

export default (router: Router) => {
	settingsRoutes.forEach(router.addRoute);
};
