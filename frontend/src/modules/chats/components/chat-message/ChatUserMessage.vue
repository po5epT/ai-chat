<template>
	<ChatMessage
		overlay
		username="You"
		:text="message.text"
		:timestamp="message.timestamp"
		:files="message.files"
	>
		<template #avatar>
			<ElAvatar
				fit="cover"
				shape="square"
				class="user-avatar"
			>
				<img
					v-if="user?.avatar_src"
					:src="user?.avatar_src"
					:alt="user?.name"
				/>
			</ElAvatar>
		</template>
	</ChatMessage>
</template>

<script setup lang="ts">
import { ElAvatar } from 'element-plus';

import type { IChatMessage } from '@/modules/chats/types';
import { useUserStore } from '@/stores/auth';

import ChatMessage from './ChatMessage.vue';

const { message } = defineProps<{ message: IChatMessage }>();

const { user } = useUserStore();
</script>
