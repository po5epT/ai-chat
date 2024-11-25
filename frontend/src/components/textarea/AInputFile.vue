<template>
	<label
		class="ai-input-file"
		for="file"
	>
		<input
			id="file"
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

const { multiple } = defineProps<{
	multiple?: boolean;
}>();

const emit = defineEmits<{
	(e: 'change', event: InputEvent): void;
}>();

const onChange = (event: InputEvent) => {
	emit('change', event);
};
</script>

<style scoped>
.ai-input-file {
	display: inherit;
}

.ai-input-file__icon {
	color: var(--ai-color-primary);
	transition: color 0.3s;
}

.ai-input-file__icon:hover {
	color: var(--ai-color-secondary);
	cursor: pointer;
}
</style>
