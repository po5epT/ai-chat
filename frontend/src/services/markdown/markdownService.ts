import { Marked, type MarkedOptions } from 'marked';

export const markdownParse = async (markdownString: string, options?: MarkedOptions): Promise<string> => {
	const marked = new Marked();
	marked.setOptions({ async: true, breaks: true, ...options });

	return marked.parse(markdownString);
};
