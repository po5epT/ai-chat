<template>
	<div
		v-if="hasFiles"
		class="file-preview-list"
	>
		<AFilePreview
			v-for="item in items"
			:key="item.id"
			:file="item"
			:delete-allowed="deleteAllowed"
			@delete="onDeleteFile"
		/>
	</div>
</template>

<script setup lang="ts">
import AFilePreview from '@/components/file-previews/AFilePreview.vue';
import type { IUploadFile } from '@/types';
import { computed } from 'vue';

type Props = {
	items?: IUploadFile[];
	deleteAllowed?: boolean;
};

const { items = [], deleteAllowed = false } = defineProps<Props>();

const emit = defineEmits<{
	(e: 'delete', file: IUploadFile): void;
}>();

const hasFiles = computed(() => items.length > 0);
const onDeleteFile = (file: IUploadFile) => {
	emit('delete', file);
};
</script>

<style scoped>
.file-preview-list {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 8px;
}
</style>
