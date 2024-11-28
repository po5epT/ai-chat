export const MAP_MIME_TYPE_TO_EXT = {
	'application/msword': 'doc',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
	'application/x-iwork-pages-sffpages': 'pages',
	'application/vnd.ms-excel': 'xls',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
	'application/x-iwork-numbers-sffnumbers': 'numbers',
	'text/csv': 'csv',
	'application/pdf': 'pdf',
	'text/plain': 'txt',
	'text/rtf': 'txt',
	'application/vnd.oasis.opendocument.text': 'odt',
	'image/jpeg': 'jpg',
	'image/png': 'png',
};

export const ALLOWED_FILE_TYPES_TO_UPLOAD = Object.keys(MAP_MIME_TYPE_TO_EXT);
