<template>
	<ChatMessagesList
		ref="messagesListRef"
		:messages-list="messagesList"
		:is-system-generating="isSystemGenerating"
	/>

	<ChatForm @submit:message="onSubmitMessage" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import flatry from 'flatry';

import ChatMessagesList from '@/modules/chats/components/chat-messages-list/ChatMessagesList.vue';
import ChatForm from '@/modules/chats/components/chat-form/ChatForm.vue';
import type { IUploadFile } from '@/types';
import type { IChat, IChatMessage } from '@/modules/chats/types';
import { errorNotify } from '@/services/notify';
import { createMockSystemFirstChatMessage, createNewChatMessage } from '@/modules/chats/mocks';
import { chatMessagesRepository, chatsRepository } from '@/modules/chats/repositories';
import { useChatsStore } from '@/modules/chats/stores/chatsStore';

const router = useRouter();
const chatsStore = useChatsStore();
chatsStore.resetCurrentChat();

const messagesList = ref<IChatMessage[]>([createMockSystemFirstChatMessage()]);
const isSystemGenerating = ref(false);

const onSubmitMessage = async ({ text = '', files = [] }: { text: string; files: IUploadFile[] }) => {
	const newChatData = { first_prompt: text };

	isSystemGenerating.value = true;
	const [chatErr, chat] = await flatry(chatsRepository.createChat(newChatData));
	isSystemGenerating.value = false;

	if (chatErr) {
		errorNotify((chatErr as Error).message ?? chatErr);
		return;
	}

	const newChatMessageData = new FormData();
	newChatMessageData.append('chat_id', chat.id);
	newChatMessageData.append('text', text);
	const [messageErr] = await flatry(chatMessagesRepository.createMessage(newChatMessageData));

	if (messageErr) {
		errorNotify((messageErr as Error).message ?? messageErr);
		return;
	}

	chatsStore.addChat(chat);

	return router.push({ name: 'chat', params: { id: chat.id } });
};
</script>
