<template>
	<LayoutDefault>
		<RouterView />
	</LayoutDefault>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import LayoutDefault from '@/layouts/LayoutDefault.vue';
</script>
