import type { IApiService, IResponse } from '@/services/api';
import type { IChat, NewChatModel } from '@/modules/chats/types';
import { apiService } from '@/services/api';

const createChatsRepository = (apiService: IApiService) => {
	const baseURL = '/chats';

	const getChats = async (): Promise<IResponse<IChat[]>> => {
		return apiService.get<IResponse<IChat[]>>(baseURL);
	};

	const getChat = async (id: IChat['id']): Promise<IChat> => {
		return apiService.get<IChat>(`${baseURL}/${id}`);
	};

	const createChat = async (payload: NewChatModel): Promise<IChat> => {
		return apiService.post<IChat>(baseURL, payload);
	};

	const updateChat = async (id: IChat['id'], payload: Partial<IChat>): Promise<IChat> => {
		return apiService.patch<IChat>(`${baseURL}/${id}`, payload);
	};

	const deleteChat = async (id: IChat['id']): Promise<void> => {
		return apiService.delete<void>(`${baseURL}/${id}`);
	};

	return {
		getChats,
		getChat,
		createChat,
		updateChat,
		deleteChat,
	};
};

export const chatsRepository = createChatsRepository(apiService);
