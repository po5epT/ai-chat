export type IUploadFile = {
	id?: string;
	uid?: string;
	name: string;
	url: string;
	type: string;
	size?: number;
	rawFile?: File;
};
