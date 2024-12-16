<template>
	<div
		class="markdown-content"
		v-html="html"
	></div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { markdownParse } from '@/services/markdown';

type Props = { source?: string };

const { source = '' } = defineProps<Props>();
const html = ref('');

watchEffect(async () => {
	html.value = await markdownParse(source);
});
</script>

<style>
.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4 {
	margin: 10px 0;
}
.markdown-content p {
	margin: 10px 0;
}
</style>
