import type { IApiService, RequestCallback, ResponseCallback } from '@/services/api';

export class FetchService implements IApiService {
	private readonly baseURL: string;
	private readonly config: RequestInit;
	private readonly requestCallbacks: RequestCallback[] = [];
	private readonly responseCallbacks: ResponseCallback[] = [];

	constructor(baseURL: string, config: RequestInit = {}) {
		this.baseURL = baseURL;
		this.config = config;

		config.headers = config.headers ?? { 'Content-type': 'application/json' };
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

		this.responseCallbacks.push(callback);
	}

	private transformBody(data: any, config: RequestInit) {
		if ((config.headers as any)?.['Content-type'] === 'application/json') {
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

		this.responseCallbacks.forEach((callback) => {
			Object.assign(response, callback(response));
		});

		return response.json();
	}

	async post<T>(url: string, data: any, config: RequestInit = {}): Promise<T> {
		const requestConfig = Object.assign({}, this.config, config);

		this.requestCallbacks.forEach((callback) => {
			Object.assign(requestConfig, callback(requestConfig));
		});

		requestConfig.method = 'POST';
		requestConfig.body = this.transformBody(data, requestConfig);

		const response = await fetch(`${this.baseURL}${url}`, requestConfig);

		this.responseCallbacks.forEach((callback) => {
			Object.assign(response, callback(response));
		});

		return response.json();
	}

	async put<T>(url: string, data: any, config: RequestInit = {}): Promise<T> {
		const requestConfig = Object.assign({}, this.config, config);

		this.requestCallbacks.forEach((callback) => {
			Object.assign(requestConfig, callback(requestConfig));
		});

		requestConfig.method = 'PUT';
		requestConfig.body = this.transformBody(data, requestConfig);

		const response = await fetch(`${this.baseURL}${url}`, requestConfig);

		this.responseCallbacks.forEach((callback) => {
			Object.assign(response, callback(response));
		});

		return response.json();
	}

	async patch<T>(url: string, data: any, config: RequestInit = {}): Promise<T> {
		const requestConfig = Object.assign({}, this.config, config);

		this.requestCallbacks.forEach((callback) => {
			Object.assign(requestConfig, callback(requestConfig));
		});

		requestConfig.method = 'PATCH';
		requestConfig.body = this.transformBody(data, requestConfig);

		const response = await fetch(`${this.baseURL}${url}`, requestConfig);

		this.responseCallbacks.forEach((callback) => {
			Object.assign(response, callback(response));
		});

		return response.json();
	}

	async delete<T>(url: string, config: RequestInit = {}): Promise<T> {
		const requestConfig = Object.assign({}, this.config, config);

		this.requestCallbacks.forEach((callback) => {
			Object.assign(requestConfig, callback(requestConfig));
		});

		requestConfig.method = 'DELETE';

		const response = await fetch(`${this.baseURL}${url}`, requestConfig);

		this.responseCallbacks.forEach((callback) => {
			Object.assign(response, callback(response));
		});

		return response.json();
	}
}

export const createFetchService = (baseUrl: string, config: RequestInit = {}) => {
	return new FetchService(baseUrl, config);
};
