import type { IApiClient, IResponse } from '@/services/api';
import type { IChat, IChatMessage } from '@/modules/chats/types';
import { fetchApi } from '@/services/api';

type TGetMessagesPayload = {
	start_key?: string;
	limit?: string;
};

type TCreateMessagePayload = Omit<IChatMessage, 'id' | 'user_id'>;

const createChatMessagesRepository = (apiClient: IApiClient) => {
	const baseURL = '/messages';
	const defaultStartKey = '';
	const defaultLimit = '50';

	const getMessages = async (
		chatId: IChat['id'],
		payload: TGetMessagesPayload = {},
	): Promise<IResponse<IChatMessage[]>> => {
		const query = {
			chat_id: chatId,
			start_key: payload.start_key ?? defaultStartKey,
			limit: payload.limit ?? defaultLimit,
		};

		const searchParams = new URLSearchParams(query).toString();

		return apiClient.get<IResponse<IChatMessage[]>>(`${baseURL}?${searchParams}`);
	};

	const createMessage = async (payload: FormData | TCreateMessagePayload): Promise<IChatMessage> => {
		return apiClient.post<IChatMessage>(baseURL, payload);
	};

	const updateMessage = async (id: IChatMessage['id'], payload: IChatMessage): Promise<IChatMessage> => {
		return apiClient.patch<IChatMessage>(`${baseURL}/${id}`, payload);
	};

	const deleteMessage = async (id: IChatMessage['id']): Promise<void> => {
		return apiClient.delete<void>(`${baseURL}/${id}`);
	};

	return {
		getMessages,
		createMessage,
		updateMessage,
		deleteMessage,
	};
};

export const chatMessagesRepository = createChatMessagesRepository(fetchApi);
