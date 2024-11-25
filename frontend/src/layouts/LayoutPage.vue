<template>
	<div class="page">
		<header class="header">
			<slot name="header">
				<AppNav>
					<template #title>
						<slot name="title" />
					</template>
				</AppNav>
			</slot>
		</header>

		<aside class="sidebar sidebar_page">
			<slot name="sidebar" />
		</aside>

		<slot />
	</div>
</template>

<script setup lang="ts">
import AppNav from '@/components/layout/AppNav.vue';
</script>
