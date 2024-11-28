import { ElNotification, type NotificationOptions } from 'element-plus';

export const notify = (options: NotificationOptions) => {
	ElNotification(options);
};

export const successNotify = (message: string, options: Partial<NotificationOptions> = {}) => {
	ElNotification.success({
		message,
		...options,
	});
};

export const warningNotify = (message: string, options: Partial<NotificationOptions> = {}) => {
	ElNotification.warning({
		message,
		...options,
	});
};

export const errorNotify = (message: string, options: Partial<NotificationOptions> = {}) => {
	ElNotification.error({
		message,
		...options,
	});
};

export const infoNotify = (message: string, options: Partial<NotificationOptions> = {}) => {
	ElNotification.info({
		message,
		...options,
	});
};
