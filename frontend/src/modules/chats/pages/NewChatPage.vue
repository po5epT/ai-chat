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

import ChatMessagesList from '@/modules/chats/components/chat-messages-list/ChatMessagesList.vue';
import ChatForm from '@/modules/chats/components/chat-form/ChatForm.vue';
import type { IChatMessage } from '@/modules/chats/types';
import { createMockSystemFirstChatMessage, createNewChatMessage } from '@/modules/chats/mocks';
import { chatMessagesRepository, chatsRepository } from '@/modules/chats/repositories';
import { useChatsStore } from '@/modules/chats/stores/chatsStore';
import type { IUploadFile } from '@/types';

const router = useRouter();

const messagesList = ref<IChatMessage[]>([createMockSystemFirstChatMessage()]);

const isSystemGenerating = ref(false);

const chatsStore = useChatsStore();
chatsStore.resetCurrentChat();

const onSubmitMessage = async ({ text = '', files = [] }: { text: string; files: IUploadFile[] }) => {
	const newChat = { first_prompt: text };
	const newChatMessage = createNewChatMessage('newChatId', { text, files });
	messagesList.value.push(newChatMessage);

	try {
		isSystemGenerating.value = true;
		const chat = await chatsRepository.createChat(newChat);
		// TODO Remove when API is presented
		chat.id = +new Date() + '';

		await chatMessagesRepository.createMessage({
			...newChatMessage,
			chat_id: chat.id,
		});

		chatsStore.addChat(chat);

		return router.push({ name: 'chat', params: { id: chat.id } });
	} catch (err) {
		console.log(err);
	} finally {
		isSystemGenerating.value = false;
	}
};
</script>
