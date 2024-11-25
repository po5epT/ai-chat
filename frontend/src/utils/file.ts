import type { IUploadFile } from '@/types';
import { ALLOWED_FILE_TYPES_TO_UPLOAD } from '@/config';

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

export const validateFileFormat = (file: File | IUploadFile): boolean => {
	return ALLOWED_FILE_TYPES_TO_UPLOAD.includes(file.type);
};

export const isFileImage = (file: IUploadFile) => {
	return file.type.startsWith('image');
};
