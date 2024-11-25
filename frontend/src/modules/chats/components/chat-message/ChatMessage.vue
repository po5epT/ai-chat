<template>
	<div class="message-container">
		<div
			class="message"
			:class="{ message_overlay: overlay }"
		>
			<div class="message__avatar">
				<slot name="avatar">
					<ElAvatar
						fit="cover"
						shape="square"
						class="user-avatar"
					/>
				</slot>
			</div>

			<div class="message__header">
				<h2 class="message__username">
					<slot name="username">{{ username }}</slot>
				</h2>

				<span
					v-if="hasDate"
					class="message__date"
				>
					<slot name="date">{{ date }}</slot>
				</span>
			</div>

			<div class="message__content">
				<slot>
					<p class="message__text">{{ text }}</p>
				</slot>

				<slot name="files">
					<AFilePreviewList :items="files" />
				</slot>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { ElAvatar } from 'element-plus';

import type { IChatMessageFile } from '@/modules/chats/types';
import AFilePreviewList from '@/components/file-previews/AFilePreviewList.vue';
import { getHumanDate } from '@/modules/chats/utils';

const props = defineProps<{
	username: string;
	avatar?: string;
	text?: string;
	files?: IChatMessageFile[];
	timestamp?: number;
	overlay?: boolean;
}>();

const slots = useSlots();

const date = computed(() => getHumanDate(props.timestamp ?? ''));
const hasDate = computed(() => {
	return !!slots.date || !!props.timestamp;
});
</script>

<style scoped>
.message-container {
}

.message-container + .message-container {
	margin-top: 16px;
}

.message {
	display: inline-grid;
	grid-template-columns: auto 1fr;
	grid-template-rows: auto 1fr;
	column-gap: 12px;
	row-gap: 4px;
	padding: 10px;
	min-width: 320px;
}

.message_overlay {
	background: var(--ai-bg-color-secondary-light);
	border-radius: 6px;
}

.message__avatar {
	grid-row: 1 / -1;
}

.message__header {
	display: inline-flex;
	align-items: center;
	gap: 4px;
}

.message__date {
	color: var(--ai-color-secondary);
}

.message__text {
	word-break: break-word;
}
</style>
