import type { IChat, IChatMessage, IChatMessageFile, TCreateChatMessageParams } from '@/modules/chats/types';
import { SYSTEM_USER_ID } from '@/config';

const randomDate = (start: number, end: number) => {
	return new Date(start + Math.random() * (end - start));
};

const randomMessageDate = () => {
	const usedAt1 = +new Date('November 1, 2024 00:00:00');
	const usedAt2 = +new Date();

	return randomDate(usedAt1, usedAt2);
};

let counter = 0;

export const createMockChatMessage = ({
	text,
	files,
}: { text?: string; files?: IChatMessageFile[] } = {}): IChatMessage => {
	counter++;

	return {
		id: 'message_' + counter,
		chat_id: 'chat_id',
		user_id: 'user_1',
		timestamp: +randomMessageDate(),
		text: text ?? 'Some user message ' + counter,
		files: files ?? [],
	};
};

export const createNewChatMessage = (chatId: IChat['id'], { text, files }: TCreateChatMessageParams): IChatMessage => {
	counter++;

	return {
		id: 'message_' + counter,
		text,
		files,
		chat_id: chatId,
		user_id: 'user',
		timestamp: +new Date(),
	};
};

export const createMockSystemChatMessage = (text?: string): IChatMessage => {
	counter++;

	return {
		id: 'message_' + counter,
		chat_id: 'chat_id',
		user_id: SYSTEM_USER_ID,
		timestamp: +randomMessageDate(),
		text: text ?? 'Some system message ' + counter,
		files: [],
	};
};

export const createMockSystemFirstChatMessage = () => {
	return createMockSystemChatMessage('Hello! Ask me something');
};
