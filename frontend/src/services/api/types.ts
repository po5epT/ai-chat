export interface IApiClient {
	get<T>(url: string): Promise<T>;
	post<T>(url: string, payload: any): Promise<T>;
	put<T>(url: string, payload: any): Promise<T>;
	patch<T>(url: string, payload: any): Promise<T>;
	delete<T>(url: string): Promise<T>;
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
