<template>
	<div class="chat-messages">
		<div>
			<ChatMessagesList :messages-list="chatMessages">
				<template #generating>
					<ChatSystemMessage v-if="isMessageCreating" />
				</template>
			</ChatMessagesList>
		</div>
	</div>

	<ChatForm @submit:message="onSubmitMessage" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import flatry from 'flatry';

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

const { chatMessages, isMessageCreating, createChatMessage } = useChatMessages();

chatMessages.value.push(createFirstSystemChatMessageModel());

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

	const [messageErr] = await flatry(createChatMessage(newChatMessageData));

	if (messageErr) {
		errorNotify((messageErr as Error).message ?? messageErr);
		return;
	}

	chatsStore.addChat(chat);

	return router.push({ name: 'chat', params: { id: chat.id } });
};
</script>

<style scoped>
.chat-messages {
	overflow-y: auto;
}
</style>
