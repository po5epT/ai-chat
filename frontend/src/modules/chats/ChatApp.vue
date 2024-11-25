<template>
	<LayoutPage>
		<template #title>
			<h2 class="chat-title">
				<ElText
					class="chat-title-text"
					truncated
				>
					{{ chatsStore.currentChatName }}
				</ElText>
			</h2>

			<div class="nav__subtitle">Basic · ChatGPT 4</div>
		</template>

		<template #sidebar>
			<div class="sidebar__item">
				<NewChatButton
					:disabled="isCreateChatDisabled"
					@click="onChatCreate"
				/>
			</div>

			<template v-if="chatsStore.hasChats">
				<ChatMenu
					v-if="recentChatList.length"
					:chats-list="recentChatList"
				>
					<template #subtitle>
						<div class="sidebar__item sidebar__item_subtitle">
							<span class="sidebar__label">Recent</span>
						</div>
					</template>
				</ChatMenu>

				<ChatMenu
					v-if="otherChatList.length"
					:chats-list="otherChatList"
				>
					<template #subtitle>
						<div class="sidebar__item sidebar__item_subtitle">
							<span class="sidebar__label">Others</span>
						</div>
					</template>
				</ChatMenu>
			</template>

			<div
				v-if="!chatsStore.hasChats && !chatsStore.isChatsLoading"
				class="sidebar__empty"
			>
				<div class="sidebar__item sidebar__item_subtitle">
					<span class="sidebar__label">Here will be your chats</span>
				</div>
			</div>
		</template>

		<main class="content">
			<RouterView />
		</main>
	</LayoutPage>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElText } from 'element-plus';

import LayoutPage from '@/layouts/LayoutPage.vue';
import NewChatButton from '@/modules/chats/components/new-chat-button/NewChatButton.vue';
import ChatMenu from '@/modules/chats/components/chat-menu/ChatMenu.vue';
import { useChatsStore } from '@/modules/chats/stores/chatsStore';
import { MILLISECONDS_IN_A_WEEK } from '@/config';

const route = useRoute();
const router = useRouter();

const chatsStore = useChatsStore();

chatsStore.loadChats().catch(console.log);

const recentChatList = computed(() => {
	const today = +new Date();
	return chatsStore.chatList
		.filter((chat) => {
			return today - chat.used_timestamp <= MILLISECONDS_IN_A_WEEK;
		})
		.sort((chatA, chatB) => {
			return chatB.used_timestamp - chatA.used_timestamp;
		});
});

const otherChatList = computed(() => {
	const today = +new Date();
	return chatsStore.chatList
		.filter((chat) => {
			return today - chat.used_timestamp > MILLISECONDS_IN_A_WEEK;
		})
		.sort((chatA, chatB) => {
			return chatB.used_timestamp - chatA.used_timestamp;
		});
});

const isCreateChatDisabled = computed(() => {
	return route.name === 'newChat';
});

const onChatCreate = () => {
	if (isCreateChatDisabled.value) {
		return;
	}

	return router.push({ name: 'newChat' });
};
</script>

<style scoped>
.chat-title {
	max-width: 250px;
}

.chat-title-text {
	vertical-align: middle;
}
</style>
