import type { Router, RouteRecordRaw } from 'vue-router';

// @ts-ignore
import PrimarySidebar from '@/layouts/PrimarySidebar.vue';

const settingsRoutes: RouteRecordRaw[] = [
	{
		path: '/settings',
		name: 'settings',
		components: {
			// @ts-ignore
			default: () => import('../pages/SettingsPage.vue'),
			sidebar: PrimarySidebar,
		},
	},
];

export default (router: Router) => {
	settingsRoutes.forEach(router.addRoute);
};
