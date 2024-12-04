<template>
	<div
		class="new-chat-button"
		:class="{ 'new-chat-button_disabled': disabled }"
	>
		<button :disabled="disabled">
			<ElIcon>
				<CirclePlus />
			</ElIcon>

			<span>
				<slot>New chat</slot>
			</span>
		</button>
	</div>
</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus';
import { CirclePlus } from '@element-plus/icons-vue';

type Props = { disabled?: boolean };
const { disabled = false } = defineProps<Props>();
</script>

<style scoped>
.new-chat-button button {
	font-weight: 500;
	background: none;
	border: none;
	display: flex;
	align-items: center;
	padding: 0;
}

.new-chat-button button:hover {
	cursor: pointer;
}

.new-chat-button_disabled:hover,
.new-chat-button_disabled button[disabled] {
	cursor: not-allowed;
	color: var(--el-text-color-disabled);
	background: none;
}
</style>
