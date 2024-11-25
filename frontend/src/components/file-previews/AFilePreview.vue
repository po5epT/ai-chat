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
			v-else
			class="file-badge"
		>
			{{ fileExt }}
		</div>

		<div
			v-if="deleteAllowed"
			class="file-preview-actions overlay"
			:class="{ overlay_light: !isImage }"
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

import type { IUploadFile } from '@/types';
import { MAP_MIME_TYPE_TO_EXT } from '@/config';
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
const fileExt = computed(() => MAP_MIME_TYPE_TO_EXT[file.type]);

const handleRemove = (file: IUploadFile) => {
	emit('delete', file);
};
</script>

<style scoped>
.overlay {
	opacity: 0;
}

.file-preview {
	width: 70px;
	height: 70px;
	border-radius: var(--ai-border-radius-xs);
	object-fit: cover;
	overflow: hidden;
	background-color: var(--ai-bg-color-secondary);
	display: flex;
	align-items: center;
	justify-content: center;
}

.file-preview_deletable {
	position: relative;
}

.file-preview_deletable:hover .overlay {
	opacity: 1;
}

.file-preview img {
	display: inline-block;
	width: 100%;
	height: 100%;
}

.file-badge {
	text-transform: uppercase;
	background-color: black;
	color: white;
	font-weight: 500;
	font-size: 12px;
	line-height: 20px;
	border-radius: var(--ai-border-radius-xs);
	padding: 0 5px;
}

.file-preview-actions {
	display: flex;
	align-items: center;
	justify-content: center;
}

.file-preview-actions__item:hover {
	cursor: pointer;
}
</style>
