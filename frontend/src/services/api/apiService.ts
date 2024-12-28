import { createFetchService } from '@/services/api/fetchService';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { createApiError, UnauthorizedError } from '@/services/error';

export const apiService = createFetchService('/api/v1');

apiService.onRequest((config) => {
	return config;
});

apiService.onResponse((response) => {});

apiService.onResponseError((response, data) => {
	const error = createApiError(data?.api_error ?? response.statusText, response);

	if (error instanceof UnauthorizedError) {
		console.error(error);
		useAuthStore().clearUser();
		router.push({ name: 'login' });
	}

	throw error;
});
