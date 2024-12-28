import { Marked, type MarkedOptions } from 'marked';
import DOMPurify from 'dompurify';

export const markdownParse = (markdownString: string, options?: MarkedOptions): string => {
	const marked = new Marked();
	marked.setOptions({ breaks: true, ...options, async: false });

	const html = marked.parse(markdownString) as string;

	return DOMPurify.sanitize(html);
};
