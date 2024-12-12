<template>
	<ChatMessagesList
		ref="messagesListRef"
		:messages-list="chatMessages"
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

import type { IChatMessage } from '@/modules/chats/types';
import ChatMessagesList from '@/modules/chats/components/chat-messages-list/ChatMessagesList.vue';
import ChatSystemMessage from '@/modules/chats/components/chat-message/ChatSystemMessage.vue';
import ChatForm from '@/modules/chats/components/chat-form/ChatForm.vue';
import { errorNotify } from '@/services/notify';
import { useAuthStore } from '@/stores/auth';
import { createChatMessageModel, createFirstSystemChatMessageModel, createNewChatModel } from '@/modules/chats/models';
import { chatsRepository } from '@/modules/chats/repositories';
import { useChatsStore } from '@/modules/chats/stores/chatsStore';
import { useChatMessages } from '@/modules/chats/composables/useChatMessages';

const router = useRouter();
const authStore = useAuthStore();
const chatsStore = useChatsStore();
chatsStore.resetCurrentChat();

const { chatMessages, createChatMessage } = useChatMessages();

chatMessages.value.push(createFirstSystemChatMessageModel());

const isSystemGenerating = ref(false);
const emptyChatSystemMessage = {} as IChatMessage;

const onSubmitMessage = async ({ text = '' }: { text: string }) => {
	const newChatData = createNewChatModel({ first_prompt: text });
	const newChatMessageData = createChatMessageModel({
		user_id: authStore.userId!,
		text,
	});

	chatMessages.value.push(newChatMessageData);

	const [chatErr, chat] = await flatry(chatsRepository.createChat(newChatData));

	if (chatErr) {
		errorNotify((chatErr as Error).message ?? chatErr);
		return;
	}

	newChatMessageData.chat_id = chat.id;

	isSystemGenerating.value = true;
	const [messageErr] = await flatry(createChatMessage(newChatMessageData));
	isSystemGenerating.value = false;

	if (messageErr) {
		errorNotify((messageErr as Error).message ?? messageErr);
		return;
	}

	chatsStore.addChat(chat);

	return router.push({ name: 'chat', params: { id: chat.id } });
};
</script>
