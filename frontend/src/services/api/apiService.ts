import { createFetchService } from '@/services/api/fetchService';
import { createApiError, UnauthorizedError } from '@/services/error';

export const apiService = createFetchService('/api/v1');

apiService.onRequest((config) => {
	// console.log('onRequest:config', config);

	return config;
});

apiService.onResponse((response) => {
	// console.log('onResponse:response', response);
});

apiService.onResponseError((response, data) => {
	const error = createApiError(data?.api_error ?? response.statusText, response);

	if (error instanceof UnauthorizedError) {
		console.error(error);
	}

	throw error;
});
