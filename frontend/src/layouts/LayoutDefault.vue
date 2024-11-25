<template>
	<div class="wrapper">
		<aside
			class="sidebar sidebar_main"
			:class="{ sidebar_collapsed: isCollapsed }"
		>
			<div class="sidebar__item">
				<ElIcon class="logo">
					<AppLogo />
				</ElIcon>

				<span class="sidebar__label sidebar-title">AI Infuse</span>

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
						<MagicPencil />
					</ElIcon>

					<template #title>
						<span class="sidebar__label">Chats</span>
					</template>
				</ElMenuItem>

				<!--				<ElMenuItem index="/guides">-->
				<!--					<ElIcon>-->
				<!--						<AlphabetBook />-->
				<!--					</ElIcon>-->

				<!--					<template #title>-->
				<!--						<span class="sidebar__label">Guides</span>-->
				<!--					</template>-->
				<!--				</ElMenuItem>-->

				<!--				<ElMenuItem index="/monitoring">-->
				<!--					<ElIcon>-->
				<!--						<GraphChart />-->
				<!--					</ElIcon>-->

				<!--					<template #title>-->
				<!--						<span class="sidebar__label">Monitoring</span>-->
				<!--					</template>-->
				<!--				</ElMenuItem>-->

				<!--				<ElMenuItem index="/assistants">-->
				<!--					<ElIcon>-->
				<!--						<SmileTV />-->
				<!--					</ElIcon>-->

				<!--					<template #title>-->
				<!--						<span class="sidebar__label">Assistants</span>-->
				<!--					</template>-->
				<!--				</ElMenuItem>-->

				<ElMenuItem index="/settings">
					<ElIcon>
						<Setting />
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

		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ElIcon, ElMenu, ElMenuItem } from 'element-plus';
import { DArrowLeft, DArrowRight, Setting } from '@element-plus/icons-vue';

import AppLogo from '@/components/icons/AppLogo.vue';
import MagicPencil from '@/components/icons/MagicPencil.vue';
// import AlphabetBook from '@/components/icons/AlphabetBook.vue';
// import GraphChart from '@/components/icons/GraphChart.vue';
// import SmileTV from '@/components/icons/SmileTV.vue';

const route = useRoute();
const routeParentPath = computed(() => {
	const [_, path] = route.path.split('/');

	return '/' + path;
});

const isCollapsed = ref(false);
const toggleCollapse = () => {
	isCollapsed.value = !isCollapsed.value;
};
</script>
