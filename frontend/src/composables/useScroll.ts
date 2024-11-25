import { nextTick, useTemplateRef } from 'vue';

import { jumpToElement, scrollToElement } from '@/utils';

export const useScroll = (key: string) => {
	const targetRef = useTemplateRef<HTMLDivElement>(key);

	const scroll = () => {
		nextTick().then(() => targetRef.value && scrollToElement(targetRef.value));
	};

	const jump = () => {
		nextTick().then(() => targetRef.value && jumpToElement(targetRef.value));
	};

	return {
		targetRef,
		scroll,
		jump,
	};
};
