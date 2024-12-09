import { UnauthorizedError } from '@/services/error/UnauthorizedError';

export const createApiError = (message?: string, response?: Response): UnauthorizedError | Error => {
	if (response?.status === 401) {
		return new UnauthorizedError(message);
	}

	return new Error(message);
};
