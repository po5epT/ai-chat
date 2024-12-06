import type { IApiClient, IResponse } from '@/services/api';
import type { IChat } from '@/modules/chats/types';
import { fetchApi } from '@/services/api';

const createChatsRepository = (apiClient: IApiClient) => {
	const baseURL = '/chats';

	const getChats = async (): Promise<IResponse<IChat[]>> => {
		return apiClient.get<IResponse<IChat[]>>(baseURL);
	};

	const getChat = async (id: IChat['id']): Promise<IChat> => {
		return apiClient.get<IChat>(`${baseURL}/${id}`);
	};

	const createChat = async (payload: { first_prompt: string }): Promise<IChat> => {
		return apiClient.post<IChat>(baseURL, payload);
	};

	const updateChat = async (id: IChat['id'], payload: Partial<IChat>): Promise<IChat> => {
		return apiClient.patch<IChat>(`${baseURL}/${id}`, payload);
	};

	const deleteChat = async (id: IChat['id']): Promise<void> => {
		return apiClient.delete<void>(`${baseURL}/${id}`);
	};

	return {
		getChats,
		getChat,
		createChat,
		updateChat,
		deleteChat,
	};
};

export const chatsRepository = createChatsRepository(fetchApi);
