import { fetchApi, type IApiClient } from '@/services/api';
import type { IUser } from '@/types';
import { delay } from '@/utils';
import { getUserMock } from '@/mocks';

const createAuthRepository = (apiClient: IApiClient) => {
	const baseURL = '/auth';

	const login = async (): Promise<IUser> => {
		await delay(1500);
		return getUserMock();

		//return apiClient.post<IUser>(baseURL, {});
	};

	const logout = async (): Promise<void> => {
		await delay(1000);

		//return apiClient.post<void>(baseURL, {});
	};

	return {
		login,
		logout,
	};
};

export const authRepository = createAuthRepository(fetchApi);
