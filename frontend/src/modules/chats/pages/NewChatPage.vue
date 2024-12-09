<template>
	<ChatMessagesList
		ref="messagesListRef"
		:messages-list="messagesList"
	>
		<template #generating>
			<ChatSystemMessage
				v-if="isSystemGenerating"
				:message="emptyChatSystemMessage"
			/>
		</template>
	</ChatMessagesList>

	<ChatForm @submit:message="onSubmitMessage" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import flatry from 'flatry';

import ChatMessagesList from '@/modules/chats/components/chat-messages-list/ChatMessagesList.vue';
import ChatForm from '@/modules/chats/components/chat-form/ChatForm.vue';
import type { IChatMessage } from '@/modules/chats/types';
import { errorNotify } from '@/services/notify';
import { createMockSystemFirstChatMessage } from '@/modules/chats/mocks';
import { chatMessagesRepository, chatsRepository } from '@/modules/chats/repositories';
import { useChatsStore } from '@/modules/chats/stores/chatsStore';
import ChatSystemMessage from '@/modules/chats/components/chat-message/ChatSystemMessage.vue';

const router = useRouter();
const chatsStore = useChatsStore();
chatsStore.resetCurrentChat();

const messagesList = ref<IChatMessage[]>([createMockSystemFirstChatMessage()]);
const isSystemGenerating = ref(false);
const emptyChatSystemMessage = {} as IChatMessage;

const onSubmitMessage = async ({ text = '' }: { text: string }) => {
	const newChatData = { first_prompt: text };

	isSystemGenerating.value = true;
	const [chatErr, chat] = await flatry(chatsRepository.createChat(newChatData));
	isSystemGenerating.value = false;

	if (chatErr) {
		errorNotify((chatErr as Error).message ?? chatErr);
		return;
	}

	const newChatMessageData = {
		chat_id: chat.id,
		text,
		timestamp: +new Date(),
	};

	const [messageErr] = await flatry(chatMessagesRepository.createMessage(newChatMessageData));

	if (messageErr) {
		errorNotify((messageErr as Error).message ?? messageErr);
		return;
	}

	chatsStore.addChat(chat);

	return router.push({ name: 'chat', params: { id: chat.id } });
};
</script>
