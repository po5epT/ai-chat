export const createFormDataFromObject = (object: object): FormData => {
	const formData = new FormData();

	Object.entries(object).forEach(([key, value]) => {
		formData.append(key, JSON.stringify(value));
	});

	return formData;
};
