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
			<span class="file-preview-actions__item">
				<ElIcon @click="handleRemove(file)">
					<Delete />
				</ElIcon>
			</span>
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
const fileExt = computed(() => MAP_MIME_TYPE_TO_EXT[file.type as keyof typeof MAP_MIME_TYPE_TO_EXT]);

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
	object-fit: cover;
	overflow: hidden;
	background-color: var(--el-fill-color-light);
	border: 1px solid var(--el-border-color-dark);
	border-radius: var(--el-border-radius-small);
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
	border-radius: var(--el-border-radius-small);
	padding: 0 5px;
}

.file-preview-actions {
	display: flex;
	align-items: center;
	justify-content: center;
}

.file-preview-actions__item {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	background-color: transparent;
}

.file-preview-actions__item:hover {
	cursor: pointer;
}
</style>
