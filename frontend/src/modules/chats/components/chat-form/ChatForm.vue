<template>
	<div class="chat-form-container">
		<AFilePreviewList
			:items="messageFiles"
			delete-allowed
			@delete="onDeleteFile"
		/>

		<form class="chat-form">
			<ATextarea
				v-model="messageText"
				placeholder="Message to Infuse AI"
				@keydown.enter.exact.prevent="submitMessage"
				@dragover.prevent
				@drop.prevent="onFileDrop"
			>
				<template #append>
					<AInputFile
						multiple
						@change="onFileChange"
					/>
				</template>
			</ATextarea>

			<ElButton
				link
				:type="submitBtnType"
				:disabled="isSubmitBtnDisabled"
				class="chat-form__submit"
				@click="submitMessage"
			>
				<ElIcon size="large">
					<ArrowUp />
				</ElIcon>
			</ElButton>
		</form>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElButton, ElIcon } from 'element-plus';

import ArrowUp from '@/components/icons/ArrowUp.vue';
import ATextarea from '@/components/textarea/ATextarea.vue';
import AInputFile from '@/components/textarea/AInputFile.vue';
import AFilePreviewList from '@/components/file-previews/AFilePreviewList.vue';
import { convertRawFileToUploadFile, revokeObjectUrl, validateFileFormat } from '@/utils';
import type { IChatMessageFile } from '@/modules/chats/types';
import type { IUploadFile } from '@/types';

const emit = defineEmits<{
	(e: 'submit:message', payload: { text: string; files: IChatMessageFile[] }): void;
}>();

// ---- text
const messageText = ref('');
const hasMessageText = computed(() => messageText.value.trim().length > 0);

// ---- files
const messageFiles = ref<IChatMessageFile[]>([]);
const hasMessageFiles = computed(() => messageFiles.value.length > 0);
const addFilesToList = (files: FileList) => {
	messageFiles.value = [
		...messageFiles.value,
		...Array.from(files).filter(validateFileFormat).map(convertRawFileToUploadFile),
	];
};
const onFileChange = (event: Event) => {
	const target = event.target as HTMLInputElement;

	if (!target?.files?.length) {
		return;
	}

	addFilesToList(target.files);
};
const onFileDrop = (event: DragEvent) => {
	if (!event.dataTransfer?.files.length) {
		return;
	}

	addFilesToList(event.dataTransfer.files);
};
const onDeleteFile = (file: IUploadFile) => {
	messageFiles.value = messageFiles.value.filter(({ uid }) => file.uid !== uid);
	revokeObjectUrl(file.url);
};

// ---- submit btn
const isSubmitBtnDisabled = computed(() => !hasMessageText.value && !hasMessageFiles.value);
const submitBtnType = computed(() => (isSubmitBtnDisabled.value ? 'info' : 'primary'));
const submitMessage = () => {
	if (isSubmitBtnDisabled.value) {
		return;
	}

	emit('submit:message', {
		text: messageText.value,
		files: [...messageFiles.value],
	});

	messageText.value = '';
	messageFiles.value = [];
};
</script>

<style scoped>
.chat-form-container {
	padding: 0 var(--ai-base-h-padding);
}
.chat-form {
	display: flex;
	align-items: flex-end;
	gap: 16px;
	padding: 8px 0;
}

.chat-form__submit {
	margin: 7px 0;
}
</style>
