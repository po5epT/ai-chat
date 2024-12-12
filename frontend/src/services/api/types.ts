export type RequestCallback = (config: RequestInit) => RequestInit;
export type ResponseCallback = (response: Response) => void;
export type ResponseErrorCallback = (errorResponse: Response, data?: any) => void;

export interface IApiService {
	onRequest(callback: RequestCallback): void;
	onResponse(callback: ResponseCallback): void;
	onResponseError(callback: ResponseErrorCallback): void;

	get<T>(url: string, config?: RequestInit): Promise<T>;
	post<T>(url: string, payload: any, config?: RequestInit): Promise<T>;
	put<T>(url: string, payload: any, config?: RequestInit): Promise<T>;
	patch<T>(url: string, payload: any, config?: RequestInit): Promise<T>;
	delete<T>(url: string, config?: RequestInit): Promise<T>;
}

export interface IStartKey {
	id: string;
	chat_id: string;
	timestamp: number;
}

export interface IResponse<T> {
	data: T;
	start_key: IStartKey | null;
}
