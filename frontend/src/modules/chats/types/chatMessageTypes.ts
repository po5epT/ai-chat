import type { IUploadFile } from '@/types';
import type { IChat } from '@/modules/chats/types/chatTypes';

export interface IChatMessageFile extends IUploadFile {}

export interface IChatMessage {
	id: string;
	chat_id: IChat['id'];
	user_id: string;
	timestamp: number;
	text?: string;
	files?: IChatMessageFile[];
}

export type TCreateChatMessageParams = Pick<IChatMessage, 'text' | 'files'>;
