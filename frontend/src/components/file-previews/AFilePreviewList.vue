<template>
	<TransitionGroup
		name="slide-v"
		tag="div"
		class="file-preview-list"
	>
		<AFilePreview
			v-for="item in items"
			:key="item.id ?? item.uid"
			:file="item"
			:delete-allowed="deleteAllowed"
			@delete="onDeleteFile"
		/>
	</TransitionGroup>
</template>

<script setup lang="ts">
import type { IUploadFile } from '@/types';
import AFilePreview from '@/components/file-previews/AFilePreview.vue';

type Props = {
	items?: IUploadFile[];
	deleteAllowed?: boolean;
};

const { items = [], deleteAllowed = false } = defineProps<Props>();

const emit = defineEmits<{
	(e: 'delete', file: IUploadFile): void;
}>();

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
