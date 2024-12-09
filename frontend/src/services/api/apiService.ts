import { createFetchService } from '@/services/api/fetchService';

export const apiService = createFetchService('/api/v1');

apiService.onRequest((config) => {
	console.log('onRequest:config', config);

	return config;
});

apiService.onResponse((response) => {
	console.log('onResponse:response', response);

	return response;
});
