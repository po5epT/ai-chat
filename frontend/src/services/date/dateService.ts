import dateService, { type ConfigType } from 'dayjs';
import isTodayPlugin from 'dayjs/plugin/isToday';
import isYesterdayPlugin from 'dayjs/plugin/isYesterday';

dateService.extend(isTodayPlugin);
dateService.extend(isYesterdayPlugin);

export const isToday = (date: ConfigType) => {
	return dateService(date).isToday();
};

export const isYesterday = (date: ConfigType) => {
	return dateService(date).isToday();
};

export { dateService };
