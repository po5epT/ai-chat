import type { IApiService } from '@/services/api';
import type { IUser } from '@/types';
import { apiService } from '@/services/api';
import { delay } from '@/utils';
import { getUserMock } from '@/mocks';

const createAuthRepository = (apiService: IApiService) => {
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

	// TODO remove param when api is presented
	const validate = async (val: boolean): Promise<boolean> => {
		await delay(1000);

		return val;
	};

	return {
		login,
		logout,
		validate,
	};
};

export const authRepository = createAuthRepository(apiService);
