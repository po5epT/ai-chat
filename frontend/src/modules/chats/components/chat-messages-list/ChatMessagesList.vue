<template>
	<section class="chat">
		<slot name="chat-top" />

		<div
			ref="messagesRef"
			class="messages"
		>
			<template
				v-for="(messages, date) in groupedMessagesList"
				:key="date"
			>
				<div class="messages__date">{{ date }}</div>

				<template
					v-for="message in messages"
					:key="message.id"
				>
					<ChatSystemMessage
						v-if="message.user_id === SYSTEM_USER_ID"
						:message="message"
					/>

					<ChatUserMessage
						v-else
						:message="message"
					/>
				</template>
			</template>

			<slot name="generating" />
		</div>

		<div ref="chatBottomRef"></div>
	</section>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';

import ChatUserMessage from '@/modules/chats/components/chat-message/ChatUserMessage.vue';
import ChatSystemMessage from '@/modules/chats/components/chat-message/ChatSystemMessage.vue';
import type { IChatMessage } from '@/modules/chats/types';
import { useScroll } from '@/composables/useScroll';
import { getMessageDate } from '@/modules/chats/utils/date';
import { SYSTEM_USER_ID } from '@/config';

type Props = { messagesList: IChatMessage[] };

const { messagesList } = defineProps<Props>();

const { scroll, jump } = useScroll('chatBottomRef');

const groupedMessagesList = computed<Record<string, IChatMessage[]>>(() => {
	return messagesList.reduce(
		(acc, chatMessage) => {
			const humanDate = getMessageDate(chatMessage.timestamp);
			acc[humanDate] ??= [];
			acc[humanDate].push(chatMessage);

			return acc;
		},
		{} as Record<string, IChatMessage[]>,
	);
});

const messagesRef = useTemplateRef<HTMLDivElement>('messagesRef');
const getHeight = () => messagesRef.value?.clientHeight;

defineExpose({ scroll, jump, getHeight });
</script>

<style scoped>
.chat {
	overflow-y: scroll;
}

.messages {
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	padding: 0 var(--a-base-h-padding);
}

.messages__date {
	text-align: center;
	color: var(--el-text-color-secondary);
	margin-bottom: 16px;
}
</style>
