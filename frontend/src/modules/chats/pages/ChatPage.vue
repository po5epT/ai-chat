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

	<ChatForm
		is-files-allowed
		@submit:message="onSubmitMessage"
	/>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useInfiniteScroll } from '@vueuse/core';

import type { IChat, IChatMessage, IChatMessageFile } from '@/modules/chats/types';
import ChatMessagesList from '@/modules/chats/components/chat-messages-list/ChatMessagesList.vue';
import ChatSystemMessage from '@/modules/chats/components/chat-message/ChatSystemMessage.vue';
import ChatForm from '@/modules/chats/components/chat-form/ChatForm.vue';
import { useChatsStore } from '@/modules/chats/stores/chatsStore';
import { useAuthStore } from '@/stores/auth';
import { errorNotify } from '@/services/notify';
import { createChatMessageModel } from '@/modules/chats/models';
import { useChatMessages } from '@/modules/chats/composables/useChatMessages';
import flatry from 'flatry';

const route = useRoute();
const authStore = useAuthStore();
const chatsStore = useChatsStore();
const chatId = computed<IChat['id']>(() => route.params.id as IChat['id']);

const { chatMessages, startKey, loadChatMessages, loadChatMessagesMore, createChatMessage, resetChatMessages } =
	useChatMessages();

const messagesListRef = useTemplateRef<InstanceType<typeof ChatMessagesList>>('messagesListRef');
const messagesListElement = computed<HTMLElement>(() => messagesListRef.value?.$el);

const isSystemGenerating = ref(false);
const emptyChatSystemMessage = {} as IChatMessage;

watch(
	chatId,
	async (newChatId) => {
		resetChatMessages();
		const [err] = await flatry(loadChatMessages(newChatId, 4));

		if (err) {
			return errorNotify((err as Error).message ?? err);
		}

		chatsStore.setCurrentChatById(newChatId);

		await nextTick();
		messagesListRef.value?.jump();
	},
	{ immediate: true },
);

const onSubmitMessage = async ({ text, files }: { text: string; files: IChatMessageFile[] }) => {
	const newChatMessageData = createChatMessageModel({
		chat_id: chatId.value,
		user_id: authStore.userId!,
		text,
		files,
	});

	chatMessages.value.push(newChatMessageData);
	nextTick().then(() => messagesListRef.value?.scroll());

	isSystemGenerating.value = true;
	const [err] = await flatry(createChatMessage(newChatMessageData));
	isSystemGenerating.value = false;

	if (err) {
		return errorNotify((err as Error).message ?? err);
	}

	await nextTick();

	messagesListRef.value?.scroll();
};

const onChatScrollTop = async () => {
	const heightBefore = messagesListRef.value?.getHeight() ?? 0;
	const [err] = await flatry(loadChatMessagesMore(chatId.value, 4));
	const heightAfter = messagesListRef.value?.getHeight() ?? 0;

	if (err) {
		return errorNotify((err as Error).message ?? err);
	}

	messagesListElement.value.scrollTo(0, heightAfter - heightBefore);
};

useInfiniteScroll(messagesListElement, onChatScrollTop, {
	distance: 10,
	direction: 'top',
	interval: 300,
	canLoadMore: () => !!startKey.value,
});
</script>
