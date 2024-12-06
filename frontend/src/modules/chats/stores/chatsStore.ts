import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import type { ILastEvaluatedKey } from '@/services/api';
import type { IChat } from '@/modules/chats/types';
import { chatsRepository } from '@/modules/chats/repositories';

export const useChatsStore = defineStore('chats', () => {
	const isChatsLoaded = ref(false);
	const lastEvaluatedKey = ref<ILastEvaluatedKey | null>(null);
	const chatList = ref<IChat[]>([]);
	const hasChats = computed(() => chatList.value.length > 0);
	const mapChatIdToChat = computed(() => {
		return Object.fromEntries(chatList.value.map((chat) => [chat.id, chat]));
	});

	const isChatsLoading = ref(false);
	const loadChats = async () => {
		if (isChatsLoaded.value) {
			return;
		}

		isChatsLoading.value = true;
		const { data, last_evaluated_key } = await chatsRepository.getChats();
		chatList.value = data;
		lastEvaluatedKey.value = last_evaluated_key;
		isChatsLoading.value = false;
		isChatsLoaded.value = true;
	};

	const addChat = (chat: IChat) => {
		chatList.value.push(chat);
	};

	const updateChat = (chatToUpdate: IChat) => {
		chatList.value = chatList.value.map((chat) => {
			if (chat.id === chatToUpdate.id) {
				return chatToUpdate;
			}

			return chat;
		});

		if (chatToUpdate.name === currentChatName.value) {
			setCurrentChatById(chatToUpdate.id);
		}
	};

	const deleteChat = (chatId: IChat['id']) => {
		chatList.value = chatList.value.filter((chat) => {
			return chat.id !== chatId;
		});
	};

	const currentChat = ref<Partial<IChat> | IChat | null>(null);
	const currentChatId = computed(() => currentChat.value?.id ?? null);
	const currentChatName = computed(() => currentChat.value?.name ?? 'New chat');
	const setCurrentChatById = (chatId: IChat['id']) => {
		const chat: IChat = mapChatIdToChat.value[chatId];

		currentChat.value = { ...chat };
	};
	const resetCurrentChat = () => {
		currentChat.value = null;
	};

	return {
		chatList,
		mapChatIdToChat,
		hasChats,
		isChatsLoaded,
		isChatsLoading,
		loadChats,
		addChat,
		updateChat,
		deleteChat,
		currentChat,
		currentChatId,
		currentChatName,
		setCurrentChatById,
		resetCurrentChat,
	};
});
