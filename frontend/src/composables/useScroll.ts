import { useTemplateRef } from 'vue';

export const useScroll = (key: string) => {
	const targetRef = useTemplateRef<HTMLDivElement>(key);

	const scrollTo = (options?: ScrollOptions) => {
		setTimeout(() => {
			targetRef.value?.scrollTo({ ...options, behavior: 'smooth' });
		});
	};

	const jumpTo = (options?: ScrollOptions) => {
		setTimeout(() => {
			targetRef.value?.scrollTo(options);
		}, 0);
	};

	const jumpToBottom = () => {
		jumpTo({ top: 999999 } as ScrollOptions);
	};

	const scrollToBottom = () => {
		scrollTo({ top: 999999 } as ScrollOptions);
	};

	return {
		targetRef,
		jumpTo,
		scrollTo,
		jumpToBottom,
		scrollToBottom,
	};
};
