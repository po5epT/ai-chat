<template>
	<section class="messages">
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
					v-if="message.user_id === 'system'"
					:message="message"
				/>

				<ChatUserMessage
					v-else
					:message="message"
				/>
			</template>
		</template>

		<ChatSystemMessage
			v-if="isSystemGenerating"
			:message="emptyChatSystemMessage"
		/>

		<div ref="chatBottomRef"></div>
	</section>
</template>

<script setup lang="ts">
import ChatUserMessage from '@/modules/chats/components/chat-message/ChatUserMessage.vue';
import ChatSystemMessage from '@/modules/chats/components/chat-message/ChatSystemMessage.vue';
import type { IChatMessage } from '@/modules/chats/types';
import { useScroll } from '@/composables/useScroll';
import { getMessageDate } from '@/modules/chats/utils/date';
import { computed } from 'vue';

type Props = {
	messagesList: IChatMessage[];
	isSystemGenerating?: boolean;
};

const { messagesList, isSystemGenerating = false } = defineProps<Props>();

const { scroll, jump } = useScroll('chatBottomRef');
const emptyChatSystemMessage = {} as IChatMessage;

const groupedMessagesList = computed<Record<string, IChatMessage[]>>(() => {
	return messagesList.reduce((acc, chatMessage) => {
		const humanDate = getMessageDate(chatMessage.timestamp);
		acc[humanDate] ??= [];
		acc[humanDate].push(chatMessage);

		return acc;
	}, {});
});

defineExpose({ scroll, jump });
</script>

<style scoped>
.messages {
	overflow-y: auto;
	padding: 0 var(--ai-base-h-padding);
}

.messages__date {
	text-align: center;
	color: var(--ai-color-secondary);
	margin-bottom: 16px;
}
</style>
