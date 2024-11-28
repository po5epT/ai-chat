<template>
	<ElSkeleton
		loading
		style="--el-skeleton-color: var(--ai-sidebar-border-color); padding: 0 20px; margin-top: 20px"
	>
		<template #template>
			<ElSkeletonItem
				variant="text"
				style="width: 90px; height: 18px"
			/>

			<ElSkeletonItem
				variant="text"
				style="width: 100%; height: 24px; margin: 6px 0"
			/>
			<ElSkeletonItem
				variant="text"
				style="width: 80%; height: 24px; margin: 6px 0"
			/>
			<ElSkeletonItem
				variant="text"
				style="width: 100%; height: 24px; margin: 6px 0"
			/>
		</template>
	</ElSkeleton>
</template>

<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem } from 'element-plus';
</script>
