import { type IApiClient } from '@/services/api';

export class FetchClient implements IApiClient {
	private readonly baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	private getHeadersByData(data: any): HeadersInit {
		const contentType = data instanceof FormData ? 'multipart/form-data' : 'application/json';

		return { 'Content-Type': contentType };
	}

	private getBodyByData(data: any): BodyInit {
		return data instanceof FormData ? data : JSON.stringify(data);
	}

	async get<T>(url: string): Promise<T> {
		const response = await fetch(`${this.baseURL}${url}`);

		const jsonResponse = await response.json();

		if (response.status !== 200) {
			throw new Error(jsonResponse.api_error);
		}

		return jsonResponse;
	}

	async post<T>(url: string, data: any): Promise<T> {
		const response = await fetch(`${this.baseURL}${url}`, {
			method: 'POST',
			headers: this.getHeadersByData(data),
			body: this.getBodyByData(data),
		});

		const jsonResponse = await response.json();

		if (response.status !== 200) {
			throw new Error(jsonResponse.api_error);
		}

		return jsonResponse;
	}

	async put<T>(url: string, data: any): Promise<T> {
		const response = await fetch(`${this.baseURL}${url}`, {
			method: 'PUT',
			headers: this.getHeadersByData(data),
			body: this.getBodyByData(data),
		});

		const jsonResponse = await response.json();

		if (response.status !== 200) {
			throw new Error(jsonResponse.api_error);
		}

		return jsonResponse;
	}

	async patch<T>(url: string, data: any): Promise<T> {
		const response = await fetch(`${this.baseURL}${url}`, {
			method: 'PATCH',
			headers: this.getHeadersByData(data),
			body: this.getBodyByData(data),
		});

		const jsonResponse = await response.json();

		if (response.status !== 200) {
			throw new Error(jsonResponse.api_error);
		}

		return jsonResponse;
	}

	async delete<T>(url: string): Promise<T> {
		const response = await fetch(`${this.baseURL}${url}`, {
			method: 'DELETE',
		});

		const jsonResponse = await response.json();

		if (response.status !== 200) {
			throw new Error(jsonResponse.api_error);
		}

		return jsonResponse;
	}
}

const createFetchApi = (baseUrl: string) => {
	return new FetchClient(baseUrl);
};

export const fetchApi = createFetchApi('/api/v1');
