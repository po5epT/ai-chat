<template>
	<button class="new-chat-button">
		<ElIcon>
			<CirclePlus />
		</ElIcon>

		<span>
			<slot>New chat</slot>
		</span>
	</button>
</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus';
import { CirclePlus } from '@element-plus/icons-vue';
</script>

<style scoped>
.new-chat-button {
	font-weight: 500;
	background: none;
	border: none;
	display: flex;
	align-items: center;
	padding: 0;
}

.new-chat-button:hover {
	cursor: pointer;
}

.new-chat-button[disabled] {
	cursor: not-allowed;
}
</style>
