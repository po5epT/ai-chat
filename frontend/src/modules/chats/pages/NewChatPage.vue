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
import type { IChatMessage } from '@/modules/chats/types';
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
	const newChat = { first_prompt: text };
	const newChatMessage = createNewChatMessage('newChatId', { text, files });
	messagesList.value.push(newChatMessage);

	isSystemGenerating.value = true;
	const [chatErr, chat] = await flatry(chatsRepository.createChat(newChat));
	isSystemGenerating.value = false;

	if (chatErr) {
		errorNotify(chatErr.message ?? chatErr);
		return;
	}

	// TODO Remove when API is presented
	chat.id = +new Date() + '';

	const [messageErr] = await flatry(
		chatMessagesRepository.createMessage({
			...newChatMessage,
			chat_id: chat.id,
		}),
	);

	if (messageErr) {
		errorNotify(messageErr.message ?? messageErr);
		return;
	}

	chatsStore.addChat(chat);

	return router.push({ name: 'chat', params: { id: chat.id } });
};
</script>
