import type { IChatMessage } from '@/modules/chats/types';
import { SYSTEM_USER_ID } from '@/config';

export const createChatMessageModel = (chatMessageData: Partial<IChatMessage> = {}): IChatMessage => {
	return {
		id: chatMessageData.id ?? 'messageId',
		chat_id: chatMessageData.chat_id ?? 'chatId',
		user_id: chatMessageData.user_id ?? 'userId',
		text: chatMessageData.text ?? '',
		files: chatMessageData.files ?? [],
		timestamp: chatMessageData.timestamp ?? Date.now(),
	};
};

export const createFirstSystemChatMessageModel = (chatMessageData: Partial<IChatMessage> = {}): IChatMessage => {
	return createChatMessageModel({
		id: 'firstSystemMessageId',
		user_id: SYSTEM_USER_ID,
		text: chatMessageData.text ?? 'Hello! Ask me something',
		files: [],
	});
};
