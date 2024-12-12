export type IModelConfig = Partial<{
	name: string;
	family: string;
	max_tokens: number;
	temperature: number;
	top_p: number;
}>;

export interface IChat {
	id: string;
	user_id: string;
	name: string;
	folder_id: string | null;
	created_timestamp: number;
	used_timestamp: number;
	is_pinned: boolean;
	model_config?: IModelConfig;
}

export type NewChatModel = {
	first_prompt: string;
};
