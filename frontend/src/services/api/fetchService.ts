import type { IApiService, RequestCallback, ResponseCallback, ResponseErrorCallback } from '@/services/api';

export class FetchService implements IApiService {
	private readonly baseURL: string;
	private readonly config: RequestInit;
	private readonly requestCallbacks: RequestCallback[] = [];
	private responseCallback: ResponseCallback = () => {};
	private responseErrorCallback: ResponseErrorCallback = () => {};

	constructor(baseURL: string, config: RequestInit = {}) {
		this.baseURL = baseURL;
		this.config = config;

		config.headers = config.headers ?? { 'Content-Type': 'application/json' };
	}

	onRequest(callback: RequestCallback) {
		if (typeof callback !== 'function') {
			return;
		}

		this.requestCallbacks.push(callback);
	}

	onResponse(callback: ResponseCallback) {
		if (typeof callback !== 'function') {
			return;
		}

		this.responseCallback = callback;
	}

	onResponseError(callback: ResponseErrorCallback) {
		if (typeof callback !== 'function') {
			return;
		}

		this.responseErrorCallback = callback;
	}

	private async parseBody(response: Response): Promise<any> {
		const text = await response.text();

		if (!text) {
			return undefined;
		}

		try {
			return JSON.parse(text);
		} catch {
			return undefined;
		}
	}

	private transformBody(data: any, config: RequestInit) {
		if ((config.headers as any)?.['Content-Type'] === 'application/json') {
			return JSON.stringify(data);
		}

		return data;
	}

	async get<T>(url: string, config: RequestInit = {}): Promise<T> {
		const requestConfig = Object.assign({}, this.config, config);

		this.requestCallbacks.forEach((callback) => {
			Object.assign(requestConfig, callback(requestConfig));
		});

		const response = await fetch(`${this.baseURL}${url}`, requestConfig);
		this.responseCallback(response);
		const jsonResponse = await this.parseBody(response);

		if (!response.ok && typeof this.responseErrorCallback === 'function') {
			this.responseErrorCallback(response, jsonResponse);
		}

		return jsonResponse;
	}

	async post<T>(url: string, data: any, config: RequestInit = {}): Promise<T> {
		const requestConfig = Object.assign({}, this.config, config);

		this.requestCallbacks.forEach((callback) => {
			Object.assign(requestConfig, callback(requestConfig));
		});

		requestConfig.method = 'POST';
		requestConfig.body = this.transformBody(data, requestConfig);

		const response = await fetch(`${this.baseURL}${url}`, requestConfig);
		this.responseCallback(response);
		const jsonResponse = await this.parseBody(response);

		if (!response.ok && typeof this.responseErrorCallback === 'function') {
			this.responseErrorCallback(response, jsonResponse);
		}

		return jsonResponse;
	}

	async put<T>(url: string, data: any, config: RequestInit = {}): Promise<T> {
		const requestConfig = Object.assign({}, this.config, config);

		this.requestCallbacks.forEach((callback) => {
			Object.assign(requestConfig, callback(requestConfig));
		});

		requestConfig.method = 'PUT';
		requestConfig.body = this.transformBody(data, requestConfig);

		const response = await fetch(`${this.baseURL}${url}`, requestConfig);
		this.responseCallback(response);
		const jsonResponse = await this.parseBody(response);

		if (!response.ok && typeof this.responseErrorCallback === 'function') {
			this.responseErrorCallback(response, jsonResponse);
		}

		return jsonResponse;
	}

	async patch<T>(url: string, data: any, config: RequestInit = {}): Promise<T> {
		const requestConfig = Object.assign({}, this.config, config);

		this.requestCallbacks.forEach((callback) => {
			Object.assign(requestConfig, callback(requestConfig));
		});

		requestConfig.method = 'PATCH';
		requestConfig.body = this.transformBody(data, requestConfig);

		const response = await fetch(`${this.baseURL}${url}`, requestConfig);
		this.responseCallback(response);
		const jsonResponse = await this.parseBody(response);

		if (!response.ok && typeof this.responseErrorCallback === 'function') {
			this.responseErrorCallback(response, jsonResponse);
		}

		return jsonResponse;
	}

	async delete<T>(url: string, config: RequestInit = {}): Promise<T> {
		const requestConfig = Object.assign({}, this.config, config);

		this.requestCallbacks.forEach((callback) => {
			Object.assign(requestConfig, callback(requestConfig));
		});

		requestConfig.method = 'DELETE';

		const response = await fetch(`${this.baseURL}${url}`, requestConfig);
		this.responseCallback(response);
		const jsonResponse = await this.parseBody(response);

		if (!response.ok && typeof this.responseErrorCallback === 'function') {
			this.responseErrorCallback(response, jsonResponse);
		}

		return jsonResponse;
	}
}

export const createFetchService = (baseUrl: string, config: RequestInit = {}) => {
	return new FetchService(baseUrl, config);
};
