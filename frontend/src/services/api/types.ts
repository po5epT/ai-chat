export type RequestCallback = (config: RequestInit) => RequestInit;
export type ResponseCallback = (response: Response) => Response;

export interface IApiService {
	onRequest(callback: RequestCallback): void;
	onResponse(response: ResponseCallback): void;

	get<T>(url: string, config?: RequestInit): Promise<T>;
	post<T>(url: string, payload: any, config?: RequestInit): Promise<T>;
	put<T>(url: string, payload: any, config?: RequestInit): Promise<T>;
	patch<T>(url: string, payload: any, config?: RequestInit): Promise<T>;
	delete<T>(url: string, config?: RequestInit): Promise<T>;
}

export interface ILastEvaluatedKey {
	id: string;
	chat_id: string;
	timestamp: number;
}

export interface IResponse<T> {
	data: T;
	last_evaluated_key: ILastEvaluatedKey | null;
}
