export const jumpToElement = (element: HTMLElement) => {
	element.scrollIntoView({
		behavior: 'instant',
		block: 'end',
		inline: 'end',
	});
};

export const scrollToElement = (element: HTMLElement) => {
	element.scrollIntoView({
		behavior: 'smooth',
		block: 'end',
		inline: 'end',
	});
};
