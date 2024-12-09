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

	<ChatForm
		is-files-allowed
		@submit:message="onSubmitMessage"
	/>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import flatry from 'flatry';

import type { IChat, IChatMessage, IChatMessageFile } from '@/modules/chats/types';
import ChatMessagesList from '@/modules/chats/components/chat-messages-list/ChatMessagesList.vue';
import ChatSystemMessage from '@/modules/chats/components/chat-message/ChatSystemMessage.vue';
import ChatForm from '@/modules/chats/components/chat-form/ChatForm.vue';
import { chatMessagesRepository } from '@/modules/chats/repositories';
import { useChatsStore } from '@/modules/chats/stores/chatsStore';
import { errorNotify } from '@/services/notify';
import type { ILastEvaluatedKey } from '@/services/api';

const route = useRoute();
const chatsStore = useChatsStore();
const chatId = computed<IChat['id']>(() => route.params.id as IChat['id']);

const messagesListRef = useTemplateRef<InstanceType<typeof ChatMessagesList>>('messagesListRef');
const messagesList = ref<IChatMessage[]>([]);
const isMessagesLoading = ref(false);
const isSystemGenerating = ref(false);
const emptyChatSystemMessage = {} as IChatMessage;
const lastEvaluatedKey = ref<ILastEvaluatedKey | null>(null);

watchEffect(async () => {
	messagesList.value = [];
	isMessagesLoading.value = true;
	const [err, { data, last_evaluated_key }] = await flatry(chatMessagesRepository.getMessages(chatId.value));
	isMessagesLoading.value = false;

	if (err) {
		errorNotify((err as Error).message ?? err);
		return;
	}

	messagesList.value = data;
	lastEvaluatedKey.value = last_evaluated_key;
	chatsStore.setCurrentChatById(chatId.value);
	await nextTick();
	messagesListRef.value?.jump();
});

const onSubmitMessage = ({ text, files }: { text: string; files: IChatMessageFile[] }) => {
	const newChatMessageData = {
		id: 'new',
		chat_id: chatId.value,
		user_id: 'asdasd', // TODO refactor
		timestamp: +new Date(),
		text,
		files,
	};

	isSystemGenerating.value = true;

	messagesList.value.push(newChatMessageData);
	nextTick().then(() => messagesListRef.value?.scroll());

	chatMessagesRepository
		.createMessage(newChatMessageData)
		.then((createdChatMessage) => {
			const { requested_message_id, ...restData } = createdChatMessage;

			messagesList.value = messagesList.value.map((message) => {
				if (message.id === 'new') {
					return {
						...message,
						id: requested_message_id,
					};
				}

				return message;
			});

			messagesList.value.push(restData);

			nextTick().then(() => messagesListRef.value?.scroll());
		})
		.catch((err) => errorNotify(err.message ?? err))
		.finally(() => {
			isSystemGenerating.value = false;
		});
};
</script>
