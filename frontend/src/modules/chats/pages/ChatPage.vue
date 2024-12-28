<template>
	<div
		ref="chatMessagesRef"
		class="chat-messages"
	>
		<div ref="chatMessagesInnerRef">
			<ChatMessagesList :messages-list="chatMessages">
				<template #generating>
					<ChatSystemMessage v-if="isMessageCreating" />
				</template>
			</ChatMessagesList>
		</div>
	</div>

	<ChatForm
		is-files-allowed
		@submit:message="onSubmitMessage"
	/>
</template>

<script setup lang="ts">
import { computed, nextTick, useTemplateRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useInfiniteScroll } from '@vueuse/core';
import flatry from 'flatry';

import type { IChat, IChatMessageFile } from '@/modules/chats/types';
import ChatMessagesList from '@/modules/chats/components/chat-messages-list/ChatMessagesList.vue';
import ChatSystemMessage from '@/modules/chats/components/chat-message/ChatSystemMessage.vue';
import ChatForm from '@/modules/chats/components/chat-form/ChatForm.vue';
import { useChatsStore } from '@/modules/chats/stores/chatsStore';
import { useAuthStore } from '@/stores/auth';
import { errorNotify } from '@/services/notify';
import { createChatMessageModel } from '@/modules/chats/models';
import { useChatMessages } from '@/modules/chats/composables/useChatMessages';
import { useScroll } from '@/composables/useScroll';

const route = useRoute();
const authStore = useAuthStore();
const chatsStore = useChatsStore();
const chatId = computed<IChat['id']>(() => route.params.id as IChat['id']);

const { scrollToBottom, jumpToBottom, jumpTo, targetRef: chatMessagesRef } = useScroll('chatMessagesRef');
const {
	chatMessages,
	startKey,
	isMessagesLoading,
	loadChatMessages,
	loadChatMessagesMore,
	createChatMessage,
	isMessageCreating,
	resetChatMessages,
} = useChatMessages();

watch(
	chatId,
	async (newChatId) => {
		resetChatMessages();
		const [err] = await flatry(loadChatMessages(newChatId, { limit: 6 }));

		// the route has changed while the messages were loading
		if (newChatId !== chatId.value) {
			return;
		}

		chatsStore.setCurrentChatById(newChatId);

		if (err) {
			return errorNotify((err as Error).message ?? err);
		}

		await nextTick();
		jumpToBottom();
	},
	{ immediate: true },
);

const onSubmitMessage = async ({ text, files }: { text: string; files: IChatMessageFile[] }) => {
	const newChatMessageData = createChatMessageModel({
		id: crypto.randomUUID(),
		chat_id: chatId.value,
		user_id: authStore.userId!,
		text,
		files,
	});

	chatMessages.value.push(newChatMessageData);
	scrollToBottom();

	const [err] = await flatry(createChatMessage(newChatMessageData));

	if (err) {
		return errorNotify((err as Error).message ?? err);
	}

	scrollToBottom();
};

const chatMessagesInnerRef = useTemplateRef<HTMLDivElement>('chatMessagesInnerRef');
const onChatScrollTop = async () => {
	const requestedChatId = chatId.value;
	const heightBefore = chatMessagesInnerRef.value?.clientHeight ?? 0;
	const [err] = await flatry(loadChatMessagesMore(requestedChatId, { limit: 4 }));

	if (requestedChatId !== chatId.value) {
		return;
	}

	await nextTick();
	const heightAfter = chatMessagesInnerRef.value?.clientHeight ?? 0;

	if (err) {
		return errorNotify((err as Error).message ?? err);
	}

	jumpTo({ top: heightAfter - heightBefore } as ScrollOptions);
};

useInfiniteScroll(chatMessagesRef, onChatScrollTop, {
	distance: 10,
	direction: 'top',
	interval: 700,
	canLoadMore: () => !!startKey.value && !isMessagesLoading.value,
});
</script>

<style scoped>
.chat-messages {
	overflow-y: auto;
}
</style>
