<template>
	<ElDropdown
		placement="bottom"
		trigger="click"
		:popper-options="popperOption"
	>
		<div class="auth-user">
			<ElAvatar
				:src="user.avatar_src"
				fir="cover"
				size="small"
				shape="square"
			/>

			{{ user.name }}
		</div>

		<template #dropdown>
			<ElDropdownMenu style="min-width: 120px">
				<ElDropdownItem>
					<ElText
						type="danger"
						@click.stop="onLogoutClick"
					>
						Logout
					</ElText>
				</ElDropdownItem>
			</ElDropdownMenu>
		</template>
	</ElDropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElAvatar, ElDropdown, ElDropdownMenu, ElDropdownItem, ElText } from 'element-plus';

import type { IUser } from '@/types';

const { user } = defineProps<{ user: IUser }>();

const emit = defineEmits<{
	(e: 'logout'): void;
}>();

const onLogoutClick = () => {
	emit('logout');
};
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
</script>

<style scoped>
.auth-user:hover {
	cursor: pointer;
}
</style>
