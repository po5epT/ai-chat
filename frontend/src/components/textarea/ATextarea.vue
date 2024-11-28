<template>
	<div
		class="ai-textarea"
		:class="{ 'ai-textarea_append': hasAppendSlot }"
	>
		<ElInput
			v-model="text"
			v-bind="attrs"
			type="textarea"
			resize="none"
			:autosize="{ minRows: 1, maxRows: 4 }"
		/>

		<div
			v-if="hasAppendSlot"
			class="ai-textarea__append"
		>
			<slot name="append" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue';
import { ElInput } from 'element-plus';

defineOptions({
	inheritAttrs: false,
});

const slots = useSlots();
const attrs = useAttrs();

const text = defineModel();

const hasAppendSlot = computed(() => !!slots['append']);
</script>

<style>
.ai-textarea {
	position: relative;
	width: 100%;
}

.ai-textarea .el-textarea__inner {
	padding-top: 10px;
	padding-bottom: 9px;
}
.ai-textarea_append .el-textarea__inner {
	padding-right: 40px;
}

.ai-textarea__append {
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	padding: 10px 8px;
	display: flex;
	align-items: flex-end;
	background: rgba(0, 0, 0, 0.025);
}
</style>
