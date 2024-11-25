export const MAP_MIME_TYPE_TO_EXT = {
	'application/msword': 'doc',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
	'application/vnd.ms-excel': 'xls',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
	'text/csv': 'csv',
	'application/pdf': 'pdf',
	'text/plain': 'txt',
	'application/vnd.oasis.opendocument.text': 'odt',
	'application/rtf': 'rtf',
	'image/jpeg': 'jpg',
	'image/png': 'png',
};

export const ALLOWED_FILE_TYPES_TO_UPLOAD = Object.keys(MAP_MIME_TYPE_TO_EXT);
