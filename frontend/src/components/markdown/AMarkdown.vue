<template>
	<div
		class="chat-message-text"
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
.chat-message-text h1,
.chat-message-text h2,
.chat-message-text h3,
.chat-message-text h4 {
	margin: 10px 0;
}
.chat-message-text p {
	margin: 10px 0;
}
</style>
