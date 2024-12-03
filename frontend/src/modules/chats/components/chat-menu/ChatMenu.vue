<template>
	<div class="chat-menu">
		<slot name="subtitle" />

		<ElMenu
			router
			:default-active="route.path"
		>
			<ElMenuItem
				v-for="(chat, index) in chatsList"
				:key="chat.id"
				:index="`/chats/${chat.id}`"
				@mouseenter="onMenuItemMouseEnter"
				@mouseleave="onMenuItemMouseLeave(index, $event)"
				@contextmenu.prevent="openDropdown(index)"
			>
				<template #title>
					<ElText
						truncated
						style="--el-text-color: currentColor"
					>
						{{ chat.name }}
					</ElText>

					<ElDropdown
						ref="dropdownRefs"
						placement="bottom"
						:popper-options="popperOption"
						trigger="click"
						class="menu-icon"
						:teleported="false"
					>
						<ElIcon @click.stop>
							<DotsVertical />
						</ElIcon>

						<template #dropdown>
							<ElDropdownMenu style="min-width: 100px">
								<ElDropdownItem @click.stop="handleRenameChat(chat)">
									<ElText>Rename</ElText>
								</ElDropdownItem>

								<ElDropdownItem @click.stop="handleDeleteChat(chat)">
									<ElText type="danger">Delete</ElText>
								</ElDropdownItem>
							</ElDropdownMenu>
						</template>
					</ElDropdown>
				</template>
			</ElMenuItem>
		</ElMenu>
	</div>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import { useRoute } from 'vue-router';
import { ElMenu, ElMenuItem, ElIcon, ElText, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';

import type { IChat } from '@/modules/chats/types';
import DotsVertical from '@/components/icons/DotsVertical.vue';

// type TChatsMenuItem = Pick<IChat, 'id' | 'name'> & Partial<Omit<IChat, 'id' | 'name'>>;

defineProps<{
	chatsList: IChat[];
}>();

const emit = defineEmits<{
	(e: 'rename:chat', chat: IChat): void;
	(e: 'delete:chat', chat: IChat): void;
}>();

const route = useRoute();

const dropdownRefs = useTemplateRef('dropdownRefs');
const popperOption = computed(() => {
	return {
		modifiers: [
			{
				name: 'computeStyles',
				options: { adaptive: false },
			},
		],
	};
});
const handleRenameChat = (chat: IChat) => {
	emit('rename:chat', chat);
};
const handleDeleteChat = (chat: IChat) => {
	emit('delete:chat', chat);
};
const openDropdown = (index: number) => {
	if (!dropdownRefs.value?.[index]) {
		return;
	}

	dropdownRefs.value[index].handleOpen();
};
const onMenuItemMouseEnter = (event: MouseEvent) => {
	const target = event.target as HTMLElement;
	target.style.zIndex = '20';
};
const onMenuItemMouseLeave = (index: number, event: MouseEvent) => {
	if (!dropdownRefs.value?.[index]) {
		return;
	}

	const target = event.target as HTMLElement;
	target.style.zIndex = '';

	dropdownRefs.value![index].handleClose();
};
</script>
