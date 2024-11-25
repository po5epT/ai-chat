import { fetchApi, type IApiClient } from '@/services/api';
import { delay } from '@/utils';
import type { IChat, IChatMessage } from '@/modules/chats/types';
import {
	createMockChatMessage,
	createMockSystemChatMessage,
	createMockSystemFirstChatMessage,
} from '@/modules/chats/mocks';

type TGetMessagesPayload = Partial<{
	start: string;
	limit: string;
}>;

const createChatMessagesRepository = (apiClient: IApiClient) => {
	const baseURL = '/chats';
	const defaultStart = '0';
	const defaultLimit = '50';

	const getMessages = async (chatId: IChat['id'], payload: TGetMessagesPayload = {}): Promise<IChatMessage[]> => {
		const query = {
			chat_id: chatId,
			start: payload.start ?? defaultStart,
			limit: payload.limit ?? defaultLimit,
		};

		const searchParams = new URLSearchParams(query);

		await delay(700);
		//return apiClient.get<IChatMessage[]>(`${baseURL}?${searchParams.toString()}`);
		return Promise.resolve([
			createMockSystemFirstChatMessage(),
			createMockChatMessage(),
			createMockSystemChatMessage(),
			createMockChatMessage(),
			createMockSystemChatMessage(),
			createMockChatMessage(),
			createMockSystemChatMessage(),
		]);
	};

	const createMessage = async (payload: FormData | IChatMessage): Promise<IChatMessage> => {
		await delay(350);
		return payload as IChatMessage;

		// return apiClient.post<IChatMessage | FormData>(baseURL, payload);
	};

	const updateMessage = async (id: IChatMessage['id'], payload: Partial<IChatMessage>): Promise<IChatMessage> => {
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
