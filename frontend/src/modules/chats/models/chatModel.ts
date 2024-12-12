import type { IChat, NewChatModel, IModelConfig } from '@/modules/chats/types';

export const createModelConfigModel = (modelConfigData?: Partial<IModelConfig>): IModelConfig => {
	return Object.assign({}, modelConfigData);
};

export const createChatModel = (chatData: Partial<IChat>): IChat => {
	const modelConfig = createModelConfigModel(chatData.model_config);

	return {
		id: chatData.id ?? 'newChatId',
		user_id: chatData.user_id ?? 'userId',
		name: chatData.name ?? `New chat`,
		folder_id: chatData.folder_id ?? null,
		is_pinned: chatData.is_pinned ?? false,
		created_timestamp: chatData.created_timestamp ?? Date.now(),
		used_timestamp: chatData.used_timestamp ?? Date.now(),
		model_config: modelConfig,
	};
};

export const createNewChatModel = (newChatData: NewChatModel): NewChatModel => {
	return {
		first_prompt: newChatData.first_prompt,
	};
};
