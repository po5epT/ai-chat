<template>
	<div
		class="file-preview"
		:class="{ 'file-preview_deletable': deleteAllowed }"
		:style="filePreviewStyles"
	>
		<img
			v-if="isImage"
			:src="file.url"
			:alt="file.name"
		/>

		<div
			v-if="deleteAllowed"
			class="file-preview-actions"
		>
			<ElIcon
				class="file-preview-actions__item"
				@click="handleRemove(file)"
			>
				<Delete />
			</ElIcon>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElIcon } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';

import type { IUploadFile } from '@/types/file';
import { isFileImage } from '@/utils';

const {
	file,
	size = 70,
	deleteAllowed = false,
} = defineProps<{
	file: IUploadFile;
	size?: number;
	deleteAllowed?: boolean;
}>();

const emit = defineEmits<{
	(e: 'delete', file: IUploadFile): void;
}>();

const filePreviewStyles = computed(() => ({
	width: size + 'px',
	height: size + 'px',
}));

const isImage = computed(() => isFileImage(file));

const handleRemove = (file: IUploadFile) => {
	emit('delete', file);
};
</script>

<style scoped>
.file-preview {
	width: 70px;
	height: 70px;
	border-radius: 6px;
	object-fit: cover;
	overflow: hidden;
}

.file-preview_deletable {
	position: relative;
}

.file-preview_deletable:hover .file-preview-actions {
	opacity: 1;
}

.file-preview img {
	display: inline-block;
	width: 100%;
	height: 100%;
}

.file-preview-actions {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.7);
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity 0.3s;
}

.file-preview-actions__item {
	color: var(--ai-color-secondary);
	transition: color 0.3s;
}

.file-preview-actions__item:hover {
	cursor: pointer;
	color: white;
}
</style>
