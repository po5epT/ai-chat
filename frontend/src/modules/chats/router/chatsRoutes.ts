import type { Router, RouteRecordRaw } from 'vue-router';
// @ts-ignore
import ChatApp from '../ChatApp.vue';

const chatsRoutes: RouteRecordRaw[] = [
	{
		path: '/chats',
		name: 'chats',
		redirect: '/chats/new-chat',
		component: ChatApp,
		children: [
			{
				path: 'new-chat',
				name: 'newChat',
				// @ts-ignore
				component: () => import('../pages/NewChatPage.vue'),
			},
			{
				path: ':id',
				name: 'chat',
				// @ts-ignore
				component: () => import('../pages/ChatPage.vue'),
			},
		],
	},
];

export default (router: Router) => {
	chatsRoutes.forEach(router.addRoute);
};
