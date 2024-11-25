<template>
	<div class="chat-menu">
		<slot name="subtitle" />

		<ElMenu
			router
			:default-active="route.path"
		>
			<ElMenuItem
				v-for="chat in chatsList"
				:key="chat.id"
				:index="`/chats/${chat.id}`"
			>
				<template #title>
					<ElText
						truncated
						style="--el-text-color: currentColor"
					>
						{{ chat.name }}
					</ElText>
				</template>
			</ElMenuItem>
		</ElMenu>
	</div>
</template>

<script setup lang="ts">
import { ElMenu, ElMenuItem, ElText } from 'element-plus';
import { useRoute } from 'vue-router';

import type { IChat } from '@/modules/chats/types';

type TChatsMenuItem = Pick<IChat, 'id' | 'name'> & Partial<Omit<IChat, 'id' | 'name'>>;

defineProps<{
	chatsList: TChatsMenuItem[];
}>();

const emit = defineEmits<{
	(e: 'select:chat', path: string): void;
}>();

const route = useRoute();
</script>
