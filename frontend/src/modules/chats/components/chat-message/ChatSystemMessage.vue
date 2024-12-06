<template>
	<ChatMessage
		:username="APP_NAME"
		:text="message.text"
	>
		<template #avatar>
			<ElAvatar
				fit="contain"
				shape="square"
				class="system-avatar"
			>
				<AppLogo />
			</ElAvatar>
		</template>

		<p
			v-if="!message.text"
			class="is-generating"
		>
			is generating...
		</p>
	</ChatMessage>
</template>

<script setup lang="ts">
import { ElAvatar } from 'element-plus';

import { APP_NAME } from '@/config';
import AppLogo from '@/components/icons/AppLogo.vue';
import type { IChatMessage } from '@/modules/chats/types';

import ChatMessage from './ChatMessage.vue';

defineProps<{ message: IChatMessage }>();
</script>

<style scoped>
.system-avatar {
	--el-avatar-bg-color: transparent;

	border: 1px solid var(--el-border-color-dark);
}

.is-generating {
	color: var(--el-text-color-secondary);
}
</style>
