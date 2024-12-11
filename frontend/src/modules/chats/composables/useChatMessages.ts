import { nextTick, ref } from 'vue';
import flatry from 'flatry';

import type { IChat, IChatMessage } from '@/modules/chats/types';
import { chatMessagesRepository } from '@/modules/chats/repositories';
import type { ILastEvaluatedKey } from '@/services/api';
import { errorNotify } from '@/services/notify';

export const useChatMessages = () => {
	const chatMessages = ref<IChatMessage[]>([]);
	const isMessagesLoading = ref(false);

	let startKey: ILastEvaluatedKey | undefined;

	const loadChatMessages = async (chatId: IChat['id'], limit?: string) => {
		const payload = { limit, startKey: JSON.stringify(startKey) };

		isMessagesLoading.value = true;
		const [err, res] = await flatry(chatMessagesRepository.getMessages(chatId, payload));
		isMessagesLoading.value = false;

		if (err) {
			return Promise.reject(err);
		}

		chatMessages.value = res.data;
		startKey = res.last_evaluated_key;
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
		loadChatMessages,
		createChatMessage,
	};
};
