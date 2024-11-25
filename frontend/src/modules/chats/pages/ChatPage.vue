<template>
	<ChatMessagesList
		ref="messagesListRef"
		:messages-list="messagesList"
		:is-system-generating="isSystemGenerating"
	/>

	<ChatForm @submit:message="onSubmitMessage" />
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

import type { IChat, IChatMessage, IChatMessageFile } from '@/modules/chats/types';
import ChatMessagesList from '@/modules/chats/components/chat-messages-list/ChatMessagesList.vue';
import ChatForm from '@/modules/chats/components/chat-form/ChatForm.vue';
import { createMockSystemChatMessage, createNewChatMessage } from '@/modules/chats/mocks';
import { chatMessagesRepository } from '@/modules/chats/repositories';
import { useChatsStore } from '@/modules/chats/stores/chatsStore';

const route = useRoute();
const chatsStore = useChatsStore();
const chatId = computed<IChat['id']>(() => route.params.id as IChat['id']);

const messagesListRef = useTemplateRef<InstanceType<typeof ChatMessagesList>>('messagesListRef');
const messagesList = ref<IChatMessage[]>([]);
const isMessagesLoading = ref(false);
const isSystemGenerating = ref(false);

watchEffect(async () => {
	try {
		isMessagesLoading.value = true;
		messagesList.value = [];
		messagesList.value = await chatMessagesRepository.getMessages(chatId.value);
		chatsStore.setCurrentChatById(chatId.value);
		await nextTick();
		messagesListRef.value?.jump();
	} catch (err) {
		console.log(err);
	} finally {
		isMessagesLoading.value = false;
	}
});

const onSubmitMessage = ({ text, files }: { text: string; files: IChatMessageFile[] }) => {
	const newChatMessage = createNewChatMessage(chatId.value, { text, files });
	messagesList.value.push(newChatMessage);

	nextTick().then(() => messagesListRef.value?.scroll());

	isSystemGenerating.value = true;

	// const formData = new FormData();
	// formData.append('text', text);
	// files.forEach((file, index) => {
	// 	formData.append('file' + ++index, file.rawFile as File);
	// });

	chatMessagesRepository
		.createMessage(newChatMessage)
		.then((createdChatMessage) => {
			messagesList.value.splice(messagesList.value.length - 1, 1, createdChatMessage);
			nextTick().then(() => messagesListRef.value?.scroll());
		})
		.then(() => {
			messagesList.value.push(createMockSystemChatMessage());
			nextTick().then(() => messagesListRef.value?.scroll());
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			isSystemGenerating.value = false;
		});
};
</script>
