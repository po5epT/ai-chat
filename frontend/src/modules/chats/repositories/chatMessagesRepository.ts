import type { IApiService, IResponse } from '@/services/api';
import type { IChatMessage } from '@/modules/chats/types';
import { apiService } from '@/services/api';
import { createFormDataFromObject } from '@/utils/formData';

type TCreateMessagePayload = Omit<IChatMessage, 'id' | 'user_id' | 'requested_message_id'>;

const createChatMessagesRepository = (apiService: IApiService) => {
	const baseURL = '/messages';

	const getMessages = async (query: string): Promise<IResponse<IChatMessage[]>> => {
		return apiService.get<IResponse<IChatMessage[]>>(`${baseURL}?${query}`);
	};

	const createMessage = async (
		payload: TCreateMessagePayload,
	): Promise<IChatMessage & { requested_message_id: IChatMessage['id'] }> => {
		const headers = { enctype: 'multipart/form-data' };

		const { files = [], ...data } = payload;
		const formData = createFormDataFromObject(data);

		files.forEach((file) => {
			formData.append('files[]', file.rawFile!, file.name);
		});

		return apiService.post<IChatMessage & { requested_message_id: IChatMessage['id'] }>(baseURL, formData, {
			headers,
		});
	};

	const updateMessage = async (id: IChatMessage['id'], payload: IChatMessage): Promise<IChatMessage> => {
		const headers = { enctype: 'multipart/form-data' };
		const { files = [], ...data } = payload;
		const formData = createFormDataFromObject(data);

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
