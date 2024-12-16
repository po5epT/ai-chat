import { ref } from 'vue';
import flatry from 'flatry';

import type { IChat, IChatMessage } from '@/modules/chats/types';
import type { IStartKey } from '@/services/api';
import { chatMessagesRepository } from '@/modules/chats/repositories';
import { SearchParamsService } from '@/services/query';

type LoadMessageOptions = {
	limit?: number | string;
};

export const useChatMessages = () => {
	const chatMessages = ref<IChatMessage[]>([]);
	const isMessagesLoading = ref(false);
	const isMessageCreating = ref(false);
	const startKey = ref<IStartKey | null>();

	const resetChatMessages = () => {
		chatMessages.value = [];
		startKey.value = undefined;
	};

	const getMessages = async (chatId: IChat['id'], { limit }: LoadMessageOptions) => {
		const searchParamsService = new SearchParamsService();
		const searchString = searchParamsService
			.addParam('chat_id', chatId)
			.addParam('limit', limit)
			.addParam('start_key', startKey.value, (value) => encodeURIComponent(JSON.stringify(value)))
			.toString();

		isMessagesLoading.value = true;
		const [err, res] = await flatry(chatMessagesRepository.getMessages(searchString));
		isMessagesLoading.value = false;

		if (err) {
			throw err;
		}

		res.data.sort((messageA, messageB) => messageA.timestamp - messageB.timestamp);

		return res;
	};

	const loadChatMessages = async (chatId: IChat['id'], options: LoadMessageOptions) => {
		const res = await getMessages(chatId, options);

		chatMessages.value = res.data;
		startKey.value = res.start_key;
	};

	const loadChatMessagesMore = async (chatId: IChat['id'], options: LoadMessageOptions) => {
		const [err, res] = await flatry(getMessages(chatId, options));

		if (err) {
			throw err;
		}

		chatMessages.value = res.data.concat(chatMessages.value);
		startKey.value = res.start_key;
	};

	const createChatMessage = async (chatMessageData: IChatMessage) => {
		isMessageCreating.value = true;
		const [err, createdChatMessage] = await flatry(chatMessagesRepository.createMessage(chatMessageData));
		isMessageCreating.value = false;

		if (err) {
			throw err;
		}

		const { requested_message_id, ...restData } = createdChatMessage;

		chatMessageData.id = requested_message_id;

		chatMessages.value.pop();
		chatMessages.value.push(chatMessageData);
		chatMessages.value.push(restData);
	};

	return {
		chatMessages,
		startKey,
		isMessagesLoading,
		loadChatMessages,
		loadChatMessagesMore,
		createChatMessage,
		isMessageCreating,
		resetChatMessages,
	};
};
