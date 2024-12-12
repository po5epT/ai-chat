import { ref } from 'vue';
import flatry from 'flatry';

import type { IChat, IChatMessage } from '@/modules/chats/types';
import type { ILastEvaluatedKey } from '@/services/api';
import { chatMessagesRepository } from '@/modules/chats/repositories';

export const useChatMessages = () => {
	const chatMessages = ref<IChatMessage[]>([]);
	const isMessagesLoading = ref(false);
	const startKey = ref<ILastEvaluatedKey | null>();

	const resetChatMessages = () => {
		chatMessages.value = [];
		startKey.value = undefined;
	};

	const getMessages = async (chatId: IChat['id'], limit?: number) => {
		const payload = {
			limit,
			last_evaluated_key: startKey.value ? encodeURIComponent(JSON.stringify(startKey.value)) : undefined,
		};

		isMessagesLoading.value = true;
		const [err, res] = await flatry(chatMessagesRepository.getMessages(chatId, payload));
		isMessagesLoading.value = false;

		if (err) {
			return Promise.reject(err);
		}

		res.data.sort((messageA, messageB) => messageA.timestamp - messageB.timestamp);

		return res;
	};

	const loadChatMessages = async (chatId: IChat['id'], limit?: number) => {
		const [err, res] = await flatry(getMessages(chatId, limit));

		if (err) {
			return Promise.reject(err);
		}

		chatMessages.value = res.data;
		startKey.value = res.last_evaluated_key;
	};

	const loadChatMessagesMore = async (chatId: IChat['id'], limit?: number) => {
		if (startKey.value === null) {
			return;
		}

		const [err, res] = await flatry(getMessages(chatId, limit));

		if (err) {
			return Promise.reject(err);
		}

		chatMessages.value = [...res.data, ...chatMessages.value];
		startKey.value = res.last_evaluated_key;
	};

	const createChatMessage = async (chatMessageData: IChatMessage) => {
		const [err, createdChatMessage] = await flatry(chatMessagesRepository.createMessage(chatMessageData));

		if (err) {
			return Promise.reject(err);
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
		resetChatMessages,
	};
};
