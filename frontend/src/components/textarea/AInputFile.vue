<template>
	<label class="ai-input-file">
		<input
			type="file"
			:multiple="multiple"
			style="display: none"
			@change="onChange"
		/>

		<slot name="icon">
			<ElIcon size="18">
				<Paperclip class="ai-input-file__icon" />
			</ElIcon>
		</slot>
	</label>
</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus';
import { Paperclip } from '@element-plus/icons-vue';

const { multiple = false } = defineProps<{
	multiple?: boolean;
}>();

const emit = defineEmits<{
	(e: 'change', event: Event): void;
}>();

const onChange = (event: Event) => {
	emit('change', event);

	(event.target as HTMLInputElement).value = '';
};
</script>

<style scoped>
.ai-input-file {
	display: inherit;
}

.ai-input-file__icon {
	color: var(--el-text-color-primary);
	transition: color 0.3s;
}

.ai-input-file__icon:hover {
	color: var(--el-text-color-secondary);
	cursor: pointer;
}
</style>
