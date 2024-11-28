import { isToday, isYesterday, dateService } from '@/services/date';

export const getHumanDate = (timestamp: number) => {
	const date = dateService(timestamp);
	const format = isToday(date) ? 'HH:mm' : 'MMM, DD';

	return date.format(format);
};

export const getMessageDate = (timestamp: number) => {
	if (isToday(timestamp)) {
		return 'Today';
	} else if (isYesterday(timestamp)) {
		return 'Yesterday';
	} else {
		const date = dateService(timestamp);

		return date.format('MMM, DD');
	}
};
