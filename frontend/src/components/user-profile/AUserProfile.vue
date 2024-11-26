<template>
	<ElDropdown
		placement="bottom"
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

import { IUser } from '@/types';

type Props = {
	user: IUser;
};

const { user } = defineProps<Props>();

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
