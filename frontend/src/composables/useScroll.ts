import { useTemplateRef } from 'vue';

export const useScroll = (key: string) => {
	const targetRef = useTemplateRef<HTMLDivElement>(key);

	const scrollTo = (options?: ScrollOptions) => {
		setTimeout(() => {
			targetRef.value?.scrollTo({ ...options, behavior: 'smooth' });
		}, 0);
	};

	const jumpTo = (options?: ScrollOptions) => {
		setTimeout(() => {
			targetRef.value?.scrollTo(options);
		}, 0);
	};

	const jumpToBottom = () => {
		jumpTo({ top: targetRef.value?.scrollHeight } as ScrollOptions);
	};

	const scrollToBottom = () => {
		scrollTo({ top: targetRef.value?.scrollHeight } as ScrollOptions);
	};

	return {
		targetRef,
		jumpTo,
		scrollTo,
		jumpToBottom,
		scrollToBottom,
	};
};
