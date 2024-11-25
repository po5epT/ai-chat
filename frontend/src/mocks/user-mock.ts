import type { IUser } from '@/types';

export const getUserMock = (): IUser => ({
	id: 'user_1',
	name: 'Alice Gottenberg',
	email: 'alice@site.com',
	avatar_src: '/img/avatar.jpg',
});
