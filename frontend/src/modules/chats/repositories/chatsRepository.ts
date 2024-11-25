import { fetchApi, type IApiClient } from '@/services/api';
import { delay } from '@/utils';
import type { IChat } from '@/modules/chats/types';
import { createMockChat } from '@/modules/chats/mocks';

const createChatsRepository = (apiClient: IApiClient) => {
	const baseURL = '/chats';

	const getChats = async (): Promise<IChat[]> => {
		await delay(500);
		return Promise.resolve([createMockChat(), createMockChat(), createMockChat()]);
		//return apiClient.get<IChat[]>(baseURL);
	};

	const getChat = async (id: IChat['id']): Promise<IChat> => {
		return apiClient.get<IChat>(`${baseURL}/${id}`);
	};

	const createChat = async (payload: { first_prompt?: string }): Promise<IChat> => {
		const chat: IChat = {
			id: 'uniqId1',
			name: 'Auto-generated Chat long long name',
			folder_id: null,
			is_pinned: false,
			user_id: 'user_id_1',
			created_timestamp: +new Date(),
			used_timestamp: +new Date(),
		};
		await delay(250);
		return chat;

		//return apiClient.post<IChat>(baseURL, payload);
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
