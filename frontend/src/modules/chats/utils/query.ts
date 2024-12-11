type ParamValueInput = string | number | null | boolean | undefined;

export const createSearchParams = (params: Record<string, ParamValueInput>): Record<string, string> => {
	const searchParams = Object.assign({}, params);

	Object.keys(searchParams).forEach((key) => {
		if (typeof searchParams[key] === 'undefined') {
			delete searchParams[key];
			return;
		}

		searchParams[key] = `${searchParams[key]}`;
	});

	return searchParams as unknown as Record<string, string>;
};
