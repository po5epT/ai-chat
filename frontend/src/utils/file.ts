import type { IUploadFile } from '@/types/file';

export const convertRawFileToUploadFile = (file: File): IUploadFile => {
	return {
		uid: file.lastModified.toString(),
		name: file.name,
		type: file.type,
		size: file.size,
		url: URL.createObjectURL(file),
		rawFile: file,
	};
};

export const revokeObjectUrl = (url: string): void => {
	if (!url.startsWith('blob:')) {
		return;
	}

	URL.revokeObjectURL(url);
};

export const isFileImage = (file: IUploadFile) => {
	return file.type.includes('image');
};
