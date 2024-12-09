import type { IApiService, IResponse } from '@/services/api';
import type { IChat, IChatMessage, IChatMessageFile } from '@/modules/chats/types';
import { apiService } from '@/services/api';
import { createFormDataFromObject } from '@/utils/formData';

type TGetMessagesPayload = {
	start_key?: string;
	limit?: string;
};

type TCreateMessagePayload = Omit<IChatMessage, 'id' | 'user_id' | 'files'>;

const createChatMessagesRepository = (apiService: IApiService) => {
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

		return apiService.get<IResponse<IChatMessage[]>>(`${baseURL}?${searchParams}`);
	};

	const createMessage = async (
		payload: TCreateMessagePayload,
		files: IChatMessageFile[] = [],
	): Promise<IChatMessage> => {
		const headers = new Headers({ 'Content-Type': 'multipart/form-data' });
		const formData = createFormDataFromObject(payload);

		files.forEach((file) => {
			formData.append('files[]', file.rawFile!, file.name);
		});

		return apiService.post<IChatMessage>(baseURL, formData, { headers });
	};

	const updateMessage = async (
		id: IChatMessage['id'],
		payload: IChatMessage,
		files: IChatMessageFile[] = [],
	): Promise<IChatMessage> => {
		const headers = new Headers({ 'Content-Type': 'multipart/form-data' });
		const formData = createFormDataFromObject(payload);

		files.forEach((file) => {
			formData.append('files[]', file.rawFile!, file.name);
		});

		return apiService.patch<IChatMessage>(`${baseURL}/${id}`, formData, { headers });
	};

	const deleteMessage = async (id: IChatMessage['id']): Promise<void> => {
		return apiService.delete<void>(`${baseURL}/${id}`);
	};

	return {
		getMessages,
		createMessage,
		updateMessage,
		deleteMessage,
	};
};

export const chatMessagesRepository = createChatMessagesRepository(apiService);
