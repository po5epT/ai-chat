const randomDate = (start: number, end: number) => {
	return new Date(start + Math.random() * (end - start));
};

const randomCreatedDate = () => {
	const createdAt1 = +new Date('September 1, 2024 00:00:00');
	const createdAt2 = +new Date('October 31, 2024 23:59:59');

	return randomDate(createdAt1, createdAt2);
};

const randomUsedDate = () => {
	const usedAt1 = +new Date('November 1, 2024 00:00:00');
	const usedAt2 = +new Date('November 20, 2024 23:59:59');

	return randomDate(usedAt1, usedAt2);
};

let counter = 0;

export const createMockChat = () => {
	counter++;

	return {
		id: 'chat_' + counter,
		user_id: 'user_id_1',
		name: `Chat ${counter}`,
		folder_id: null,
		created_timestamp: +randomCreatedDate(),
		used_timestamp: +randomUsedDate(),
		is_pinned: false,
		model_config: {},
	};
};
