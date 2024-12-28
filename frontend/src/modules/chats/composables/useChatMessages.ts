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

	// bumped on every reset so responses of a previously opened chat are dropped
	let generation = 0;

	const resetChatMessages = () => {
		generation++;
		chatMessages.value = [];
		startKey.value = undefined;
	};

	const getMessages = async (chatId: IChat['id'], { limit }: LoadMessageOptions) => {
		const searchParamsService = new SearchParamsService();
		const searchString = searchParamsService
			.addParam('chat_id', chatId)
			.addParam('limit', limit)
			.addParam('start_key', startKey.value, (value) => JSON.stringify(value))
			.toString();

		const requestGeneration = generation;

		isMessagesLoading.value = true;
		const [err, res] = await flatry(chatMessagesRepository.getMessages(searchString));
		isMessagesLoading.value = false;

		if (requestGeneration !== generation) {
			return null;
		}

		if (err) {
			throw err;
		}

		res.data.sort((messageA, messageB) => messageA.timestamp - messageB.timestamp);

		return res;
	};

	const loadChatMessages = async (chatId: IChat['id'], options: LoadMessageOptions) => {
		const res = await getMessages(chatId, options);

		if (!res) {
			return;
		}

		chatMessages.value = res.data;
		startKey.value = res.start_key;
	};

	const loadChatMessagesMore = async (chatId: IChat['id'], options: LoadMessageOptions) => {
		const [err, res] = await flatry(getMessages(chatId, options));

		if (err) {
			throw err;
		}

		if (!res) {
			return;
		}

		chatMessages.value = res.data.concat(chatMessages.value);
		startKey.value = res.start_key;
	};

	const createChatMessage = async (chatMessageData: IChatMessage) => {
		const optimisticId = chatMessageData.id;
		const findOptimisticIndex = () => chatMessages.value.findIndex((message) => message.id === optimisticId);

		isMessageCreating.value = true;
		const [err, createdChatMessage] = await flatry(chatMessagesRepository.createMessage(chatMessageData));
		isMessageCreating.value = false;

		const index = findOptimisticIndex();

		if (err) {
			if (index !== -1) {
				chatMessages.value.splice(index, 1);
			}

			throw err;
		}

		// the chat was switched while the request was pending
		if (index === -1) {
			return;
		}

		const { requested_message_id, ...restData } = createdChatMessage;

		chatMessages.value.splice(index, 1, { ...chatMessageData, id: requested_message_id }, restData);
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
