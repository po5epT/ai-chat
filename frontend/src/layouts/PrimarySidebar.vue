<template>
	<aside
		class="sidebar sidebar_main"
		:class="{ sidebar_collapsed: isCollapsed }"
	>
		<div class="sidebar__item">
			<ElIcon class="logo">
				<AppLogo />
			</ElIcon>

			<span class="sidebar__label sidebar-title">{{ APP_NAME }}</span>

			<ElIcon
				v-show="!isCollapsed"
				class="sidebar__toggle"
				@click="toggleCollapse"
			>
				<DArrowLeft />
			</ElIcon>
		</div>

		<ElMenu
			router
			:default-active="routeParentPath"
		>
			<ElMenuItem index="/chats">
				<ElIcon>
					<MagicPencilFilled v-if="currentMenuItemIs('/chats')" />
					<MagicPencil v-else />
				</ElIcon>

				<template #title>
					<span class="sidebar__label">Chats</span>
				</template>
			</ElMenuItem>

			<!--				<ElMenuItem index="/guides">-->
			<!--					<ElIcon>-->
			<!--						<AlphabetBookFilled v-if="currentMenuItemIs('/guides')" />-->
			<!--						<AlphabetBook v-else />-->
			<!--					</ElIcon>-->

			<!--					<template #title>-->
			<!--						<span class="sidebar__label">Guides</span>-->
			<!--					</template>-->
			<!--				</ElMenuItem>-->

			<!--				<ElMenuItem index="/monitoring">-->
			<!--					<ElIcon>-->
			<!--						<GraphChartFilled v-if="currentMenuItemIs('/monitoring')" />-->
			<!--						<GraphChart v-else />-->
			<!--					</ElIcon>-->

			<!--					<template #title>-->
			<!--						<span class="sidebar__label">Monitoring</span>-->
			<!--					</template>-->
			<!--				</ElMenuItem>-->

			<!--				<ElMenuItem index="/assistants">-->
			<!--					<ElIcon>-->
			<!--						<SmileTVFilled v-if="currentMenuItemIs('/assistants')" />-->
			<!--						<SmileTV v-else />-->
			<!--					</ElIcon>-->

			<!--					<template #title>-->
			<!--						<span class="sidebar__label">Assistants</span>-->
			<!--					</template>-->
			<!--				</ElMenuItem>-->

			<ElMenuItem index="/settings">
				<ElIcon>
					<SettingsFilled v-if="currentMenuItemIs('/settings')" />
					<Settings v-else />
				</ElIcon>

				<template #title>
					<span class="sidebar__label">Settings</span>
				</template>
			</ElMenuItem>
		</ElMenu>

		<div class="sidebar__item sidebar__item_toggle">
			<ElIcon
				v-show="isCollapsed"
				class="sidebar__toggle"
				@click="toggleCollapse"
			>
				<DArrowRight />
			</ElIcon>
		</div>
	</aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ElIcon, ElMenu, ElMenuItem } from 'element-plus';
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue';

import AppLogo from '@/components/icons/AppLogo.vue';
import MagicPencil from '@/components/icons/MagicPencil.vue';
import MagicPencilFilled from '@/components/icons/MagicPencilFilled.vue';
import Settings from '@/components/icons/Settings.vue';
import SettingsFilled from '@/components/icons/SettingsFilled.vue';
import { APP_NAME } from '@/config';
import { useStorage } from '@/composables/useStorage';
// import AlphabetBookFilled from '@/components/icons/AlphabetBookFilled.vue';
// import AlphabetBook from '@/components/icons/AlphabetBook.vue';
// import GraphChart from '@/components/icons/GraphChart.vue';
// import SmileTV from '@/components/icons/SmileTV.vue';
// import SmileTVFilled from '@/components/icons/SmileTVFilled.vue';
// import GraphChartFilled from '@/components/icons/GraphChartFilled.vue';

const route = useRoute();
const routeParentPath = computed(() => {
	const [_, path] = route.path.split('/');

	return '/' + path;
});
const currentMenuItemIs = (path: string) => {
	return path === routeParentPath.value;
};

const isCollapsed = useStorage<boolean>('isSidebarCollapsed');
const toggleCollapse = () => {
	isCollapsed.value = !isCollapsed.value;
};
</script>
