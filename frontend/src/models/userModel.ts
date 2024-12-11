import type { IUser } from '@/types';

export const createUserModel = (userData: Partial<IUser> = {}): IUser => {
	return {
		id: userData.id ?? 'userId',
		name: userData.name ?? 'Alice Gottenberg',
		email: userData.email ?? 'alice@site.com',
		avatar_src: userData.avatar_src ?? '/img/avatar.jpg',
	};
};
